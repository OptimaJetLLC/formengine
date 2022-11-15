import _ from 'lodash'
import {makeAutoObservable, observable, reaction} from 'mobx'
import {defaultLanguage} from '../features/localization/consts'
import {findLanguage, getFullLangCode, onI18nInit, onLanguageChange} from '../features/localization/utils'
import {screen} from '../features/ui/Screen'
import {treeFind} from '../utils'
import {Node} from '../utils/Node'
import {ComponentMove} from '../utils/types'
import {ComponentStore} from './ComponentStore'
import {Store} from './Store'

export class BuilderStore {

  isBuilderMode: boolean = true
  isResizing: boolean = false
  selected?: Node
  language = defaultLanguage

  constructor(
    readonly viewer: Store,
  ) {
    makeAutoObservable(this, {
      selected: observable.ref,
      language: observable.ref
    })

    onI18nInit((language: string) => {
      let foundLanguage = findLanguage(language)
      if (getFullLangCode(foundLanguage) !== getFullLangCode(this.language)) {
        this.language = foundLanguage
      }
    })

    reaction(() => this.language, onLanguageChange)
  }

  get tree(): Node {
    return new Node(this.viewer, this.viewer.screen)
  }

  static getIndexInParent(node: ComponentMove) {
    const child = node.componentStore
    const parent = node.parent
    if (!parent) return 0

    return parent.children!.indexOf(child)
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
    this.viewer.screen = JSON.parse(text)
  }

  //TODO clone for inner components without removing
  clone(source: ComponentMove) {
    const cloned = this.add(source, source, true)
    this.selected = this.findNode(cloned.key)
  }

  move(source: ComponentMove, target: ComponentMove, isAfter: boolean = false, inner: boolean = false) {
    this.remove(source)
    const index = inner
      ? target.componentStore.children?.length ?? 0
      : getIndexToPush(target, isAfter)
    push(source, target, index)


    function push(source: ComponentMove, target: ComponentMove, index: number) {
      let purpose = target.parent || target.componentStore
      purpose.children ??= []
      purpose.children?.splice(index, 0, source.componentStore)
    }

    function getIndexToPush(target: ComponentMove, isAfter: boolean) {
      const index = BuilderStore.getIndexInParent(target)
      return isAfter ? index + 1 : index
    }
  }

  add(source: ComponentMove, target: ComponentMove, isAfter: boolean = false, inner: boolean = false) {
    const clone = _.cloneDeep(source.componentStore)
    this.unifyComponentKeys(clone)
    this.move({componentStore: clone}, target, isAfter, inner)
    this.selected = this.findNode(clone.key)
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
      const withCount = () => item.type + ' ' + count
      while (keysList.includes(withCount())) count++
      keysList.push(item.key = withCount())
    })
  }

  clear() {
    this.viewer.screen = new ComponentStore(screen.name, screen.type)
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
}
