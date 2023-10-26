import {
  ActionDefinition,
  Annotation,
  BiDi,
  BuilderView,
  ComponentData,
  ComponentPropertyComputeType,
  ComponentStore,
  EditorType,
  Language,
  NamedActionDefinition,
  nameObservable,
  PersistedForm,
  PersistedFormVersion,
  screenModel,
  Store,
  treeForEach,
  ViewMode
} from '@react-form-builder/core'
import {assign, cloneDeep} from 'lodash-es'
import {action, IReactionDisposer, makeAutoObservable, observable, reaction} from 'mobx'
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs'
import {CalculableEditorProps} from '../features/annotation-editors/AnnotationEditorProps'
import type {
  CustomActionEditorData,
  CustomActionEditorProps
} from '../features/annotation-editors/EventEditor/components/CustomActionEditor'
import type {TranslationResolver} from '../features/localization/BuilderI18n'
import {BuilderI18n} from '../features/localization/BuilderI18n'
import type {FormBuilderI18nData} from '../features/localization/FormBuilderLanguage'
import {builtInLanguages, findLanguage} from '../features/localization/languageUtils'
import {PanelPlacement} from '../features/ui/PanelPlacement'
import type {PromptDialogProps} from '../features/ui/PromptDialogProps'
import {annotationResolver} from '../features/validation'
import type {FormBuilderProps} from '../FormBuilderProps'
import {getSystemTheme} from '../utils/getSystemTheme'
import {BuilderMode, BuilderTheme, InsertPosition} from '../utils/types'
import {AlwaysRejectFormStorage} from './AlwaysRejectFormStorage'
import {CachedFormStorage} from './CachedFormStorage'
import {defaultBottomPanelHeight, defaultOpenedPanels, defaultViewMode} from './constants'
import {uploadStringFile} from './fileUpload'
import {trackUndo} from './undo'

function toPrettyJsonString(value: any) {
  return JSON.stringify(value, null, 2)
}

/**
 * Parameters of the editable component property.
 */
export class EditableProperty implements CalculableEditorProps {
  /**
   * Creates the editable property settings.
   * @param disableCompute the function to set the property as not computed.
   * @param setComputeCode the function to set the code value.
   * @param getComputeCode the function to get the code value.
   * @param getComputeType the function to get the computed type of the property.
   * @param annotation the annotation object for the property.
   * @param componentKey the key of the component that the property belongs to.
   */
  constructor(
    readonly disableCompute: () => void,
    readonly setComputeCode: (value: string, type: ComponentPropertyComputeType) => void,
    readonly getComputeCode: (type: ComponentPropertyComputeType) => string,
    readonly getComputeType: () => ComponentPropertyComputeType | undefined,
    readonly annotation: Annotation,
    readonly componentKey: string
  ) {
  }
}

/**
 * The callback function called when a component is selected in a modal window.
 */
export type OnSelectCallback = (source: ComponentData) => void

/**
 * The editable custom validation code.
 */
export class CustomValidationCode {

  /**
   * Creates the editable custom validation code.
   * @param editorKey the unique code editor key.
   * @param code the custom validation code.
   * @param functionSignature the function signature.
   * @param onSave the callback function called when data should be saved.
   */
  constructor(readonly editorKey: string,
              readonly code: string,
              readonly functionSignature: string,
              readonly onSave: (value: string) => void) {
  }
}

/**
 * The editable action data.
 */
export class EditableAction implements CustomActionEditorProps {
  customAction: CustomActionEditorData

  /**
   * Creates the editable action settings.
   * @param namedAction the named custom action.
   * @param onSave the callback function called when data should be saved.
   */
  constructor(readonly namedAction: NamedActionDefinition,
              readonly onSave: (namedAction: NamedActionDefinition) => void) {
    const clone = JSON.parse(JSON.stringify(namedAction.actionDefinition))
    this.customAction = {
      name: namedAction.name,
      body: clone.body ?? '',
      params: clone.params
    }
  }
}

/**
 * The state of the modal window of the component list.
 */
export interface ComponentsModalState {
  /**
   * The flag of modal window visibility, if true - the window is shown, if false - the window is hidden.
   */
  opened: boolean
  /**
   * The callback function called when a component is selected in a modal window.
   */
  onSelect: OnSelectCallback
}

/**
 * The state of the modal window for entering a value.
 */
export interface PromptModalState extends PromptDialogProps {
  /**
   * The flag of modal window visibility, if true - the window is shown, if false - the window is hidden.
   */
  opened: boolean
}

class BuilderUndoer {
  private serializedForm: string
  readonly undoer
  readonly #formChanged = new Subject<string>()
  readonly #subscriptions
  #disposer: IReactionDisposer

  constructor(readonly builderStore: BuilderStore, maxStackSize?: number, debounceInterval = 1000) {
    makeAutoObservable(this, undefined, {name: nameObservable('BuilderUndoer')})

    const createReaction = () => {
      return reaction(() => this.builderStore.formAsString, formString => this.#formChanged.next(formString))
    }

    this.serializedForm = this.builderStore.formAsString
    this.#disposer = createReaction()

    this.undoer = trackUndo(
      () => this.serializedForm,
      value => {
        // turn off reaction
        this.#disposer()
        this.builderStore.parseForm(value)
        // turn on reaction
        this.#disposer = createReaction()
      },
      maxStackSize
    )

    const stream = this.#formChanged
      .pipe(
        debounceTime(debounceInterval),
        distinctUntilChanged(),
      )

    this.#subscriptions = [
      stream.subscribe(value => this.serializedForm = value),
    ]
  }

  undo() {
    this.undoer.undo()
  }

  redo() {
    this.undoer.redo()
  }

  get hasUndo() {
    return this.undoer.hasUndo
  }

  get hasRedo() {
    return this.undoer.hasRedo
  }

  /**
   * Releases allocated resources, must be used when destroying an object instance.
   */
  dispose() {
    this.#disposer()
    this.#subscriptions.forEach(s => s.unsubscribe())
    this.undoer.dispose()
  }
}

/**
 * Form builder settings.
 */
export class BuilderStore {
  builderMode: BuilderMode = 'viewer'
  viewMode: ViewMode = defaultViewMode
  landscapeMode?: boolean
  theme: BuilderTheme = getSystemTheme()
  openedPanels: PanelPlacement[] = defaultOpenedPanels
  bottomPanelHeight = defaultBottomPanelHeight
  testingData?: string
  testingAutorun = true

  private readonly builderI18n: BuilderI18n
  formBuilderLanguage: Language
  localizationLanguage: Language
  private readonly loadedLanguages: Record<string, FormBuilderI18nData> = {}

  currentEditable?: EditableProperty | EditableAction | CustomValidationCode
  lastSaveTime = new Date()
  readonly componentsModalState: ComponentsModalState = {
    opened: false,
    onSelect: () => {
    }
  }
  readonly promptModalState: PromptModalState = {
    opened: false,
    title: '',
    value: '',
    onOk: () => {
    }
  }
  readonly errorMap = new Map<ComponentData, Record<string, string | undefined>>
  readonly view: BuilderView
  readonly formStorageEnabled: boolean
  readonly selected = new Set<ComponentData>()
  readonly expanded = new Set<ComponentData>()
  private readonly formStorage: CachedFormStorage
  readonly #props: Readonly<FormBuilderProps>
  readonly undoer: BuilderUndoer
  activeFormName?: string

  /**
   * Creates the form builder settings.
   * @param viewer the form viewer settings.
   * @param props the form viewer properties.
   */
  constructor(
    readonly viewer: Store,
    props: Readonly<FormBuilderProps>,
  ) {
    makeAutoObservable(this, {
        selected: observable,
        formBuilderLanguage: observable.ref,
        localizationLanguage: observable.ref,
        dispose: false,
        builderMode: true,
        viewMode: true,
        openedPanels: true,
        changeBuilderMode: action,
        view: false
      }
      , {name: nameObservable('BuilderStore')})
    this.formStorageEnabled = !!props.formStorage
    this.formStorage = new CachedFormStorage(props.formStorage ?? new AlwaysRejectFormStorage())
    if (this.formStorageEnabled) {
      this.formStorage.getFormNames().catch(console.error)
    }

    this.#props = props
    this.view = props.view
    this.activeFormName = props.formName
    this.formBuilderLanguage = this.availableLanguages[0]
    this.localizationLanguage = this.formBuilderLanguage

    const translationResolver: TranslationResolver = async language => {
      const loaded = this.loadedLanguages[language]
      if (loaded) return loaded.data

      const found = findLanguage(this.availableLanguages, language) ?? this.defaultLanguage
      const i18nData = await this.i18n.getData(found.fullCode)
      this.loadedLanguages[language] = i18nData
      return i18nData.data
    }
    this.builderI18n = new BuilderI18n(this.defaultLanguage, translationResolver)

    this.undoer = new BuilderUndoer(this, 100)
  }

  /**
   * Opens the custom action editor to add a new custom action.
   * @param afterAdd the callback function called after a new custom action added.
   */
  addCustomAction(afterAdd?: (namedAction: NamedActionDefinition) => void) {
    const emptyActionDefinition = ActionDefinition.sourceAction('')
    const namedAction: NamedActionDefinition = {name: '', actionDefinition: emptyActionDefinition}
    this.editCustomAction(namedAction, namedAction => {
      afterAdd?.(namedAction)
    })
  }

  /**
   * Opens the custom action editor.
   * @param namedAction the named action name.
   * @param afterEdit callback function called after data editing.
   */
  editCustomAction(namedAction: NamedActionDefinition,
                   afterEdit?: (namedAction: NamedActionDefinition) => void) {
    this.currentEditable = new EditableAction(namedAction, action => {
      this.viewer.form.updateOrAddAction(namedAction.name, action)
      afterEdit?.(action)
      // recreate action editor with the new data
      this.editCustomAction(action)
    })
  }

  /**
   * Opens the custom validation code editor.
   * @param componentKey the component key.
   * @param code the custom validation code.
   * @param functionSignature the function signature.
   * @param onChange the callback function called when data should be saved.
   */
  editCustomValidationCode(componentKey: string, code: string, functionSignature: string,
                           onChange: (value: string) => void) {
    this.currentEditable = new CustomValidationCode(componentKey, code, functionSignature, onChange)
  }

  /**
   * Changes the language in the form builder.
   * @param language the language to be set.
   */
  changeLanguage(language: Language) {
    this.builderI18n.changeWebDocumentLanguage(language)
      .then(() => this.formBuilderLanguage = language)
      .catch(e => console.error(e))
  }

  /**
   * @returns the i18n data of the form builder.
   */
  get i18n() {
    return this.#props.i18n && this.#props.i18n.languages.length > 0
      ? this.#props.i18n
      : builtInLanguages
  }

  /**
   * @returns set of languages for translating the Form Builder interface.
   */
  get availableLanguages() {
    return this.i18n.languages
  }

  /**
   * @returns the default language.
   */
  get defaultLanguage() {
    return this.availableLanguages[0]
  }

  /**
   * @returns the current locale for the components.
   */
  get componentsLocale() {
    return this.loadedLanguages[this.formBuilderLanguage.fullCode]?.componentsLocale
  }

  /**
   * Validates all properties of all components on the form.
   */
  validate = async () => {
    await Promise.allSettled(this.viewer.reduceScreen((acc: Promise<string | undefined>[], current) => {
      const meta = this.getComponentMetadata(current.store.type)

      meta.properties.forEach(annotation => {
        const validator = annotationResolver({annotation, store: this.viewer})
        if (!this.errorMap.has(current)) {
          this.errorMap.set(current, {})
        }
        const errors = this.errorMap.get(current)!
        for (const key in current.store.props) {
          acc.push(validator(current.store.props[key].value, this.viewer)
            .then(error => {
              if (!error) return errors[annotation.key] = undefined

              const messages = error.map(e => e.message)
                .filter(e => e !== 'undefined')
                .join('; ')
              return errors[annotation.key] = messages
            }))
        }
      })

      return acc
    }, []))
  }

  /**
   * @returns selected component if only one component is selected in the form builder, otherwise undefined.
   */
  get oneSelected() {
    return this.selected.size === 1 ? Array.from(this.selected)[0] : undefined
  }

  /**
   * @returns the selected tree element if only one component is selected in the form builder, otherwise undefined.
   */
  get oneSelectedComponentData() {
    const selected = this.oneSelected
    if (selected) return this.viewer.form.componentTree.findByKey(selected.key)
  }

  /**
   * @returns the current form name.
   */
  get formName() {
    return this.activeFormName || '__DefaultForm__'
  }

  /**
   * @returns true if the form builder is in RTL mode, false otherwise.
   */
  get isRTL(): boolean {
    return this.formBuilderLanguage.bidi === BiDi.RTL
  }

  /**
   * Correctly clears allocated resources, the function must be called when destroying an instance of the class.
   */
  dispose() {
    this.undoer.dispose()
  }

  /**
   * Changes the form builder mode.
   * @param value the new form builder mode.
   */
  changeBuilderMode(value: BuilderMode) {
    this.builderMode = value
    this.currentEditable = undefined
  }

  /**
   * Expands all elements in the component tree.
   */
  expandAll() {
    treeForEach(this.viewer.form.componentTree, componentData => this.expanded.add(componentData))
  }

  /**
   * Collapses all elements in the component tree.
   */
  collapseAll() {
    this.expanded.clear()
  }

  /**
   * Sets the form serialized in JSON as the current form.
   * @param text the form serialized in JSON.
   */
  parseForm(text: string) {
    this.viewer.applyStringForm(text)

    this.currentEditable = undefined
  }

  /**
   * Clones the component and adds the clone to the component tree.
   * @param source the cloning component.
   */
  clone(source: ComponentData) {
    this.add(source, source)
  }

  /**
   * Moves one selected component in the component tree.
   * @param source the selected component.
   * @param target the new parent component for the selected component.
   * @param insertPosition the insertion position relative to the new parent component.
   * @returns void
   */
  move(source: ComponentData, target: ComponentData, insertPosition: InsertPosition = InsertPosition.After): void {
    if (source === target || source === this.viewer.form.componentTree) return
    if (insertPosition === InsertPosition.Inner || target.isRoot) return source.setParent(target)
    if (insertPosition === InsertPosition.Before) return target.insertBeforeMe(source)
    if (insertPosition === InsertPosition.After) return target.insertAfterMe(source)
    throw new Error(`Unknown insert position ${insertPosition}`)
  }

  /**
   * Moves several selected components in the component tree.
   * @param target the new parent component for relocatable components.
   * @param insertPosition the insertion position relative to the new parent component.
   */
  multipleMove(target: ComponentData, insertPosition: InsertPosition = InsertPosition.After) {
    this.selected.forEach((store) => {
      const sourceComponentData = this.viewer.form.componentTree.findByKey(store.key)
      if (!sourceComponentData) throw Error(`Component with key ${store.key} not found`)
      this.move(sourceComponentData, target, insertPosition)
    })
  }

  /**
   * Adds the new component to the component tree.
   * @param source the component to be added to the component tree.
   * @param target the parent component for the component to be added.
   * @param insertPosition the insertion position relative to the new parent component.
   * @param slot the property name of the parent component where the new component will be added.
   * @param slotCondition the source code of the function that checks if the component can be bound to parent.
   * @returns the new added component.
   */
  add(source: ComponentData, target: ComponentData, insertPosition: InsertPosition = InsertPosition.After,
      slot?: string, slotCondition?: string) {
    const clone = assign(new ComponentStore('', ''), cloneDeep(source.store))
    clone.slot = slot
    clone.slotCondition = slotCondition

    const componentData = this.viewer.createComponentData(clone)

    const keysMap = componentData.unifyKeys(this.viewer.form.componentTree)

    this.move(componentData, target, insertPosition)

    treeForEach(componentData, cd => {
      const oldKey = keysMap.get(cd.key)
      if (!oldKey) return
      const localization = this.viewer.form.localization.getLocalizationForComponent(oldKey)
      if (localization) this.viewer.form.localization.addLocalizationWithNewKey(localization, oldKey, cd.key)
    })

    this.selectNode(componentData)

    return clone
  }

  /**
   * Removes the component from the component tree.
   * @param source the component for removal.
   */
  remove(source: ComponentData) {
    this.selected.clear()
    this.viewer.form.localization.removeLocalization(source.key)
    source.delete()
  }

  /**
   * Clears the current form.
   */
  clear() {
    this.viewer.clear()
  }

  /**
   * @returns the current form serialized to JSON.
   */
  get formAsString() {
    const actions = this.viewer.form.actionNames.length ? this.viewer.form.actions : undefined
    const errorProps = Object.keys(this.viewer.form.errorProps).length ? this.viewer.form.errorProps : undefined
    const serializedObject: PersistedForm = {
      version: PersistedFormVersion.version1,
      actions: actions,
      errorProps: errorProps,
      tooltipType: this.viewer.form.tooltipType,
      errorType: this.viewer.form.errorType,
      form: this.viewer.form.componentTree.store,
      localization: this.viewer.form.localization.value,
      languages: this.formAvailableLanguages,
      defaultLanguage: this.viewer.form.defaultLanguage.fullCode
    }
    return toPrettyJsonString(serializedObject)
  }

  /**
   * @returns the list of available languages for the form.
   */
  get formAvailableLanguages() {
    return this.availableLanguages.filter(l => {
      return l.fullCode === this.defaultLanguage.fullCode
        || this.viewer.form.localization.hasLanguage(l.fullCode)
    })
  }

  /**
   * Downloads the current form to a file in the browser.
   */
  download = () => {
    const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(this.formAsString)

    const link = document.createElement('a')
    link.setAttribute('href', data)
    link.setAttribute('download', 'form.json')
    document.body.appendChild(link)
    link.onclick = () => {
      document.body.removeChild(link)
    }
    link.click()
  }

  /**
   * Loads a form from the file selected in the browser.
   */
  upload = () => {
    uploadStringFile(this.parseForm.bind(this))
  }

  /**
   * Saves the current form in the form storage.
   * @param formName the form name.
   * @returns the {@link Promise} with the result of saving the form.
   */
  async save(formName?: string) {
    const name = formName || this.formName
    const result = await this.saveForm(name, this.formAsString)
    this.activeFormName = name
    return result
  }

  /**
   * Saves the form in the form storage.
   * @param formName the form name.
   * @param formValue the form serialized to JSON.
   * @returns the {@link Promise} with the result of saving the form.
   */
  saveForm(formName: string, formValue: string) {
    this.lastSaveTime = new Date()
    return this.formStorage.saveForm(formName, formValue)
  }

  /**
   * Creates a new form in the form storage.
   * @param formName the form name.
   * @returns the Promise with the result of the form creation.
   */
  createForm(formName: string) {
    const persistedForm: PersistedForm = {
      form: new ComponentStore(screenModel.name, screenModel.type),
      localization: {},
      languages: [],
      defaultLanguage: this.defaultLanguage.fullCode
    }
    return this.saveForm(formName, toPrettyJsonString(persistedForm))
  }

  /**
   * @returns the {@link Promise} with all form names from the form storage.
   */
  async getFormKeys() {
    const keys = await this.formStorage.getFormNames()
    return keys.map(value => `${value}`) || []
  }

  /**
   * Removes the form from the form storage by form name.
   * @param value the form name.
   * @param onSuccess the callback function that is called when a form is successfully removed.
   */
  removeForm(value: string, onSuccess: () => void) {
    this.formStorage.removeForm(value).then(onSuccess)
  }

  /**
   * Loads the form from the form storage into the form builder.
   * @param value the form name.
   * @param onSuccess the callback function that is called when the form is loaded successfully.
   * @param onError the callback function that is called if the form fails to load.
   */
  loadForm(value: string, onSuccess?: () => void, onError?: (err: any) => void) {
    this.getStoredFormJson(value)
      .then(data => {
        this.parseForm(data)
        this.activeFormName = value
        onSuccess?.()
      })
      .catch(err => onError?.(err))
  }

  /**
   * @param formName the form name.
   * @returns the {@link Promise} with a form serialized in JSON.
   */
  getStoredFormJson(formName: string) {
    return this.formStorage.getForm(formName)
  }

  /**
   * Hides or shows the form builder panel.
   * @param placement placement of the form builder panel.
   * @param visible true if you want to show the panel, false otherwise.
   */
  setPanelVisible(placement: PanelPlacement, visible: boolean) {
    const filtered = this.openedPanels?.filter(key => key !== placement) ?? []
    this.openedPanels = [
      ...filtered,
      ...visible ? [placement] : []
    ]
  }

  /**
   * Expands all the parents of a component in the form builder's component tree.
   * @param target the expanded component.
   * @param componentTree the initial node of the component tree.
   * @returns true if at least one component has been marked as expanded,
   * or if the beginning of the tree matches the component's key, undefined otherwise.
   */
  expandParents(target: ComponentData, componentTree: ComponentData = this.viewer.form.componentTree) {
    if (!componentTree.children?.length) return componentTree.key === target.key

    if (componentTree.children.some(child => this.expandParents(target, child))) {
      this.expanded.add(componentTree)
      return true
    }
  }

  /**
   * Adds a component to the list of selected components.
   * @param target the component to be added to the list.
   * @param multipleSelection true if you need to add the component to the list of components,
   * false if you need to leave only the component you want to add in the list of selected components.
   */
  selectNode = (target: ComponentData, multipleSelection = false) => {
    const isSelected = this.selected.has(target)

    if (multipleSelection) {
      isSelected
        ? this.selected.delete(target)
        : this.selected.add(target)
    }

    if (!multipleSelection && !isSelected) {
      this.selected.clear()
      this.selected.add(target)
    }

    if (!isSelected) this.expandParents(target)
  }

  /**
   * Returns the component metadata for the specified component type name.
   * @param type the component type name.
   * @returns the component metadata for the specified component type name.
   */
  getComponentMetadata(type: string) {
    return this.view.findMeta(type)
      ?? this.builderComponents.find(value => value.model.type === type)?.meta
      ?? this.view.getMeta(type)
  }

  /**
   * @returns the array of metadata of form builder components.
   */
  get builderComponents() {
    const result = [...this.view.builderComponents]
    const types = result.map(value => value.model.type)
    const typeSet = new Set<string>(types)
    const currentFormComponent = BuilderView.createTemplateComponent(this.formName)
    const externalForms = this.formsMetadata
      .filter(value => !typeSet.has(value.model.type) && currentFormComponent.model.type !== value.model.type)
    result.push(...externalForms)
    return result
  }

  /**
   * @returns form metadata from an external form storage.
   */
  get formsMetadata() {
    return this.formStorageEnabled ? this.formStorage.builderComponents : []
  }

  /**
   * Returns the custom property editor for the specified editorType.
   * @param editorType the property editor type.
   * @returns the custom property editor for the specified editorType.
   */
  customPropertyEditor(editorType: EditorType) {
    return this.#props.externalPropertyEditors?.[editorType]
  }

  /**
   * Displays the modal window of the components.
   * @param onSelect the callback function called when a component is selected.
   */
  showComponentsModal(onSelect: OnSelectCallback) {
    this.componentsModalState.onSelect = onSelect
    this.componentsModalState.opened = true
  }

  /**
   * Displays the modal window for entering a value.
   * @param props the modal window properties.
   */
  showPromptModal(props: PromptDialogProps) {
    Object.assign(this.promptModalState, props, {opened: true})
  }
}
