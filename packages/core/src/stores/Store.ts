import {assign} from 'lodash-es'
import {makeObservable, observable} from 'mobx'
import {Subject} from 'rxjs'
import {calculatePropertyValue} from '../features/calculation/propertyCalculator'
import {Model, View} from '../features/define'
import {ActionData, ActionDefinition, ActionEventArgs, ActionType, ActionValues, createActionValuesFromObject} from '../features/event'
import {commonActions} from '../features/event/consts/actions'
import {IFormViewer} from '../features/form-viewer'
import type {ComponentLocalizer} from '../features/form-viewer/ComponentLocalizer'
import {localizeProperties} from '../features/localization/localizer'
import {Language} from '../features/localization/types'
import {createTemplateModel} from '../features/template'
import {buildInternalErrorModel, buildInternalErrorStore} from '../features/ui/internalErrorModel'
import {screenModel} from '../features/ui/screenModel'
import {isTemplateType} from '../features/ui/templateUtil'
import type {SchemaType} from '../features/validation'
import type {ExternalValidators} from '../features/validation/types/ExternalValidationRules'
import {ValidationRules} from '../features/validation/utils/consts'
import {SimpleField} from '../features/validation/utils/SimpleField'
import {TemplateField} from '../features/validation/utils/TemplateField'
import {isStoreDataInParentForm} from '../features/validation/utils/util'
import type {ViewMode} from '../types'
import {isNumber, isPromise, isRecord, isString} from '../utils'
import {ComponentData} from '../utils/contexts/ComponentDataContext'
import {nameObservable} from '../utils/observableNaming'
import {ComponentStore, isFunctionalProperty, isLocalizedProperty} from './ComponentStore'
import {Form} from './Form'
import type {FormViewerValidationRules} from './FormViewerValidationRules'
import type {IStore} from './IStore'
import {LocalizationStore, LocalizationType} from './LocalizationStore'
import type {PersistedForm} from './PersistedForm'

const propertiesToFix: Record<string, string[]> = {
  'RsDatePicker': ['calendarDefaultDate', 'defaultValue', 'value'],
  'RsCalendar': ['defaultValue', 'value'],
}

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

const globalDefaultLanguage = new Language('en', 'US', 'English', 'American English')

/**
 * The form viewer settings.
 */
export class Store implements IStore, IFormViewer {

  selectedLanguage?: Language

  readonly eventSubject = new Subject<ActionEventArgs>()

  viewMode: ViewMode = 'desktop'

  form: Form

  /**
   * Models for templates that have not been explicitly defined.
   */
  #templateMap = new Map<string, Model>()

  /**
   * Creates form viewer settings.
   * @param view the metadata of the form viewer components.
   * @param initialData the initial form data.
   * @param externalValidators the set of metadata of external validation rules, grouped by the type of value being validated.
   * @param externalLocalizer the function to localize the properties of a component.
   * @param externalActions the set of external actions.
   * @param propsLanguage the full language code passed in the FormViewer properties.
   * @param parentStore the form viewer settings, used in templates.
   * @param parentComponentStore the parent component settings.
   */
  constructor(public view: View,
              public initialData: Record<string, unknown>,
              public externalValidators?: ExternalValidators,
              public externalLocalizer?: ComponentLocalizer,
              public externalActions?: ActionValues,
              public propsLanguage?: Language,
              public readonly parentStore?: Store,
              public readonly parentComponentStore?: ComponentStore) {
    const componentTree = this.createComponentData(new ComponentStore(screenModel.name, screenModel.type))
    const localization = new LocalizationStore()
    this.form = new Form(componentTree, localization, {}, [], globalDefaultLanguage)

    makeObservable(this, {
      form: observable,
      viewMode: true,
      selectedLanguage: true,
      initialData: observable.ref,
      clear: true,
      parentStore: observable.ref,
      parentComponentStore: observable.ref,
      initialDataSlice: true,
      externalLocalizer: observable.ref,
    }, {name: nameObservable(`ViewerStore`)})
  }

  /**
   * @returns the Record with the common actions.
   */
  get commonActions() {
    return commonActions
  }

  /**
   * Returns an action by the specified action name and action type.
   * @param name the action name.
   * @param type the action type.
   * @returns the action.
   */
  getAction(name: string, type: ActionType) {
    let action: ActionDefinition | undefined = undefined
    switch (type) {
      case 'common':
        action = this.commonActions[name]
        break
      case 'custom':
        action = this.form.actions[name]
        break
      case 'external':
        action = this.externalActions?.[name]
        break
    }

    if (!action) throw Error(`Action '${name}' with type '${type}' not found!`)
    return action
  }

  /**
   * @inheritDoc
   */
  get formData() {
    return this.form.componentTree
  }

  /**
   * Clears the form in Form Viewer.
   */
  clear() {
    const oldForm = this.form
    const componentTree = this.createComponentData(new ComponentStore(screenModel.name, screenModel.type))
    const localization = new LocalizationStore()
    this.form = new Form(componentTree, localization, {}, oldForm.languages, oldForm.defaultLanguage)
    oldForm.dispose()
  }

  /**
   * @inheritDoc
   */
  dispose() {
    this.form.dispose()
  }

  /**
   * @inheritDoc
   */
  get initialDataSlice(): Record<string, unknown> | undefined {
    if (!this.parentStore || !this.parentComponentStore) return this.initialData
    const dataSlice = this.parentStore.initialDataSlice
    if (isStoreDataInParentForm(this.parentComponentStore)) return dataSlice
    const projection = dataSlice?.[this.parentComponentStore.key]
    return isRecord(projection) ? projection : undefined
  }

  /**
   * @inheritDoc
   */
  reduceScreen<T>(callback: (accumulator: T, current: ComponentData) => T, initialValue: T) {
    return reduceTree(this.form.componentTree, callback, initialValue, 'children')
  }

  /**
   * Searches for an action, returns definition for the found action.
   * @param actionData the action's data.
   * @returns the action definition.
   * @throws Error, if action was not found.
   */
  findAction(actionData: ActionData) {
    return this.getAction(actionData.name, actionData.type)
  }

  /**
   * Returns model for the specified type.
   * @param type the component type.
   * @returns the model for the specified type.
   */
  getModel(type: string) {
    const model = this.view.find(type)
    if (model) return model
    if (isTemplateType(type)) {
      const templateModel = this.#templateMap.get(type)
      return templateModel ?? this.addTemplateModel(type)
    }
    return buildInternalErrorModel(`Type '${type}' is not found!`)
  }

  private addTemplateModel(type: string) {
    // we don't change the view properties to add a template
    const templateModel = createTemplateModel(type)
    this.#templateMap.set(templateModel.type, templateModel)
    return templateModel
  }

  /**
   * Loads a form by form name and sets that form in the form viewer.
   * @param getForm the function that loads the form.
   * @param formName the form name.
   */
  loadForm(getForm?: (name?: string) => string | Promise<string>, formName?: string) {
    if (!getForm) return

    try {
      const form = getForm(formName)
      if (isPromise<string>(form)) {
        form
          .then(this.applyStringForm.bind(this))
          .catch(this.#onLoadError.bind(this))
        return
      }
      this.applyStringForm(form)
    } catch (e) {
      this.#onLoadError(e)
    }
  }

  /**
   * Creates the element for the component tree.
   * @param componentStore the component settings.
   * @param deferFieldCalculation if true, then the calculated field must be explicitly initialized.
   * @returns the element for the component tree.
   */
  createComponentData(componentStore: ComponentStore, deferFieldCalculation = false): ComponentData {
    const model = this.getModel(componentStore.type)
    const field = model.valued ? this.createField(componentStore, model, deferFieldCalculation) : undefined
    const factory = (cs: ComponentStore) => this.createComponentData(cs, deferFieldCalculation)
    return new ComponentData(componentStore, model, field, factory)
  }

  /**
   * Returns the object with validators for the specified value type.
   * @param type the value type.
   * @returns the object with validators for the specified value type.
   */
  getValidationRules(type: SchemaType): FormViewerValidationRules {
    return {
      external: this.externalValidators?.[type],
      internal: ValidationRules[type]
    }
  }

  private createField(componentStore: ComponentStore, model: Model, deferFieldCalculation: boolean) {
    if (!isTemplateType(model.type)) {
      return new SimpleField(this, componentStore, model, updateFnValue(this), this.getValidationRules.bind(this), deferFieldCalculation)
    }

    const childStore = new Store(this.view, this.initialData, this.externalValidators,
      this.externalLocalizer, this.externalActions, this.propsLanguage, this, componentStore)
    return new TemplateField(componentStore, childStore)
  }

  /**
   * Changes the form to the component with an error description.
   * @param e the error.
   */
  #onLoadError(e: any) {
    console.error(e)
    const componentStore = buildInternalErrorStore(e)
    this.applyPersistedForm({
      form: componentStore,
      localization: {},
      defaultLanguage: globalDefaultLanguage.fullCode,
      languages: []
    })
  }

  /**
   * Populates the value of this store with the values of the saved form.
   * @param text saved form value.
   */
  applyStringForm(text: string) {
    const persistedForm = JSON.parse(text) as PersistedForm
    this.fixPropertyTypes(persistedForm.form)
    this.applyPersistedForm(persistedForm)
  }

  private fixPropertyTypes(componentStore: ComponentStore) {
    // workaround, we need to restore the ComponentStore along with metadata information
    const properties = propertiesToFix[componentStore.type]
    properties?.forEach(property => this.fixDateProperty(componentStore, property))
    componentStore.children?.forEach(child => this.fixPropertyTypes(child))
  }

  private fixDateProperty(componentStore: ComponentStore, property: string) {
    const value = componentStore.props[property]?.value
    if (isString(value) || isNumber(value)) {
      componentStore.props[property].value = new Date(value)
    }
  }

  /**
   * Populates the value of this store with the values of the saved form.
   * @param persistedForm saved form value.
   */
  applyPersistedForm(persistedForm: PersistedForm) {
    const oldForm = this.form

    const componentStore = ComponentStore.createFromObject(persistedForm.form)

    const componentData = this.createComponentData(componentStore, true)
    const localization = new LocalizationStore(assign({}, persistedForm.localization))

    const languages = persistedForm.languages?.map(Language.clone) ?? []
    const defaultLanguage = languages.find(l => l.fullCode === persistedForm.defaultLanguage) ?? globalDefaultLanguage

    const actions = createActionValuesFromObject(persistedForm.actions)

    this.form = new Form(componentData, localization, actions, languages, defaultLanguage)

    this.form.errorProps = persistedForm.errorProps ?? {}
    this.form.tooltipType = persistedForm.tooltipType

    // here we initialize the fields after the form is created, since the calculated field values are depends on 'this.form'
    this.form.initFields()
    oldForm.dispose()
  }

  /**
   * @returns the current display language.
   */
  get displayedLanguage() {
    if (this.propsLanguage) {
      const propsLanguage = this.form.languages.find(l => l === this.propsLanguage)
      if (propsLanguage) return propsLanguage
    }
    return this.selectedLanguage ?? this.form.defaultLanguage
  }

  /**
   * Localizes a component store based on the given localization type. If an external localizer is available, it will be used.
   * @param type the type of localization.
   * @param componentStore c the component settings.
   * @returns the Record with the localized properties.
   */
  localizeComponent(type: LocalizationType, componentStore: ComponentStore) {
    if (this.externalLocalizer) return this.externalLocalizer(componentStore, this.displayedLanguage)
    return localizeProperties(this.form, this.displayedLanguage, componentStore, type)
  }
}

function updateFnValue(viewerStore: Store) {
  return function (component: ComponentStore, key: string): [boolean, any?] {
    const property = component.props[key]
    if (isFunctionalProperty(property)) {
      const value = calculatePropertyValue(property, viewerStore.form.componentTree)
      return [true, value]
    }
    if (isLocalizedProperty(property)) {
      const props = viewerStore.localizeComponent('component', component)
      const value = props[key]
      return [true, value]
    }
    return [false]
  }
}
