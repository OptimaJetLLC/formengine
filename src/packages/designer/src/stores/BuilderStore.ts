import type {
  Annotation,
  BuilderMode,
  ComponentData,
  EditorType,
  Language,
  NamedActionDefinition,
  PersistedForm,
  Store,
  ViewMode
} from '@react-form-builder/core'
import {
  ActionDefinition,
  BiDi,
  BuilderView,
  cfComponentIsPreset,
  ComponentStore,
  isContainer,
  namedObserver,
  nameObservable,
  PersistedFormVersion,
  screenModel,
  treeForEach
} from '@react-form-builder/core'
import {debounce} from 'lodash-es'
import type {IReactionDisposer} from 'mobx'
import {action, makeAutoObservable, observable, reaction} from 'mobx'
import {EditorMap} from '../features/annotation-editors'
import type {CalculableEditorProps} from '../features/annotation-editors/AnnotationEditorProps'
import type {CodeActionEditorData, CodeActionEditorProps} from '../features/annotation-editors/EventEditor/components/CodeActionEditor'
import type {TranslationResolver} from '../features/localization/BuilderI18n'
import {BuilderI18n} from '../features/localization/BuilderI18n'
import type {FormBuilderI18nData} from '../features/localization/FormBuilderLanguage'
import {builtInLanguages, loadTranslation} from '../features/localization/languageUtils'
import {BuilderPresetComponentOptions} from '../features/preset-component/BuilderPresetComponentOptions'
import {removePresetLocalization} from '../features/preset-component/removePresetLocalization'
import type {PanelPlacement} from '../features/ui/PanelPlacement'
import type {PromptDialogProps} from '../features/ui/PromptDialogProps'
import {annotationResolver} from '../features/validation'
import type {FormBuilderProps} from '../FormBuilderProps'
import {determineTheme} from '../utils/determineTheme'
import {getSystemTheme} from '../utils/getSystemTheme'
import {sortByPositionInTree} from '../utils/sortByPositionInTree'
import type {BuilderTheme, IFormBuilder, InsertPosition} from '../utils/types'
import {AlwaysRejectFormStorage} from './AlwaysRejectFormStorage'
import {AvailableComponents} from './AvailableComponents'
import {CachedFormStorage} from './CachedFormStorage'
import {defaultBottomPanelHeight, defaultOpenedPanels, defaultViewMode} from './constants'
import {EditableFormValidator} from './EditableFormValidator'
import type {EditableFunction} from './EditableFunction'
import {uploadStringFile} from './fileUpload'
import type {IComponentMetadataProvider} from './IComponentMetadataProvider'
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
   * @param hasComputeCode the function for checking the existence of the computed code.
   * @param annotation the annotation object for the property.
   * @param componentKey the key of the component that the property belongs to.
   */
  constructor(
    readonly disableCompute: CalculableEditorProps['disableCompute'],
    readonly setComputeCode: CalculableEditorProps['setComputeCode'],
    readonly getComputeCode: CalculableEditorProps['getComputeCode'],
    readonly getComputeType: CalculableEditorProps['getComputeType'],
    readonly hasComputeCode: CalculableEditorProps['hasComputeCode'],
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
 * The function that checks if the component can be added.
 */
export type CanAddComponentFunction = (componentData: ComponentData) => boolean

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
 * The editable json value.
 */
export class JsonCode {

  /**
   * Creates an editor for JSON.
   * @param editorKey the unique code editor key.
   * @param editorTitle the editor's title.
   * @param json the editable JSON.
   * @param onSave the callback function called when data should be saved.
   * @param onValidate the optional callback function called when data should be validated.
   */
  constructor(readonly editorKey: string,
              readonly editorTitle: string,
              readonly json: string,
              readonly onSave: (value: string) => void,
              readonly onValidate?: (value: string) => void) {
  }
}

/**
 * The editable action data.
 */
export class EditableAction implements CodeActionEditorProps {
  codeAction: CodeActionEditorData

  /**
   * Creates the editable action settings.
   * @param namedAction the named custom action.
   * @param onSave the callback function called when data should be saved.
   */
  constructor(readonly namedAction: NamedActionDefinition,
              readonly onSave: (namedAction: NamedActionDefinition) => void) {
    const clone = JSON.parse(JSON.stringify(namedAction.actionDefinition))
    this.codeAction = {
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
  /**
   * The function that checks if the component can be added.
   * @param componentData the component data.
   * @returns true, if the component can be added, false otherwise.
   */
  canAdd: CanAddComponentFunction
}

/**
 * The state of the modal window for entering a value.
 */
export interface PromptModalState extends PromptDialogProps {
  /**
   * The flag of modal window visibility, if true - the window is shown, if false - the window is hidden.
   */
  opened: boolean

  /**
   * The error messages.
   */
  errors?: Record<string, string | undefined>
}

class BuilderUndoer {
  private serializedForm: string
  readonly undoer
  #disposer: IReactionDisposer

  constructor(readonly builderStore: BuilderStore, maxStackSize?: number, debounceInterval = 1000) {
    makeAutoObservable(this, undefined, {name: nameObservable('BuilderUndoer')})

    let lastFormAsString = this.builderStore.formAsString

    const trackSerializedForm = debounce((formString: string) => {
      if (lastFormAsString !== formString) {
        lastFormAsString = formString
        this.serializedForm = formString
      }
    }, debounceInterval)

    const createReaction = () => {
      return reaction(() => this.builderStore.formAsString, trackSerializedForm)
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
  }

  undo() {
    this.undoer.undo()
    this.builderStore.selected.clear()
  }

  redo() {
    this.undoer.redo()
    this.builderStore.selected.clear()
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
    this.undoer.dispose()
  }
}

const initialModalState = {
  opened: false,
  title: '',
  value: {},
  onOk: () => {
  }
} satisfies PromptModalState

/**
 * Insert component options.
 */
export type InsertComponentOptions = {
  /**
   * The component to be added to the component tree.
   */
  source: ComponentData
  /**
   * The parent component for the component to be added.
   */
  target: ComponentData
  /**
   * The insertion position relative to the new parent component.
   */
  insertPosition?: InsertPosition
  /**
   * The property name of the parent component where the new component will be added.
   */
  slot?: string
  /**
   * The source code of the function that checks if the component can be bound to parent.
   */
  slotCondition?: string
  /**
   * The index in the array, if the parent property is an array property.
   */
  slotIndex?: number
  /**
   * If true, the component will be selected after adding.
   */
  selectAfterInsert?: boolean
}

/**
 * Form builder settings.
 */
export class BuilderStore implements IFormBuilder, IComponentMetadataProvider {
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
  readonly #loadedLanguages: Record<string, FormBuilderI18nData> = {}

  currentEditable?: EditableProperty | EditableAction | CustomValidationCode | JsonCode | EditableFormValidator | EditableFunction
  formListLastReloadTime = new Date()
  readonly componentsModalState: ComponentsModalState = {
    opened: false,
    onSelect: () => {
    },
    canAdd: () => true,
  }
  readonly promptModalState: PromptModalState = initialModalState
  readonly errorMap = new Map<ComponentData, Record<string, string | undefined>>
  readonly view: BuilderView
  readonly formStorageEnabled: boolean
  readonly selected = new Set<ComponentData>()
  readonly expanded = new Set<ComponentData>()
  private readonly formStorage: CachedFormStorage
  readonly #props: Readonly<FormBuilderProps>
  readonly undoer: BuilderUndoer
  readonly presetComponentOptions: BuilderPresetComponentOptions
  activeFormName?: string
  #availableComponents?: AvailableComponents

  /**
   * Creates the form builder settings.
   * @param viewer the form viewer settings.
   * @param props the form viewer properties.
   */
  constructor(
    readonly viewer: Store,
    readonly props: Readonly<FormBuilderProps>,
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
    this.theme = determineTheme(props.theme)

    this.view = props.view
    this.activeFormName = props.formName
    this.formBuilderLanguage = this.availableLanguages[0]
    this.localizationLanguage = this.formBuilderLanguage

    this.presetComponentOptions = new BuilderPresetComponentOptions(
      name => this.view.removeComponent(name),
      builderComponent => this.view.addComponent(builderComponent),
      props.presetComponentOptions
    )

    const translationResolver: TranslationResolver = async language => {
      const loaded = this.#loadedLanguages[language]
      if (loaded) return loaded.data

      const i18nData = await loadTranslation(this.i18n, language)

      if (i18nData) {
        this.#loadedLanguages[language] = i18nData
      }

      return this.#loadedLanguages[language].data
    }
    this.builderI18n = new BuilderI18n(this.defaultLanguage, translationResolver)

    this.undoer = new BuilderUndoer(this, 100)
  }

  /**
   * Opens the code action editor to add a new code action.
   * @param afterAdd the callback function called after a new code action added.
   */
  addCodeAction(afterAdd?: (namedAction: NamedActionDefinition) => void) {
    const emptyActionDefinition = ActionDefinition.sourceAction('')
    const namedAction: NamedActionDefinition = {name: '', actionDefinition: emptyActionDefinition}
    this.editCodeAction(namedAction, namedAction => {
      afterAdd?.(namedAction)
    })
  }

  /**
   * Opens the code action editor.
   * @param namedAction the named action name.
   * @param afterEdit callback function called after data editing.
   */
  editCodeAction(namedAction: NamedActionDefinition,
                 afterEdit?: (namedAction: NamedActionDefinition) => void) {
    this.currentEditable = new EditableAction(namedAction, action => {
      this.viewer.form.updateOrAddAction(namedAction.name, action)
      afterEdit?.(action)
      // recreate action editor with the new data
      this.editCodeAction(action)
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
   * Opens the editor for the form validator.
   */
  editFormValidator() {
    const form = this.viewer.form
    this.currentEditable = new EditableFormValidator(
      'form-validator',
      form.formValidator ?? '',
      code => form.formValidator = code
    )
  }

  /**
   * Opens the editor for JSON.
   * @param componentKey the component key.
   * @param editorTitle the editor's title.
   * @param json the editable JSON.
   * @param onChange the callback function called when data should be saved.
   * @param onValidate the optional callback function called when data should be validated.
   */
  editJsonCode(componentKey: string, editorTitle: string, json: string, onChange: (value: string) => void,
               onValidate?: (value: string) => void) {
    this.currentEditable = new JsonCode(componentKey, editorTitle, json, onChange, onValidate)
  }

  /**
   * Opens the editor for a function.
   * @param fn the properties of the function being edited.
   */
  editFunction(fn: EditableFunction) {
    this.currentEditable = fn
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
    const propsI18N = this.#props.i18n

    return propsI18N && propsI18N.languages.length > 0
      ? propsI18N
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
    return this.#loadedLanguages[this.formBuilderLanguage.fullCode]?.componentsLocale
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
    this.#availableComponents?.dispose()
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
   * @inheritDoc
   */
  parseForm(text: string) {
    this.viewer.applyStringForm(text)

    this.currentEditable = undefined
  }

  /**
   * @inheritDoc
   */
  reloadFormList() {
    this.formListLastReloadTime = new Date()
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
   * @param slot the property name of the parent component where the new component will be added.
   * @param slotCondition the source code of the function that checks if the component can be bound to parent.
   * @returns void
   */
  move(source: ComponentData, target: ComponentData, insertPosition: InsertPosition = 'after', slot?: string, slotCondition?: string): void {
    if (source === target || source === this.viewer.form.componentTree) return

    source.store.slot = slot
    source.store.slotCondition = slotCondition

    if (!this.canAddComponent(source, target, insertPosition, slot)) {
      throw new Error('Can\'t add component')
    }

    if (insertPosition === 'inner' || target.isRoot) return source.setParent(target)
    if (insertPosition === 'before') return target.insertBeforeMe(source)
    if (insertPosition === 'after') return target.insertAfterMe(source)

    throw new Error(`Unknown insert position ${insertPosition}`)
  }

  /**
   * Moves several selected components in the component tree.
   * @param target the new parent component for relocatable components.
   * @param insertPosition the insertion position relative to the new parent component.
   * @param slot the property name of the parent component where the new component will be added.
   * @param slotCondition the source code of the function that checks if the component can be bound to parent.
   */
  multipleMove(target: ComponentData, insertPosition: InsertPosition = 'after', slot?: string, slotCondition?: string) {
    const stores: ComponentData[] = []

    this.orderedSelected.forEach((store) => {
      const sourceComponentData = this.viewer.form.componentTree.findByKey(store.key)
      if (!sourceComponentData) throw Error(`Component with key ${store.key} not found`)
      if (this.canAddComponent(sourceComponentData, target, insertPosition, slot)) {
        stores.push(sourceComponentData)
      }
    })

    // if not all components can be added, then return
    if (this.selected.size !== stores.length) return

    if (insertPosition === 'after') stores.reverse()

    stores.forEach((sourceComponentData) => {
      this.move(sourceComponentData, target, insertPosition, slot, slotCondition)
    })
  }

  /**
   * Creates the new preset component from the selected components.
   * @param name the name of the preset component.
   * @param category the category of the preset component.
   */
  createPresetComponentFromSelected(name: string, category: string) {
    if (this.presetComponentOptions.disableCreation) return

    const components = this.orderedSelected.map(({store}) => store)
    const preset = {
      name,
      category,
      components: removePresetLocalization(components)
    }
    this.presetComponentOptions.addPresetComponent(preset)
    this.presetComponentOptions.onCreate?.(preset)
  }

  /**
   * Adds the new component to the component tree (it's better to use {@link insert} function).
   * @param source the component to be added to the component tree.
   * @param target the parent component for the component to be added.
   * @param insertPosition the insertion position relative to the new parent component.
   * @param slot the property name of the parent component where the new component will be added.
   * @param slotCondition the source code of the function that checks if the component can be bound to parent.
   * @returns the new added component or array of components.
   */
  add(source: ComponentData, target: ComponentData, insertPosition: InsertPosition = 'after',
      slot?: string, slotCondition?: string) {
    if (source.model.isFeatureEnabled(cfComponentIsPreset)) {
      const result: ComponentStore[] = []
      const orderedChildren = insertPosition === 'after'
        ? [...source.children].reverse()
        : source.children

      orderedChildren.forEach((componentData, i) => {
        result.push(this.insert({
          source: componentData,
          target,
          insertPosition,
          slot,
          slotCondition,
          selectAfterInsert: i === 0
        }))
      })
      return result
    }

    return this.insert({
      source,
      target,
      insertPosition,
      slot,
      slotCondition,
      selectAfterInsert: true
    })
  }

  /**
   * Inserts the new component to the component tree.
   * @param options the insert options.
   * @returns the new inserted component.
   */
  insert(options: InsertComponentOptions) {
    const {source, target, insertPosition, slot, slotCondition, selectAfterInsert} = options

    if (!this.canAddComponent(source, target, insertPosition, slot)) {
      throw new Error('Can\'t add component')
    }

    const clone = Object.assign(new ComponentStore('', ''), JSON.parse(JSON.stringify(source.store)))

    const componentData = this.viewer.createComponentData(clone)

    const keysMap = componentData.unifyKeys(this.viewer.form.componentTree)

    this.move(componentData, target, insertPosition ?? 'after', slot, slotCondition)

    treeForEach(componentData, cd => {
      const oldKey = keysMap.get(cd.key)
      if (!oldKey) return
      const localization = this.viewer.form.localization.getLocalizationForComponent(oldKey)
      if (localization) this.viewer.form.localization.addLocalizationWithNewKey(localization, oldKey, cd.key)
    })

    if (selectAfterInsert) this.selectNode(componentData)

    return clone
  }

  /**
   * Checks if a component can be added to the target component.
   * @param source the component to be added to the component tree.
   * @param target the parent component for the component to be added.
   * @param insertPosition the insertion position relative to the new parent component.
   * @param slot the property name of the parent component where the new component will be added.
   * @returns true, if component can be added, false otherwise.
   */
  canAddComponent(source: ComponentData, target: ComponentData, insertPosition: InsertPosition = 'after', slot?: string) {
    const parentComponent = insertPosition === 'inner' ? target : (target.parent ?? target.root)
    return this.canContainComponent(parentComponent, source, slot)
  }

  /**
   * Checks if a component can be moved to the target component.
   * @param source the components to be added to the component tree.
   * @param target the parent component for the component to be added.
   * @param insertPosition the insertion position relative to the new parent component.
   * @param slot the property name of the parent component where the new component will be added.
   * @returns true, if component can be added, false otherwise.
   */
  canMoveComponents(source: Set<ComponentData>, target: ComponentData, insertPosition: InsertPosition = 'after', slot?: string) {
    const parentComponent = insertPosition === 'inner' ? target : (target.parent ?? target.root)

    const selectedComponents = Array.from(source)
      .filter(component => component !== this.viewer.form.componentTree)

    if (selectedComponents.indexOf(parentComponent) >= 0) return false

    const parentRoots = [parentComponent.parent]
    while (typeof parentRoots[parentRoots.length - 1] !== 'undefined') {
      parentRoots.push(parentRoots[parentRoots.length - 1]?.parent)
    }

    for (const component of parentRoots) {
      if (component && selectedComponents.indexOf(component) >= 0) return false
    }

    for (const component of selectedComponents) {
      if (!this.canContainComponent(parentComponent, component, slot)) return false
    }
    return true
  }

  /**
   * Checks if a parent component can contain a child component.
   * @param parent the parent component.
   * @param child the child component.
   * @param slot the name of the parent component property where the child component will be added.
   * @returns true, if the parent component can contain the child component, false otherwise.
   */
  canContainComponent(parent: ComponentData, child: ComponentData, slot?: string) {
    const parentMeta = this.getComponentMetadata(parent.model.type)
    const childMeta = this.getComponentMetadata(child.model.type)
    const slotName = slot ?? 'children'

    if (childMeta.insertRestriction?.(child, parent, slotName) === false) return false

    const annotation = parentMeta.properties.find(p => p.key === slotName)
    if (annotation && isContainer(annotation) && annotation.insertPredicate) {
      return annotation.insertPredicate(parent, child)
    }
    return true
  }

  /**
   * Removes the component from the component tree.
   * @param source the component for removal.
   */
  remove(source: ComponentData) {
    this.selected.delete(source)
    this.viewer.form.localization.removeLocalization(source.key)
    source.delete()
  }

  /**
   * Clears the current form.
   */
  clear() {
    this.viewer.clear()
    this.selected.clear()
  }

  /**
   * @inheritDoc
   */
  get formAsString() {
    const actions = this.viewer.form.actionNames.length ? this.viewer.form.actions : undefined
    const errorProps = Object.keys(this.viewer.form.errorProps).length ? this.viewer.form.errorProps : undefined
    const serializedObject: PersistedForm = {
      version: PersistedFormVersion.version1,
      actions: actions,
      formValidator: this.viewer.form.formValidator,
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
    const name = formName || this.activeFormName
    if (!name) return

    await this.saveForm(name, this.formAsString)
    if (formName) this.activeFormName = formName
  }

  /**
   * Saves the form in the form storage.
   * @param formName the form name.
   * @param formValue the form serialized to JSON.
   * @returns the {@link Promise} with the result of saving the form.
   */
  saveForm(formName: string, formValue: string) {
    this.formListLastReloadTime = new Date()
    return this.formStorage.saveForm(formName, formValue)
  }

  /**
   * Creates a new form in the form storage.
   * @param formName the form name.
   */
  async createForm(formName: string) {
    const persistedForm: PersistedForm = {
      form: new ComponentStore(screenModel.name, screenModel.type),
      localization: {},
      languages: [],
      defaultLanguage: this.defaultLanguage.fullCode
    }
    await this.saveForm(formName, toPrettyJsonString(persistedForm))
    this.activeFormName = formName
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
    if (value === this.activeFormName) this.activeFormName = undefined
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
   * @param options the form options.
   * @returns the {@link Promise} with a form serialized in JSON.
   */
  getStoredFormJson(formName?: string, options?: any) {
    return this.formStorage.getForm(formName, options)
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
        : this.addNodeToSelection(target)
    }

    if (!multipleSelection && !isSelected) {
      this.selected.clear()
      this.addNodeToSelection(target)
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
   * @returns the list of available components grouped by categories.
   */
  get availableComponents() {
    const currentValue = this.#availableComponents
    const timeoutId = setTimeout(() => {
      // we need to dispose the previous value asynchronously so we don't have to change React state during rendering
      currentValue?.dispose()
      clearTimeout(timeoutId)
    }, 0)

    const newValue = new AvailableComponents(this.viewer, this, this.builderComponents)
    this.#availableComponents = newValue
    return newValue.byCategory
  }

  /**
   * @returns the array of metadata of form builder components.
   */
  get builderComponents() {
    const result = [...this.view.builderComponents, ...this.presetComponentOptions.presets]
    const types = result.map(value => value.model.type)
    const typeSet = new Set<string>(types)
    const currentFormComponent = BuilderView.createTemplateComponent(this.formName)
    const externalForms = this.formsMetadata
      .filter(value => !typeSet.has(value.model.type) && currentFormComponent.model.type !== value.model.type)
    result.push(...externalForms)
    return result
  }

  /**
   * @returns true if builder components contains preset components.
   */
  get hasPresetComponents() {
    const {builderComponents} = this

    return builderComponents.some(bc => bc.model.isFeatureEnabled(cfComponentIsPreset))
  }

  /**
   * @returns form metadata from an external form storage.
   */
  get formsMetadata() {
    return this.formStorageEnabled ? this.formStorage.builderComponents : []
  }

  /**
   * @returns the selected components sorted by position in the component tree.
   */
  get orderedSelected() {
    return sortByPositionInTree(
      this.viewer.form.componentTree,
      Array.from(this.selected.values())
    )
  }

  /**
   * Returns the property editor for the specified editorType.
   * @param editorType the property editor type.
   * @returns the property editor for the specified editorType.
   */
  getPropertyEditor(editorType: EditorType) {
    const CustomEditor = this.#props.propertyEditors?.[editorType]
    if (CustomEditor) {
      return namedObserver(CustomEditor.displayName ?? editorType, CustomEditor)
    }
    return EditorMap[editorType]
  }

  /**
   * Displays the modal window of the components.
   * @param onSelect the callback function called when a component is selected.
   * @param canAdd the function that checks if the component can be added.
   */
  showComponentsModal(onSelect: OnSelectCallback, canAdd: CanAddComponentFunction) {
    this.componentsModalState.onSelect = onSelect
    this.componentsModalState.canAdd = canAdd
    this.componentsModalState.opened = true
  }

  /**
   * Displays the modal window for entering a value.
   * @param props the modal window properties.
   */
  showPromptModal(props: PromptDialogProps) {
    Object.assign(this.promptModalState, initialModalState, props, {opened: true, errorMessage: undefined})
  }

  private addNodeToSelection = (target: ComponentData) => {
    this.selected.add(target)
    treeForEach(this.viewer.form.componentTree, componentData => {
      const meta = this.view.findMeta(componentData.model.type)
      meta?.eventListeners?.onSelectNode?.(target, componentData)
    })
  }

  /**
   * Deletes the selected components from the component tree.
   */
  deleteSelectedComponents() {
    const selectedComponents = Array.from(this.selected)

    if (selectedComponents.length <= 0) return

    const root = this.viewer.form.componentTree
    const resultArray: ComponentData[] = []
    const firstSelectedComponent = selectedComponents[0]

    const firstSelectedParent = firstSelectedComponent.parent
    if (firstSelectedParent) {
      const index = firstSelectedParent.children.indexOf(firstSelectedComponent)
      // Add components before the first selected component in reverse order
      resultArray.push(...firstSelectedParent.children.slice(0, index).reverse())
      resultArray.push(...firstSelectedParent.children.slice(index + 1))
    }

    let current = firstSelectedParent
    while (current) {
      resultArray.push(current)
      current = current.parent
    }

    selectedComponents.forEach((component) => {
      if (component !== root) {
        this.remove(component)
      }
    })

    const nextComponent = resultArray.find((component) => !!root.findByKey(component.key))
    if (nextComponent) {
      this.selectNode(nextComponent)
    }
  }
}
