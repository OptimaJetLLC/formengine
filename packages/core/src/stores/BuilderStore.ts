import {getSystemTheme, PanelPlacement} from 'form-builder'
import {assign, cloneDeep} from 'lodash'
import {action, IReactionDisposer, makeAutoObservable, observable, reaction} from 'mobx'
import {ComponentType} from 'react'
import {Annotation} from '../features/annotation/utils/annotations/Annotation'
import {BiDi} from '../features/localization/bidi'
import {defaultLanguage} from '../features/localization/consts'
import {findLanguage, getFullLangCode, onI18nInit, onLanguageChange} from '../features/localization/utils'
import {fbScreen} from '../features/ui/FbScreen'
import {treeFind} from '../utils'
import {Node} from '../utils/Node'
import {BuilderMode, BuilderTheme, BuilderViewMode, ComponentMove, InsertPosition} from '../utils/types'
import {ComponentStore} from './ComponentStore'
import {Store} from './Store'
import {DropZoneProps} from './StoreProps'

const {After, Inner} = InsertPosition

export class BuilderStore {
  builderMode: BuilderMode = 'viewer'
  viewMode: BuilderViewMode = 'desktop'
  theme: BuilderTheme = getSystemTheme()
  openedPanels: PanelPlacement[] = ['left', 'right']
  selected?: Node
  language = defaultLanguage
  calculatedProperty?: {
    readonly componentStore: ComponentStore
    readonly annotation: Annotation
  }
  readonly #disposer: IReactionDisposer

  constructor(
    readonly viewer: Store,
    private readonly componentWrapper: ComponentType<any>,
    private readonly dropZone?: ComponentType<DropZoneProps>
  ) {
    makeAutoObservable(this, {
      selected: observable.ref,
      language: observable.ref,
      destroy: false,
      calculatedProperty: observable.ref,
      builderMode: true,
      viewMode: true,
      openedPanels: true,
      changeBuilderMode: action
    })

    onI18nInit((language: string) => {
      let foundLanguage = findLanguage(language)
      if (getFullLangCode(foundLanguage) !== getFullLangCode(this.language)) {
        this.language = foundLanguage
      }
    })

    this.#disposer = reaction(() => this.language, onLanguageChange)
  }

  get tree(): Node {
    return new Node(this.viewer, this.viewer.screen)
  }

  get isRTL(): boolean {
    return this.language.bidi === BiDi.RTL
  }

  static getIndexInParent(node: ComponentMove) {
    const child = node.componentStore
    const parent = node.parentStore
    if (!parent) return 0

    return parent.children!.indexOf(child)
  }

  destroy() {
    this.#disposer()
  }

  changeBuilderMode(value: BuilderMode) {
    this.builderMode = value
    if (this.builderMode === 'builder') {
      this.viewer.props.componentWrapper = this.componentWrapper
      this.viewer.props.dropZone = this.dropZone
      return
    }
    this.viewer.props.componentWrapper = undefined
    this.viewer.props.dropZone = undefined
  }

  treeMap(store: ComponentStore, callback: (store: ComponentStore) => void) {
    callback(store)
    store.children?.forEach((child: ComponentStore) => this.treeMap(child, callback))
  }

  findNode = (key?: string) => treeFind(this.tree, key)

  //TODO set in provider

  getAllNodes() {
    const nodes: Node[] = []
    getKey(this.tree)
    return nodes

    function getKey(node: Node) {
      if (node.key) nodes.push(node)

      if (node.children) node.children.map(getKey)
    }
  }

  //TODO post processing
  parseForm(text: string) {
    this.viewer.screen = assign(new ComponentStore('', ''), JSON.parse(text))
  }

  //TODO clone for inner components without removing
  clone(source: ComponentMove) {
    const cloned = this.add(source, source)
    this.selected = this.findNode(cloned.key)
  }

  move(source: ComponentMove, target: ComponentMove, insertPosition: InsertPosition = InsertPosition.After) {
    this.remove(source)
    const isInner = insertPosition === Inner
    const index = isInner
      ? target.componentStore.children?.length ?? 0
      : getIndexToPush(target)
    push(source, target, index)


    function push(source: ComponentMove, target: ComponentMove, index: number) {
      const purpose = isInner ? target.componentStore : target.parentStore ?? target.componentStore
      purpose.children ??= []
      purpose.children?.splice(index, 0, source.componentStore)
    }

    function getIndexToPush(target: ComponentMove) {
      const index = BuilderStore.getIndexInParent(target)
      return insertPosition === After ? index + 1 : index
    }
  }

  add(source: ComponentMove, target: ComponentMove, insertPosition: InsertPosition = InsertPosition.After, bindTo?: string) {
    const clone = assign(new ComponentStore('', ''), cloneDeep(source.componentStore))
    clone.bindTo = bindTo
    this.unifyComponentKeys(clone)
    this.move({componentStore: clone}, target, insertPosition)
    this.selected = this.findNode(clone.key)
    return clone
  }

  remove(source: ComponentMove) {
    const index = BuilderStore.getIndexInParent(source)
    source.parentStore?.children?.splice(index, 1)
  }

  unifyComponentKeys(source: ComponentStore) {
    const keysList: string[] = []
    this.treeMap(this.viewer.screen, ({key}) => keysList.push(key))
    this.treeMap(source, item => {
      let count = 1
      const withCount = () => item.type + ' ' + count
      while (keysList.includes(withCount())) count++
      keysList.push(item.key = withCount())
    })
  }

  clear() {
    this.viewer.screen = new ComponentStore(fbScreen.name, fbScreen.type)
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
    const input = document.createElement('input')
    input.type = 'file'

    input.onchange = e => {

      const target = e.target as HTMLInputElement
      const file: File = (target.files as FileList)[0]

      // setting up the reader
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
        const content: string = readerEvent.target?.result as string ?? '' // this is the content!

        this.parseForm(content)
      }

    }

    input.click()
  }

  setPanelVisible(placement: PanelPlacement, visible: boolean) {
    const filtered = this.openedPanels?.filter(key => key !== placement) ?? []
    this.openedPanels = [
      ...filtered,
      ...visible ? [placement] : []
    ]
  }
}
