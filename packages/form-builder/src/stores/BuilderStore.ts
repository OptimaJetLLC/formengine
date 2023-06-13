import {ComponentData, ComponentProperty, ComponentStore, screenModel, Store, StoreProps, ViewMode} from '@react-form-builder/core'
import {assign, cloneDeep} from 'lodash-es'
import {action, IReactionDisposer, makeAutoObservable, observable, reaction} from 'mobx'
import {Annotation} from '../features/annotation/types/annotations/Annotation'
import {BuilderView} from '../features/define/utils/BuilderView'
import {BiDi} from '../features/localization/bidi'
import {defaultLanguage} from '../features/localization/consts'
import {findLanguage, getFullLangCode, onI18nInit, onLanguageChange} from '../features/localization/utils'
import {PanelPlacement} from '../features/ui/Panel'
import {getSystemTheme} from '../utils/getSystemTheme'
import {BuilderMode, BuilderTheme, ComponentMove, InsertPosition} from '../utils/types'
import {AlwaysRejectFormStorage} from './AlwaysRejectFormStorage'
import {uploadStringFile} from './fileUpload'
import {FormStorage} from './FormStorage'

const {After, Inner} = InsertPosition

export interface EditableProperty {
  readonly componentKey: string
  readonly annotation: Annotation
  readonly property?: ComponentProperty
  readonly saveProperty: (property: ComponentProperty) => ComponentProperty
}

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
  readonly #props: Readonly<StoreProps>

  constructor(
    readonly viewer: Store,
    props: Readonly<StoreProps>,
    formStorage?: FormStorage,
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
    this.formStorageEnabled = !!formStorage
    this.formStorage = formStorage || new AlwaysRejectFormStorage()
    this.#props = props

    if (!(props.view instanceof BuilderView)) {
      throw new Error(`The view prop is not instance of BuilderView`)
    }
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

  get oneSelected() {
    return this.selected.size === 1 ? Array.from(this.selected)[0] : undefined
  }

  get formName() {
    return this.#props.formName || '__DefaultForm__'
  }

  get isRTL(): boolean {
    return this.language.bidi === BiDi.RTL
  }

  static getIndexInParent(node: ComponentMove) {
    const {key} = node.store
    const parent = node.parent
    if (!parent) return 0

    return parent.children!.findIndex(item => item.key === key)
  }

  destroy() {
    this.#disposer.forEach(dispose => dispose())
  }

  changeBuilderMode(value: BuilderMode) {
    this.builderMode = value
    this.viewer.isBuilderMode = this.builderMode === 'builder'
  }

  treeMap(store: ComponentStore, callback: (store: ComponentStore) => void) {
    callback(store)
    store.children?.forEach((child: ComponentStore) => this.treeMap(child, callback))
  }

  getAllNodes() {
    const stores: ComponentStore[] = []
    const data: ComponentData[] = []

    this.treeMap(this.viewer.screen, store => stores.push(store))
    stores.forEach(store => data.push(this.viewer.getComponentData(store)))

    return data
  }

  expandAll() {
    this.treeMap(this.viewer.screen, store => this.expanded.add(store))
  }

  collapseAll() {
    this.expanded.clear()
  }

  expand(value: ComponentStore) {
    let parent: ComponentStore | undefined = value
    do {
      if (parent) this.expanded.add(parent)
      parent = this.viewer.cache.get(parent)?.parent
    } while (parent)
  }

  //TODO post processing
  parseForm(text: string) {
    this.viewer.screen = assign(new ComponentStore('', ''), JSON.parse(text))
    if (this.calculatedProperty) this.calculatedProperty = undefined
  }

  //TODO clone for inner components without removing
  clone(source: ComponentMove) {
    this.add(source, source)
  }

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

  multipleMove(target: ComponentMove, insertPosition: InsertPosition = InsertPosition.After) {
    this.selected.forEach((store) => {
      const parent = this.viewer.getComponentData(store).parent
      this.move({store, parent}, target, insertPosition)
    })
  }

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

  remove(source: ComponentMove) {
    const index = BuilderStore.getIndexInParent(source)
    source.parent?.children?.splice(index, 1)
  }

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

  clear() {
    this.viewer.screen = new ComponentStore(screenModel.name, screenModel.type)
  }

  stringifyForm() {
    return JSON.stringify(this.viewer.screen, null, 2)
  }

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

  upload = () => {
    uploadStringFile(this.parseForm.bind(this))
  }

  save(formName?: string) {
    return this.saveForm(formName || this.formName, this.stringifyForm())
  }

  saveForm(formName: string, formValue: string) {
    this.lastSaveTime = new Date()
    return this.formStorage.saveForm(formName, formValue)
  }

  async getFormKeys() {
    const keys = await this.formStorage.getFormNames()
    return keys.map(value => `${value}`) || []
  }

  removeForm(value: string, onSuccess: () => void) {
    this.formStorage.removeForm(value).then(onSuccess)
  }

  loadForm(value: string, onSuccess?: () => void, onError?: (err: any) => void) {
    this.getStoredFormJson(value)
      .then(data => {
        this.parseForm(data)
        onSuccess?.()
      })
      .catch(err => onError?.(err))
  }

  getStoredFormJson(formName: string) {
    return this.formStorage.getForm(formName)
  }

  setPanelVisible(placement: PanelPlacement, visible: boolean) {
    const filtered = this.openedPanels?.filter(key => key !== placement) ?? []
    this.openedPanels = [
      ...filtered,
      ...visible ? [placement] : []
    ]
  }

  expandParents(targetKey: string, store: ComponentStore = this.viewer.screen) {
    if (!store.children) return store.key === targetKey

    if (store.children?.some(child => this.expandParents(targetKey, child))) {
      this.expanded.add(store)
      return true
    }
  }

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
}
