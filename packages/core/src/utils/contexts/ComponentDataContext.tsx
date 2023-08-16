import {FluentVariable} from '@fluent/bundle/esm/bundle.js'
import {makeAutoObservable} from 'mobx'
import {Model} from '../../features/define'
import {getFluentCompatibleId} from '../../features/localization/getFluentCompatibleId'
import {isFluentVariable} from '../../features/localization/isFluentVariable'
import type {Field} from '../../features/validation'
import {ComponentStore} from '../../stores/ComponentStore'
import {createNonNullableContext} from '../createNonNullableContext'
import type {IFormData} from '../IFormData'
import {nameObservable} from '../observableNaming'
import {treeForEach} from '../treeUtils'

let counter = 0

function generateId(prefix: string) {
  return `${prefix}_${++counter}`
}

/**
 * This tree of elements contains the data required to display the component. It is synchronized with the ComponentStore tree.
 */
export class ComponentData implements IFormData {
  readonly id: string
  readonly store: ComponentStore
  readonly model: Model
  readonly field?: Field
  parent?: ComponentData
  children: ComponentData[] = []

  /**
   * User defined properties of the React component.
   */
  userDefinedProps?: Record<string, any>

  /**
   * Constructor
   * @param componentStore the component settings.
   * @param model the component metadata for the form viewer.
   * @param field the field with the form data.
   * @param childFactory the factory function that creates {@ComponentData} instance.
   */
  constructor(componentStore: ComponentStore, model: Model, field: Field | undefined,
              childFactory: (componentStore: ComponentStore) => ComponentData) {
    this.store = componentStore
    this.model = model
    this.field = field
    this.id = generateId(this.model.type)

    componentStore.children?.forEach(childComponentStore => {
      const child = childFactory(childComponentStore)
      child.setParent(this)
    })

    makeAutoObservable(this, undefined, {name: nameObservable('ComponentData', {key: componentStore.key})})
  }

  /**
   * Sets the new parent for this node.
   * @param newParent the new parent.
   */
  setParent(newParent: ComponentData) {
    this.parent?.removeChild(this)
    newParent.addChild(this)
    this.parent = newParent
  }

  /**
   * Inserts the given node after this node.
   * @param inserted the node to insert.
   */
  insertAfterMe(inserted: ComponentData) {
    if (!this.parent) {
      throw new Error(`Cannot insert without parent. Key = ${this.key}`)
    }
    inserted.parent?.removeChild(inserted)
    inserted.parent = this.parent
    const children = this.parent.children
    const index = children.indexOf(this)
    if (index < 0) {
      throw new Error(`Cannot insert after not existing element into ComponentData. Key = ${this.key}`)
    }
    children.splice(index + 1, 0, inserted)
    this.parent.store.children ??= []
    const storeChildren = this.parent.store.children
    const storeIndex = children.indexOf(this)
    if (storeIndex < 0) {
      throw new Error(`Cannot insert after not existing element into ComponentStore. Key = ${this.key}`)
    }
    storeChildren.splice(storeIndex + 1, 0, inserted.store)
  }

  /**
   * Inserts the given node before this node.
   * @param inserted the node to insert.
   */
  insertBeforeMe(inserted: ComponentData) {
    if (!this.parent) {
      throw new Error(`Cannot insert without parent. Key = ${this.key}`)
    }
    inserted.parent?.removeChild(inserted)
    inserted.parent = this.parent
    const children = this.parent.children
    const index = children.indexOf(this)
    if (index < 0) {
      throw new Error(`Cannot insert before not existing element into ComponentData. Key = ${this.key}`)
    }
    children.splice(index, 0, inserted)
    this.parent.store.children ??= []
    const storeChildren = this.parent.store.children
    const storeIndex = children.indexOf(this)
    if (storeIndex < 0) {
      throw new Error(`Cannot insert before not existing element into ComponentStore. Key = ${this.key}`)
    }
    storeChildren.splice(storeIndex, 0, inserted.store)
  }

  /**
   * @returns the key of this node (same as the key of the ComponentStore).
   */
  get key(): string {
    return this.store.key
  }

  /**
   * Find the node with the given key.
   * @param key the key to find.
   * @returns the node or undefined if not found.
   */
  findByKey(key: string): ComponentData | undefined {
    if (this.key === key) return this
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      const found = child.findByKey(key)
      if (found) return found
    }
    return undefined
  }

  /**
   * Assigns unique keys to the items in the tree.
   * @param root the root of the tree to unify keys. Defaults to the root of this tree.
   */
  unifyKeys(root: ComponentData) {
    const keysList: string[] = []
    treeForEach(root, ({key}: ComponentData) => {
      keysList.push(key)
    })
    treeForEach(this as ComponentData, item => {
      let count = 1
      const withCount = () => `${item.store.type} ${count}`
      while (keysList.includes(withCount())) count++
      keysList.push(item.store.key = withCount())
    })
  }

  /**
   * @returns all the fields in the tree as a map. Starts from this node.
   */
  get fields(): Map<string, Field> {
    return this.collectAllFields(new Map<string, Field>())
  }

  /**
   * Deletes this node from the tree.
   */
  delete() {
    this.parent?.removeChild(this)
    this.field?.dispose()
  }

  /**
   * @inheritDoc
   */
  get data() {
    const result: Record<string, unknown> = {}
    for (const [key, field] of this.fields) {
      if (field.storeDataInParentForm) {
        const fieldValue: Record<string, any> = field.value || {}
        Object.keys(fieldValue).forEach(i => result[i] = fieldValue[i])
      } else {
        result[key] = field.value
      }
    }
    return result
  }

  /**
   * @returns all the form data that is of the {@link FluentVariable} type.
   * Additionally, the keys of the returned object are converted to the snake case.
   */
  get fluentData() {
    const fluentData: Record<string, FluentVariable> = {}
    for (const [key, value] of Object.entries(this.data)) {
      if (isFluentVariable(value)) {
        fluentData[getFluentCompatibleId(key)] = value
      }
    }
    return fluentData
  }

  /**
   * @inheritDoc
   */
  get errors() {
    const result: Record<string, unknown> = {}
    for (const [key, field] of this.fields) {
      if (field.error) result[key] = field.error
    }
    return result
  }

  /**
   * @inheritDoc
   */
  setAllErrors(message?: string) {
    this.fields.forEach(f => f.error = message)
  }

  /**
   * Validates the data in the form.
   */
  async validate() {
    await Promise.allSettled([...this.fields.values()].map(f => f.validate()))
  }

  /**
   * @inheritDoc
   */
  reset() {
    this.fields.forEach(f => f.reset())
  }

  /**
   * @inheritDoc
   */
  clear() {
    this.fields.forEach(f => f.clear())
  }

  /**
   * Dispose method that releases resources used by the object.
   * It disposes the field and all the children objects.
   */
  dispose() {
    const allNodes = this.collectAllNodesAsArray([])
    allNodes.forEach(componentData => {
      componentData.field?.dispose()
      componentData.parent = undefined
      componentData.children = []
    })
  }

  /**
   * @returns true if it has no parent {@link ComponentData}, false otherwise.
   */
  get isRoot() {
    return !this.parent
  }

  private collectAllNodesAsArray(acc: ComponentData[]) {
    acc.push(this)
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      child.collectAllNodesAsArray(acc)
    }
    return acc
  }

  private collectAllFields(acc: Map<string, Field>) {
    if (this.field) acc.set(this.key, this.field)
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      child.collectAllFields(acc)
    }
    return acc
  }

  private addChild(newChild: ComponentData) {
    if (this.children.indexOf(newChild) < 0) {
      this.children.push(newChild)
    }
    this.store.children ??= []

    if (this.store.children.indexOf(newChild.store) < 0) {
      this.store.children.push(newChild.store)
    }
  }

  private removeChild(oldChild: ComponentData) {
    const index = this.children.indexOf(oldChild)
    if (index > -1) {
      this.children.splice(index, 1)
    }
    this.store.children ??= []
    const storeIndex = this.store.children.indexOf(oldChild.store)
    if (storeIndex > -1) {
      this.store.children.splice(storeIndex, 1)
    }
  }
}

const [useComponentData, ComponentDataProvider] = createNonNullableContext<ComponentData>('ComponentDataContext')

export {useComponentData, ComponentDataProvider}
