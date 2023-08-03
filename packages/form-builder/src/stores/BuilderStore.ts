import {
  BiDi,
  ComponentData,
  ComponentProperty,
  ComponentStore,
  defaultLanguage,
  LocalizationStore,
  nameObservable,
  PersistedForm,
  Store,
  ViewMode
} from '@react-form-builder/core'
import {assign, cloneDeep} from 'lodash-es'
import {action, IReactionDisposer, makeAutoObservable, observable, reaction} from 'mobx'
import type {EditorType} from '../features/annotation/types'
import {Annotation} from '../features/annotation/types/annotations/Annotation'
import {BuilderView} from '../features/define/utils/BuilderView'
import {languages} from '../features/localization/consts'
import {findLanguage, getFullLangCode, onI18nInit, onLanguageChange} from '../features/localization/utils'
import {PanelPlacement} from '../features/ui/PanelPlacement'
import {annotationResolver} from '../features/validation'
import type {FormBuilderProps} from '../FormBuilderProps'
import {getSystemTheme} from '../utils/getSystemTheme'
import {BuilderMode, BuilderTheme, InsertPosition} from '../utils/types'
import {AlwaysRejectFormStorage} from './AlwaysRejectFormStorage'
import {uploadStringFile} from './fileUpload'
import {FormStorage} from './FormStorage'

/**
 * Parameters of the editable component property.
 */
export interface EditableProperty {
  readonly componentKey: string
  readonly annotation: Annotation
  readonly property?: ComponentProperty
  readonly saveProperty: (property: ComponentProperty) => ComponentProperty
}

/**
 * The callback function called when a component is selected in a modal window.
 */
export type OnSelectCallback = (source: ComponentData) => void

/**
 * The state of the modal window of the component list.
 */
export interface ComponentsModalState {
  opened: boolean
  onSelect: OnSelectCallback
}

/**
 * Form builder settings.
 */
export class BuilderStore {
  builderMode: BuilderMode = 'viewer'
  viewMode: ViewMode = 'desktop'
  landscapeMode?: boolean
  theme: BuilderTheme = getSystemTheme()
  openedPanels: PanelPlacement[] = ['left', 'right']
  language = defaultLanguage
  localizationLanguage = defaultLanguage
  calculatedProperty?: EditableProperty
  lastSaveTime = new Date()
  readonly componentsModalState: ComponentsModalState = {
    opened: false,
    onSelect: () => {}
  }
  readonly errorMap = new Map<ComponentStore, Record<string, string | undefined>>
  readonly view: BuilderView
  readonly formStorageEnabled: boolean
  readonly selected = new Set<ComponentStore>()
  readonly expanded = new Set<ComponentStore>()
  readonly #disposer: IReactionDisposer[]
  private formStorage: FormStorage
  readonly #props: Readonly<FormBuilderProps>

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
        language: observable.ref,
        localizationLanguage: observable.ref,
        destroy: false,
        calculatedProperty: observable.ref,
        builderMode: true,
        viewMode: true,
        openedPanels: true,
        changeBuilderMode: action,
        view: false,
      }
      , {name: nameObservable('BuilderStore')})
    this.formStorageEnabled = !!props.formStorage
    this.formStorage = props.formStorage || new AlwaysRejectFormStorage()
    this.#props = props
    this.view = props.view

    onI18nInit((language: string) => {
      const foundLanguage = findLanguage(language)
      if (getFullLangCode(foundLanguage) !== getFullLangCode(this.language)) {
        this.language = foundLanguage
      }
    })

    this.#disposer = [
      reaction(() => this.language, onLanguageChange),
    ]
  }

  /**
   * Validates all properties of all components on the form.
   */
  validate = async () => {
    await Promise.allSettled(this.viewer.reduceScreen((acc: Promise<string | undefined>[], current) => {
      const meta = this.view.getMeta(current.type)

      meta.properties.forEach(annotation => {
        const validator = annotationResolver({annotation, store: this.viewer})
        if (!this.errorMap.has(current)) {
          this.errorMap.set(current, {})
        }
        const errors = this.errorMap.get(current)!
        for (const key in current.props) {
          acc.push(validator(current.props[key].value, this.viewer)
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
    if (selected) return this.viewer.rootComponentData.findByKey(selected.key)
  }

  /**
   * @returns the current form name.
   */
  get formName() {
    return this.#props.formName || '__DefaultForm__'
  }

  /**
   * @returns true if the form builder is in RTL mode, false otherwise.
   */
  get isRTL(): boolean {
    return this.language.bidi === BiDi.RTL
  }

  /**
   * @returns true if the active language in the form builder is the default one.
   */
  get isDefaultLanguage() {
    return this.localizationLanguage === defaultLanguage
  }

  /**
   * Correctly clears allocated resources, the function must be called when destroying an instance of the class.
   */
  destroy() {
    this.#disposer.forEach(dispose => dispose())
  }

  /**
   * Changes the form builder mode.
   * @param value the new form builder mode.
   */
  changeBuilderMode(value: BuilderMode) {
    this.builderMode = value
    this.viewer.isBuilderMode = this.builderMode === 'builder'
    this.calculatedProperty = undefined
  }

  /**
   * Function for traversing the component tree and handling tree elements with callback.
   * @param store the component tree.
   * @param callback the callback to process a tree element.
   */
  treeMap(store: ComponentStore, callback: (store: ComponentStore) => void) {
    callback(store)
    store.children?.forEach((child: ComponentStore) => this.treeMap(child, callback))
  }

  /**
   * Expands all elements in the component tree.
   */
  expandAll() {
    this.treeMap(this.viewer.screen, store => this.expanded.add(store))
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
    const deserializedForm = JSON.parse(text) as PersistedForm
    const componentStore = ComponentStore.createFromObject(deserializedForm.form)
    this.viewer.rootComponentData = this.viewer.createComponentData(componentStore)
    this.viewer.localization = new LocalizationStore(deserializedForm.localization)
    if (this.calculatedProperty) this.calculatedProperty = undefined
  }

  //TODO clone for inner components without removing
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
    if (source === target) return
    if (insertPosition === InsertPosition.Inner) return source.setParent(target)
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
      const sourceComponentData = this.viewer.rootComponentData.findByKey(store.key)
      if (!sourceComponentData) throw Error(`Component with key ${store.key} not found`)
      this.move(sourceComponentData, target, insertPosition)
    })
  }

  /**
   * Adds the new component to the component tree.
   * @param source the component to be added to the component tree.
   * @param target the parent component for the component to be added.
   * @param insertPosition the insertion position relative to the new parent component.
   * @param bindTo the property name of the parent component where the new component will be added.
   * @param bindCondition the source code of the function that checks if the component can be added.
   * @returns the new added component.
   */
  add(source: ComponentData, target: ComponentData, insertPosition: InsertPosition = InsertPosition.After,
      bindTo?: string, bindCondition?: string) {
    const clone = assign(new ComponentStore('', ''), cloneDeep(source.store))
    clone.bindTo = bindTo
    clone.bindCondition = bindCondition
    this.unifyComponentKeys(clone)
    const componentData = this.viewer.createComponentData(clone)
    this.move(componentData, target, insertPosition)
    this.selected.clear()
    this.selected.add(clone)
    return clone
  }

  /**
   * Removes the component from the component tree.
   * @param source the component for removal.
   */
  remove(source: ComponentData) {
    this.selected.clear()
    this.viewer.localization.removeLocalization(source.key)
    source.delete()
  }

  // todo rename
  // todo private modifier
  /**
   * Sets the component key as the component name and the sequence number of the component.
   * @param source the component.
   * @internal
   */
  unifyComponentKeys(source: ComponentStore) {
    const keysList: string[] = []
    this.treeMap(this.viewer.screen, ({key}) => keysList.push(key))
    this.treeMap(source, item => {
      let count = 1
      const withCount = () => `${item.type} ${count}`
      while (keysList.includes(withCount())) count++
      keysList.push(item.key = withCount())
    })
  }

  /**
   * Clears the current form.
   */
  clear() {
    this.viewer.clear()
  }

  /**
   * Serializes the current form into JSON.
   * @returns the current form serialized to JSON.
   */
  stringifyForm() {
    const selectedLanguages = languages
      .filter(l => l.fullCode === defaultLanguage.fullCode || this.viewer.localization.hasLanguage(l.fullCode))
    const serializedObject: PersistedForm = {
      form: this.viewer.screen,
      localization: this.viewer.localization.value,
      languages: selectedLanguages,
      defaultLanguage: defaultLanguage.fullCode
    }
    return JSON.stringify(serializedObject, null, 2)
  }

  /**
   * Downloads the current form to a file in the browser.
   */
  download = () => {
    const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(this.stringifyForm())

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
  save(formName?: string) {
    return this.saveForm(formName || this.formName, this.stringifyForm())
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
   * @param targetKey the component key.
   * @param store the initial node of the component tree.
   * @returns true if at least one component has been marked as expanded,
   * or if the beginning of the tree matches the component's key, undefined otherwise.
   */
  expandParents(targetKey: string, store: ComponentStore = this.viewer.screen) {
    if (!store.children) return store.key === targetKey

    if (store.children?.some(child => this.expandParents(targetKey, child))) {
      this.expanded.add(store)
      return true
    }
  }

  /**
   * Adds a component to the list of selected components.
   * @param target the component to be added to the list.
   * @param multipleSelection true if you need to add the component to the list of components,
   * false if you need to leave only the component you want to add in the list of selected components.
   */
  selectNode = (target: ComponentStore, multipleSelection = false) => {
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

    if (!isSelected) this.expandParents(target.key)
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
}
