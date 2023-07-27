import {makeAutoObservable} from 'mobx'
import {Model} from '../../features/define'
import {FormViewerProps} from '../../features/form-viewer'
import {Field} from '../../features/validation'
import {createField} from '../../features/validation/utils/initForm'
import {ComponentStore} from '../../stores/ComponentStore'
import {Store} from '../../stores/Store'
import {createNonNullableContext} from '../createNonNullableContext'

/**
 * This tree of elements contains the data required to display the component. It is synchronized with the ComponentStore tree.
 */
export class ComponentData {
  readonly store: ComponentStore
  readonly model: Model
  readonly field?: Field
  parent?: ComponentData
  children: ComponentData[] = []

  /**
   * Constructor
   * @param viewerStore The store of the form viewer.
   * @param componentStore The component settings.
   * @param formViewerProps The props of the form viewer.
   */
  constructor(viewerStore: Store, componentStore: ComponentStore, formViewerProps: Readonly<FormViewerProps>) {
    this.store = componentStore
    this.model = viewerStore.getComponentModel(componentStore)
    this.field = createField(componentStore, viewerStore, formViewerProps)

    componentStore.children?.forEach(childComponentStore => {
      const child = new ComponentData(viewerStore, childComponentStore, formViewerProps)
      child.setParent(this)
    })

    makeAutoObservable(this)
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
   * @returns all the nodes in the tree as an array. Starts from the root of the tree.
   */
  get allNodesAsArray(): ComponentData[] {
    if (this.parent) {
      return this.parent.allNodesAsArray
    }

    return this.collectAllNodesAsArray([])
  }

  /**
   * @returns all the fields in the tree as a map. Starts from the root of the tree.
   */
  get allFields(): Map<string, Field> {
    if (this.parent) return this.parent.allFields
    return this.collectAllFields(new Map<string, Field>())
  }

  /**
   * Deletes this node from the tree.
   */
  delete() {
    this.parent?.removeChild(this)
    this.field?.dispose()
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
      this.store.children?.splice(storeIndex, 1)
    }
  }
}

const [useComponentData, ComponentDataProvider] = createNonNullableContext<ComponentData>('ComponentDataContext')

export {useComponentData, ComponentDataProvider}
