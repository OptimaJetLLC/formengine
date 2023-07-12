import {ComponentData, ComponentProperty, ComponentStore, screenModel, Store, ViewMode} from '@react-form-builder/core'
import {assign, cloneDeep} from 'lodash-es'
import {action, IReactionDisposer, makeAutoObservable, observable, reaction} from 'mobx'
import type {EditorType} from '../features/annotation/types'
import {Annotation} from '../features/annotation/types/annotations/Annotation'
import {BuilderView} from '../features/define/utils/BuilderView'
import {BiDi} from '../features/localization/bidi'
import {defaultLanguage} from '../features/localization/consts'
import {findLanguage, getFullLangCode, onI18nInit, onLanguageChange} from '../features/localization/utils'
import {PanelPlacement} from '../features/ui/PanelPlacement'
import type {FormBuilderProps} from '../FormBuilderProps'
import {getSystemTheme} from '../utils/getSystemTheme'
import {BuilderMode, BuilderTheme, ComponentMove, InsertPosition} from '../utils/types'
import {AlwaysRejectFormStorage} from './AlwaysRejectFormStorage'
import {uploadStringFile} from './fileUpload'
import {FormStorage} from './FormStorage'

const {After, Inner} = InsertPosition

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
 * Form builder settings.
 */
export class BuilderStore {
  builderMode: BuilderMode = 'viewer'
  viewMode: ViewMode = 'desktop'
  landscapeMode?: boolean
  theme: BuilderTheme = getSystemTheme()
  openedPanels: PanelPlacement[] = ['left', 'right']
  language = defaultLanguage
  calculatedProperty?: EditableProperty
  lastSaveTime = new Date()
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
      destroy: false,
      calculatedProperty: observable.ref,
      builderMode: true,
      viewMode: true,
      openedPanels: true,
      changeBuilderMode: action,
      view: false,
    })
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
   * @returns selected component if only one component is selected in the form builder, otherwise undefined.
   */
  get oneSelected() {
    return this.selected.size === 1 ? Array.from(this.selected)[0] : undefined
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
   * Returns the index of the component in the array of child components in the parent component.
   * @param node the component.
   * @returns the index of the component in the array of child components in the parent component.
   */
  static getIndexInParent(node: ComponentMove) {
    const {key} = node.store
    const parent = node.parent
    if (!parent) return 0

    return parent.children!.findIndex(item => item.key === key)
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
   * @returns all elements of the form viewer component tree.
   */
  getAllNodes() {
    const stores: ComponentStore[] = []
    const data: ComponentData[] = []

    this.treeMap(this.viewer.screen, store => stores.push(store))
    stores.forEach(store => data.push(this.viewer.getComponentData(store)))

    return data
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
   * Expand one element in the component tree.
   * @param value the expandable element.
   */
  expand(value: ComponentStore) {
    let parent: ComponentStore | undefined = value
    do {
      if (parent) this.expanded.add(parent)
      parent = this.viewer.cache.get(parent)?.parent
    } while (parent)
  }

  //TODO post processing
  /**
   * Sets the form serialized in JSON as the current form.
   * @param text the form serialized in JSON.
   */
  parseForm(text: string) {
    this.viewer.screen = assign(new ComponentStore('', ''), JSON.parse(text))
    if (this.calculatedProperty) this.calculatedProperty = undefined
  }

  //TODO clone for inner components without removing
  /**
   * Clones the component and adds the clone to the component tree.
   * @param source the cloning component.
   */
  clone(source: ComponentMove) {
    this.add(source, source)
  }

  /**
   * Moves one selected component in the component tree.
   * @param source the selected component.
   * @param target the new parent component for the selected component.
   * @param insertPosition the insertion position relative to the new parent component.
   */
  move(source: ComponentMove, target: ComponentMove, insertPosition: InsertPosition = InsertPosition.After) {
    if (source.store.key === target.store.key) return

    this.remove(source)
    const isInner = insertPosition === Inner
    const index = isInner
      ? target.store.children?.length ?? 0
      : getIndexToPush(target)
    push(source, target, index)


    function push(source: ComponentMove, target: ComponentMove, index: number) {
      const purpose = isInner ? target.store : target.parent ?? target.store
      purpose.children ??= []
      purpose.children?.splice(index, 0, source.store)
    }

    function getIndexToPush(target: ComponentMove) {
      const index = BuilderStore.getIndexInParent(target)
      return insertPosition === After ? index + 1 : index
    }
  }

  /**
   * Moves several selected components in the component tree.
   * @param target the new parent component for relocatable components.
   * @param insertPosition the insertion position relative to the new parent component.
   */
  multipleMove(target: ComponentMove, insertPosition: InsertPosition = InsertPosition.After) {
    this.selected.forEach((store) => {
      const parent = this.viewer.getComponentData(store).parent
      this.move({store, parent}, target, insertPosition)
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
  add(source: ComponentMove, target: ComponentMove, insertPosition: InsertPosition = InsertPosition.After,
      bindTo?: string, bindCondition?: string) {
    const clone = assign(new ComponentStore('', ''), cloneDeep(source.store))
    clone.bindTo = bindTo
    clone.bindCondition = bindCondition
    this.unifyComponentKeys(clone)
    this.move({store: clone}, target, insertPosition)
    this.selected.clear()
    this.selected.add(clone)
    return clone
  }

  /**
   * Removes the component from the component tree.
   * @param source the component for removal.
   */
  remove(source: ComponentMove) {
    const index = BuilderStore.getIndexInParent(source)
    source.parent?.children?.splice(index, 1)
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
    this.viewer.screen = new ComponentStore(screenModel.name, screenModel.type)
  }

  /**
   * Serializes the current form into JSON.
   * @returns the current form serialized to JSON.
   */
  stringifyForm() {
    return JSON.stringify(this.viewer.screen, null, 2)
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
}
