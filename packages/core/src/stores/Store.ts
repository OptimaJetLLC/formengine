import {assign} from 'lodash-es'
import {makeObservable, observable} from 'mobx'
import {Subject} from 'rxjs'
import {ActionData, ActionDefinition, ActionEventArgs, findAction} from '../features/event'
import {defaultLanguage} from '../features/localization/consts'
import {Language} from '../features/localization/types'
import {buildInternalErrorStore} from '../features/ui/internalErrorModel'
import {screenModel} from '../features/ui/screenModel'
import {Form} from '../features/validation'
import {ViewMode} from '../types'
import {isPromise} from '../utils'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {ComponentStore} from './ComponentStore'
import {LocalizationStore} from './LocalizationStore'
import {PersistedForm} from './PersistedForm'
import {StoreProps} from './StoreProps'

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
export class Store {
  readonly #props: Readonly<StoreProps>

  defaultLanguage?: Language

  selectedLanguage?: Language

  readonly eventSubject = new Subject<ActionEventArgs>()
  readonly form

  screen = new ComponentStore(screenModel.name, screenModel.type)
  cache = new WeakMap<ComponentStore, ComponentData>()

  viewMode: ViewMode = 'desktop'

  localization = new LocalizationStore()

  languages: Language[] = []

  // todo remove isBuilderMode from Store class
  /**
   * Creates form viewer settings.
   * @param props the form viewer properties.
   * @param actions the array of action definitions.
   * @param isBuilderMode true if the form viewer is inside the form builder, false otherwise.
   * @param parentStore the form viewer settings, used in templates.
   * @param keyInParent the template component key.
   */
  constructor(props: Readonly<StoreProps>, public actions: ActionDefinition[] = [], public isBuilderMode: boolean = false,
              public readonly parentStore?: Store, private readonly keyInParent?: string) {
    this.#props = props
    this.form = new Form(this)

    makeObservable(this, {
      screen: observable,
      localization: observable,
      viewMode: true,
      defaultLanguage: true,
      selectedLanguage: true,
      displayedLanguage: true
    })
  }

  /**
   * Correctly clears allocated resources, the function must be called when destroying an instance of the class.
   */
  destroy() {
    this.localization.destroy()
  }

  /**
   * @returns the {@link Language} displayed in Form Viewer.
   */
  get displayedLanguage() {
    if (this.#props.language) {
      const propsLanguage = this.languages.find(l => l.fullCode === this.#props.language)
      if (propsLanguage) return propsLanguage
    }
    return this.selectedLanguage ?? this.defaultLanguage ?? defaultLanguage
  }

  /**
   * @returns true if the displayed language is the default language, false otherwise.
   */
  get isDefaultLanguage() {
    return this.displayedLanguage === this.defaultLanguage
  }

  /**
   * @returns the type of React component used to display the tooltip.
   */
  get tooltipType(): string | undefined {
    return this.screen.props['tooltip']?.value ?? this.#props.view.tooltips[0]
  }

  /**
   * @returns the component's metadata for displaying the tooltip.
   */
  get tooltipComponent() {
    const selectedTooltipType = this.tooltipType
    if (!selectedTooltipType) return
    return this.#props.view.getTooltipComponent(selectedTooltipType)
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
  get slotsContent(): Record<string, ComponentStore> | undefined {
    if (this.keyInParent && this.parentStore) {
      return this.parentStore.findComponent(this.keyInParent)?.slotsContent
    }
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

  /**
   * Returns the element in the component tree of the form viewer.
   * @param value the component settings or component key.
   * @returns the element in the component tree of the form viewer.
   * @throws Error, if the component is not found in the component tree.
   */
  getComponentData(value: ComponentStore | string) {
    const store = typeof value === 'string' ? this.getComponent(value) : value
    const result = this.cache.get(store)

    if (!result) {
      throw Error(`Component data for ${store.key} didn't found!`)
    }

    return result
  }

  /**
   * Searches for and returns the component settings for the specified component key.
   * @param key the component key.
   * @returns the found component settings or undefined.
   */
  findComponent(key: string) {
    let result = treeFind(this.screen, key)
    if (result) return result

    const slots = this.slotsContent
    if (!slots) return

    for (const slotName in slots) {
      result = treeFind(slots[slotName], key)
      if (result) return result
    }
  }

  /**
   * Performs the callback function on each element of the component tree, accumulates the return values.
   * @param callback the function that calculates the value for the accumulator.
   * @param initialValue the initial value for the accumulator.
   * @returns the accumulated value.
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
    if (target) return this.#props.view.get(target.type).getActions(target)
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
   * Changes the form to the component with an error description.
   * @param e the error.
   */
  #onLoadError(e: any) {
    console.error(e)
    const componentStore = buildInternalErrorStore(e)
    this.#applyPersistedForm({form: componentStore, localization: {}, defaultLanguage: defaultLanguage.fullCode, languages: []})
  }

  /**
   * Populates the value of this store with the values of the saved form.
   * @param persistedForm saved form value.
   */
  #applyPersistedForm(persistedForm: PersistedForm) {
    this.screen = assign(new ComponentStore('', ''), persistedForm.form)
    this.localization = new LocalizationStore(assign({}, persistedForm.localization))
    this.languages = persistedForm.languages ? [...persistedForm.languages] : []
    this.defaultLanguage = persistedForm.languages?.find(l => l.fullCode === persistedForm.defaultLanguage) ?? defaultLanguage
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
