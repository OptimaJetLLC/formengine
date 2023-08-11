import {assign} from 'lodash-es'
import {makeObservable, observable} from 'mobx'
import type {ComponentType} from 'react'
import {Subject} from 'rxjs'
import type {ComponentTreeProps} from '../ComponentTreeProps'
import {calculatePropertyValue} from '../features/calculation/propertyCalculator'
import {Model, View} from '../features/define'
import {ActionData, ActionDefinition, ActionEventArgs, findAction} from '../features/event'
import {defaultLanguage as globalDefaultLanguage} from '../features/localization/consts'
import {Language} from '../features/localization/types'
import {buildInternalErrorStore} from '../features/ui/internalErrorModel'
import {screenModel} from '../features/ui/screenModel'
import {isTemplateType} from '../features/ui/templateUtil'
import {FormField} from '../features/validation/utils/FormField'
import {SimpleField} from '../features/validation/utils/SimpleField'
import {ViewMode} from '../types'
import {isPromise} from '../utils'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {nameObservable} from '../utils/observableNaming'
import {ComponentStore} from './ComponentStore'
import {Form} from './Form'
import {IStore} from './IStore'
import {LocalizationStore} from './LocalizationStore'
import {PersistedForm} from './PersistedForm'

/**
 * Reduction function type.
 */
type ReduceCallback<U, T> = (accumulator: T, current: U) => T

/**
 * Type for a tree object.
 */
type Tree<T, U extends keyof T> = T & { [K in U]: Tree<T, K>[] | undefined }

function reduceTree<U extends object, T, K extends keyof U>(tree: Tree<U, K>,
                                                            callback: ReduceCallback<Tree<U, K>, T>,
                                                            initialValue: T, childKey: K) {
  let accumulator = callback(initialValue, tree)
  tree[childKey]?.forEach((child: Tree<U, K>) => {
    accumulator = reduceTree(child, callback, accumulator, childKey)
  })
  return accumulator
}

/**
 * The form viewer settings.
 */
export class Store implements IStore {

  selectedLanguage?: Language

  readonly eventSubject = new Subject<ActionEventArgs>()

  viewMode: ViewMode = 'desktop'

  form: Form

  // todo remove isBuilderMode from Store class
  /**
   * Creates form viewer settings.
   * @param view the metadata of the form viewer components.
   * @param initialData the initial form data.
   * @param componentTreeRenderer the React component that displays an array of {@link ComponentData}.
   * @param actions the array of action definitions.
   * @param isBuilderMode true if the form viewer is inside the form builder, false otherwise.
   * @param parentStore the form viewer settings, used in templates.
   * @param keyInParent the template component key.
   */
  constructor(public view: View,
              public initialData: Record<string, unknown>,
              public componentTreeRenderer: ComponentType<ComponentTreeProps>,
              public actions: ActionDefinition[] = [], public isBuilderMode: boolean = false,
              public readonly parentStore?: Store, private readonly keyInParent?: string) {

    const componentTree = this.createComponentData(new ComponentStore(screenModel.name, screenModel.type))
    const localization = new LocalizationStore()
    this.form = new Form(componentTree, localization, [], globalDefaultLanguage)

    makeObservable(this, {
      form: observable,
      viewMode: true,
      selectedLanguage: true,
      initialData: observable.ref,
      clear: true
    }, {name: nameObservable(`ViewerStore`)})
  }

  /**
   * Clears the form in Form Viewer.
   */
  clear() {
    const oldForm = this.form
    const componentTree = this.createComponentData(new ComponentStore(screenModel.name, screenModel.type))
    const localization = new LocalizationStore()
    this.form = new Form(componentTree, localization, oldForm.languages, oldForm.defaultLanguage)
    oldForm.dispose()
  }

  /**
   * @inheritDoc
   */
  dispose() {
    this.form.dispose()
  }

  /**
   * @returns true if these settings are used to display the pattern, false otherwise.
   */
  get isTemplateStore() {
    return !!this.parentStore
  }

  /**
   * @returns true if the template can be displayed in builder mode (e.g. with drop zones), false otherwise.
   */
  get templateBuilderMode(): boolean {
    if (!this.isTemplateStore) return this.isBuilderMode
    // if the template is inside another template, there is no builder mode
    return this.parentStore?.isBuilderMode || false
  }

  /**
   * @returns the {@link Record} with template slot settings.
   */
  get slotsContent(): Record<string, ComponentData> | undefined {
    if (this.keyInParent && this.parentStore) {
      const componentData = this.parentStore.getComponentDataByKey(this.keyInParent)
      if (!componentData || !componentData.store.slotsContent) return
      const componentDatas: Record<string, ComponentData> = {}
      for (const key in componentData.store.slotsContent) {
        componentDatas[key] = this.parentStore.getComponentDataByKey(key)
      }
      return componentDatas
    }
  }

  // todo Must be removed.
  /**
   * @returns the root {@link ComponentStore}.
   */
  get screen(): ComponentStore {
    return this.form.componentTree.store
  }

  /**
   * Returns the component settings for the specified component key.
   * @param key the component key.
   * @returns the found component settings.
   * @throws Error if the component is not found.
   */
  getComponent(key: string) {
    const result = this.findComponent(key)

    if (!result) {
      throw Error(`Component ${key} didn't found!`)
    }

    return result
  }

  //TODO compatibility only refactor and remove
  /**
   * Returns the filled component data for the specified component key.
   * @param key Component key.
   * @returns Filled component data.
   */
  getComponentDataByKey(key: string) {
    const result = this.form.componentTree.findByKey(key)
    if (!result) {
      throw Error(`Component data for ${key} didn't found!`)
    }
    return result
  }

  /**
   * Searches for and returns the component settings for the specified component key.
   * @param key the component key.
   * @returns the found component settings or undefined.
   */
  findComponent(key: string) {
    const result = treeFind(this.screen, key)
    if (result) return result

    const slots = this.slotsContent
    if (!slots) return

    for (const slotName in slots) {
      const slotComponentData = treeFind(slots[slotName], key)
      if (slotComponentData) return slotComponentData.store
    }
  }

  /**
   * @inheritDoc
   */
  reduceScreen<T>(callback: (accumulator: T, current: ComponentStore) => T, initialValue: T) {
    return reduceTree(this.screen, callback, initialValue, 'children')
  }

  /**
   * Searches for an action, returns definition for the found action.
   * @param actionData the action's data.
   * @returns the action definition.
   * @throws Error, if action was not found.
   */
  findAction(actionData: ActionData) {
    return findAction(this, actionData)
  }

  /**
   * Returns the array with action definitions for the specified component.
   * @param target the component settings.
   * @returns the array with action definitions for the specified component.
   */
  getLinkedActions(target?: ComponentStore) {
    if (target) return this.view.get(target.type).getActions(target)
  }

  /**
   * Loads a form by form name and sets that form in the form viewer.
   * @param getForm the function that loads the form.
   * @param formName the form name.
   */
  loadForm(getForm?: (name?: string) => PersistedForm | Promise<PersistedForm>, formName?: string) {
    if (!getForm) return

    try {
      const form = getForm(formName)
      if (isPromise<PersistedForm>(form)) {
        form
          .then(this.#applyPersistedForm.bind(this))
          .catch(this.#onLoadError.bind(this))
        return
      }
      this.#applyPersistedForm(form)
    } catch (e) {
      this.#onLoadError(e)
    }
  }

  /**
   * Creates the element for the component tree.
   * @param componentStore the component settings.
   * @returns the element for the component tree.
   */
  createComponentData(componentStore: ComponentStore): ComponentData {
    const model = this.view.get(componentStore.type)
    const field = model.valued ? this.createField(componentStore, model) : undefined
    const factory = this.createComponentData.bind(this)
    return new ComponentData(componentStore, model, field, factory)
  }

  private createField(componentStore: ComponentStore, model: Model<any>) {
    if (!isTemplateType(model.type)) {
      return new SimpleField(this, componentStore, model, updateFnValue(this))
    }

    const initialData = this.initialData[componentStore.key] as Record<string, unknown> ?? {}
    const childStore = new Store(this.view, initialData, this.componentTreeRenderer, this.actions, false, this)
    return new FormField(componentStore, childStore)
  }

  /**
   * Changes the form to the component with an error description.
   * @param e the error.
   */
  #onLoadError(e: any) {
    console.error(e)
    const componentStore = buildInternalErrorStore(e)
    this.#applyPersistedForm({form: componentStore, localization: {}, defaultLanguage: globalDefaultLanguage.fullCode, languages: []})
  }

  /**
   * Populates the value of this store with the values of the saved form.
   * @param persistedForm saved form value.
   */
  #applyPersistedForm(persistedForm: PersistedForm) {
    const oldForm = this.form
    const componentStore = ComponentStore.createFromObject(persistedForm.form)
    const componentData = this.createComponentData(componentStore)
    const localization = new LocalizationStore(assign({}, persistedForm.localization))
    const languages = persistedForm.languages ? [...persistedForm.languages] : []
    const defaultLanguage = persistedForm.languages?.find(l => l.fullCode === persistedForm.defaultLanguage) ?? globalDefaultLanguage
    this.form = new Form(componentData, localization, languages, defaultLanguage)
    oldForm.dispose()
  }
}

function treeFind<T extends { key: string, children?: T[] }>(value: T, key?: string): T | undefined {
  if (value.key === key) return value

  if (!value.children) return

  for (const child of value.children) {
    const childNode = treeFind(child, key)
    if (childNode) return childNode
  }

  return
}

function updateFnValue(viewerStore: Store) {
  return function (component: ComponentStore, key: string): [boolean, any?] {
    const property = component.props[key]
    if (property && property.useFn) {
      const value = calculatePropertyValue(property, viewerStore.form.componentTree)
      return [true, value]
    }
    return [false]
  }
}
