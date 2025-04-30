import {camelCase, isArray, isEmpty, merge} from 'lodash-es'
import type {IReactionDisposer} from 'mobx'
import {makeAutoObservable, reaction} from 'mobx'
import type {Model} from '../../features/define'
import type {FormValidator, FormValidators} from '../../features/form-viewer/FormValidators'
import {getFluentData} from '../../features/localization/getFluentData'
import type {Field} from '../../features/validation'
import type {ValidationMessages} from '../../features/validation/types/ValidationResult'
import type {ComponentStore} from '../../stores/ComponentStore'
import {defaultComponentState} from '../../stores/IComponentState'
import {createNonNullableContext} from '../createNonNullableContext'
import type {IFormData} from '../IFormData'
import {nameObservable} from '../observableNaming'
import {SyncEvent} from '../SyncEvent'
import {treeForEach} from '../treeUtils'

let counter = 0

function generateId(prefix: string) {
  return `${prefix}_${++counter}`
}

/**
 * Represents the event argument for the event when the component key changes.
 */
export class ComponentKeyChangedEventArgs {
  /**
   * Constructs a new instance of the ComponentKeyChangedEventArgs class.
   * @param oldKey the old key.
   * @param newKey the new key.
   */
  constructor(readonly oldKey: string, readonly newKey: string) {
  }
}

/**
 * Represents a class that holds events related to component data.
 */
export class ComponentDataEvents {
  /**
   * An event that occurs after a component key change.
   */
  readonly onAfterKeyChanged: SyncEvent<ComponentData, ComponentKeyChangedEventArgs> = new SyncEvent()
  /**
   * An event that occurs before a component is removed from the component tree.
   */
  readonly onBeforeDelete: SyncEvent<ComponentData, undefined> = new SyncEvent()

  /**
   * Unsubscribe from all events.
   */
  dispose() {
    this.onAfterKeyChanged.dispose()
    this.onBeforeDelete.dispose()
  }
}

/**
 * A provider for a set of components.
 */
export interface IComponentDataProvider {
  /**
   * @returns the component set.
   */
  get componentData(): ComponentData[]
}

/**
 * Provides the root component for the data in the component tree.
 */
export interface IDataRootProvider {
  /**
   * @returns the root component for the data in the component tree.
   */
  get dataRoot(): ComponentData
}

/**
 * Replaces empty form fields with an empty string. **Internal use only.**
 * @param form the form.
 * @returns all form data where empty fields are filled with empty strings.
 */
export const initFormFields = (form: ComponentData) => {
  const result: Record<string, unknown> = {}
  form.fields.forEach((field, key) => {
    result[key] = form.data[key] ?? ''
  })
  return result
}

/**
 * This tree of elements contains the data required to display the component. It is synchronized with the ComponentStore tree.
 */
export class ComponentData implements IFormData {
  #disposers: IReactionDisposer[]
  #events?: ComponentDataEvents
  #formValidators?: FormValidators
  private _state: Record<string, unknown> = {}
  /**
   * The unique identifier.
   */
  readonly id: string
  /**
   * The component settings.
   */
  readonly store: ComponentStore
  /**
   * The component metadata.
   */
  readonly model: Model
  /**
   * The field with the form data.
   */
  field?: Field
  /**
   * The parent node in the component data tree.
   */
  parent?: ComponentData
  /**
   * The child nodes in the component data tree.
   */
  children: ComponentData[] = []

  /**
   * User defined properties of the React component.
   */
  userDefinedProps?: Record<string, any>

  /**
   * If true, then validation is in progress.
   */
  validating = false

  /**
   * Specifies the root component for the data in the component tree. **Internal use only.**
   */
  dataRootProvider?: IDataRootProvider

  /**
   * Specifies the index in the array if the component is in the component array.
   * This is not an index in a parent-child structure.
   */
  index?: number

  /**
   * The state of the component. **Internal use only.
   */
  componentState = defaultComponentState

  /**
   * Constructor.
   * @param componentStore the component settings.
   * @param model the component metadata for the form viewer.
   * @param childFactory the factory function that creates {@link ComponentData} instance.
   * @param formValidators the array of functions that validate the form data.
   */
  constructor(componentStore: ComponentStore, model: Model,
              childFactory: (componentStore: ComponentStore) => ComponentData, formValidators?: FormValidators) {
    this.store = componentStore
    this.model = model
    this.id = generateId(this.model.type)
    this.#formValidators = formValidators

    componentStore.children?.forEach(childComponentStore => {
      const child = childFactory(childComponentStore)
      child.setParent(this)
    })

    makeAutoObservable(this, undefined, {name: nameObservable('ComponentData', {key: componentStore.key})})

    const createKeyChangedReaction = () => {
      return reaction(() => this.key, (key, oldKey) => {
        this.invokeOnAfterKeyChanged(this, new ComponentKeyChangedEventArgs(oldKey, key))
      })
    }

    this.#disposers = [createKeyChangedReaction()]
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
    this.insert(inserted, 'after')
  }

  /**
   * Inserts the given node before this node.
   * @param inserted the node to insert.
   */
  insertBeforeMe(inserted: ComponentData) {
    this.insert(inserted, 'before')
  }

  /**
   * @inheritDoc
   */
  get state() {
    return this._state
  }

  /**
   * @returns the root component for the data in the component tree.
   */
  get dataRoot(): ComponentData {
    return this.dataRootProvider?.dataRoot ?? this.parent?.dataRoot ?? this
  }

  /**
   * @returns the key of this node (same as the key of the ComponentStore).
   */
  get key(): string {
    return this.store.key
  }

  /**
   * @returns the ComponentDataEvents object.
   */
  get events(): ComponentDataEvents {
    if (!this.#events) {
      this.#events = new ComponentDataEvents()
    }
    return this.#events
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
   * @returns the map of new keys to old keys.
   */
  unifyKeys(root: ComponentData) {
    const keysMap = new Map<string, string>()
    const keysList: string[] = []
    treeForEach(root, ({key}: ComponentData) => {
      keysList.push(key)
    })
    treeForEach(this as ComponentData, item => {
      let count = 1
      const baseKey = camelCase(item.store.type)
      const generateKey = () => `${baseKey}${count}`
      while (keysList.includes(generateKey())) count++
      const newKey = generateKey()
      keysMap.set(newKey, item.key)
      item.store.key = newKey
      keysList.push(newKey)
    })
    return keysMap
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
    const allNodes = this.collectAllNodesAsArray([])
    this.invokeOnBeforeDeleted(allNodes)
    this.disposeNodes(allNodes)
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
   * @returns the object to read and modify parent data (available for array elements).
   */
  get parentData() {
    const indexExists = typeof this.nearestIndex === 'number'
    if (!indexExists) return undefined
    return this.parent?.data ?? this.rootData
  }

  /**
   * @returns the object to read and modify root form data.
   */
  get rootData() {
    return this.root.data
  }

  /**
   * @returns all the form data that is of the FluentVariable type.
   * Additionally, the keys of the returned object are converted to the snake case.
   */
  get fluentData() {
    const initializedData = initFormFields(this)
    return getFluentData(initializedData)
  }

  /**
   * @inheritDoc
   */
  get errors() {
    const result: Record<string, unknown> = {}
    for (const [key, field] of this.fields) {
      if (field.error) result[key] = field.error
      const errors = field.errors
      if (errors) {
        if (!Array.isArray(errors)) {
          if (field.storeDataInParentForm) Object.keys(errors).forEach(i => result[i] = errors[i])
          if (!field.storeDataInParentForm && Object.keys(errors).length > 0) result[key] = errors
        } else {
          result[key] = errors
        }
      }
    }
    return result
  }

  /**
   * @inheritDoc
   */
  get hasErrors() {
    return Object.keys(this.errors).length > 0
  }

  /**
   * @inheritDoc
   */
  setAllErrors(message?: string) {
    this.fields.forEach(f => f.error = message)
  }

  /**
   * @inheritDoc
   */
  async validate() {
    await this.validateForm()
    return this.errors as ValidationMessages
  }

  /**
   * @inheritDoc
   */
  async getValidationResult() {
    let messages = undefined

    const getFieldMessages = async ([key, field]: [key: string, field: Field]) => {
      const result = await field.getValidationResult()
      if (isEmpty(result)) return

      messages ??= {}
      let source = messages
      if (!field.storeDataInParentForm) {
        const initialValue = isArray(result) ? [] : {}
        messages[key] ??= initialValue
        source = messages[key]
      }
      merge(source, result)
    }

    const entries = [...this.fields.entries()]
    await Promise.allSettled(entries.map(getFieldMessages))

    if (!this.#formValidators) return messages

    const getFormMessages = async (validator: FormValidator) => {
      const result = await validator(this.data)
      if (isEmpty(result)) return
      messages ??= {}
      merge(messages, result)
    }

    await Promise.allSettled(this.#formValidators.map(getFormMessages))

    return messages
  }

  /**
   * @inheritDoc
   */
  get isValidating() {
    return this.validating
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
    this.disposeNodes(allNodes)
  }

  /**
   * @returns true if it has no parent {@link ComponentData}, false otherwise.
   */
  get isRoot() {
    return !this.parent
  }

  /**
   * @returns the root of the component tree.
   */
  get root(): ComponentData {
    return !this.parent ? this : this.parent.root
  }

  /**
   * @returns the index in the array if the component is in the component array
   * (looks for the nearest index in the component hierarchy).
   */
  get nearestIndex(): number | undefined {
    if (typeof this.index !== 'undefined') return this.index
    return this.parent?.nearestIndex
  }

  private async validateForm() {
    this.validating = true
    try {
      await Promise.allSettled([...this.fields.values()].map(f => f.validate()))
      if (!this.#formValidators) return

      const fields = this.fields
      const customValidatorPromises = this.#formValidators.map(v => v(this.data))
      const results = await Promise.allSettled(customValidatorPromises)

      results.map(result => {
        if (result.status === 'rejected') {
          console.error(result.reason)
          return undefined
        }
        return result.value
      }).forEach(resultValue => {
        if (!resultValue) return
        fields.forEach((field, key) => {
          if (resultValue[key]) return field.setError(resultValue[key])
          if (field.storeDataInParentForm) return field.setError(resultValue)
        })
      })
    } finally {
      this.validating = false
    }
  }

  private insert(inserted: ComponentData, position: 'before' | 'after') {
    const indexAddition = position === 'before' ? 0 : 1
    if (!this.parent) {
      throw new Error(`Cannot insert without parent. Key = ${this.key}`)
    }
    inserted.parent?.removeChild(inserted)
    inserted.parent = this.parent
    const children = this.parent.children
    const index = children.indexOf(this)
    if (index < 0) {
      throw new Error(`Cannot insert not existing element into ComponentData. Key = ${this.key}`)
    }
    children.splice(index + indexAddition, 0, inserted)
    this.parent.store.children ??= []
    const storeChildren = this.parent.store.children
    const storeIndex = storeChildren.indexOf(this.store)
    if (storeIndex < 0) {
      throw new Error(`Cannot insert not existing element into ComponentStore. Key = ${this.key}`)
    }
    storeChildren.splice(storeIndex + indexAddition, 0, inserted.store)
    inserted.store.slot = this.store.slot
    inserted.store.slotCondition = this.store.slotCondition
  }

  /**
   * Disposes the nodes by calling the disposers, disposing the field,
   * and resetting the parent and children properties to undefined and an empty array, respectively.
   * @param nodes the array of ComponentData objects representing the nodes to dispose.
   */
  private disposeNodes(nodes: ComponentData[]) {
    nodes.forEach(componentData => {
      componentData.#events?.dispose()
      componentData.#disposers.forEach(disposer => disposer())
      componentData.field?.dispose()
      componentData.parent = undefined
      componentData.children = []
    })
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
    // we must skip all children in the repeater field
    if (this.field?.fieldType === 'repeater') return acc
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

  private invokeOnAfterKeyChanged(node: ComponentData, eventArgs: ComponentKeyChangedEventArgs) {
    if (this.#events?.onAfterKeyChanged.isSubscribed) {
      this.#events.onAfterKeyChanged.invoke(node, eventArgs)
    }
    this.parent?.invokeOnAfterKeyChanged(node, eventArgs)
  }

  private invokeOnBeforeDeleted(nodes: ComponentData[]) {
    if (this.#events?.onBeforeDelete.isSubscribed) {
      nodes.forEach(node => this.#events?.onBeforeDelete.invoke(node, undefined))
    }
    this.parent?.invokeOnBeforeDeleted(nodes)
  }
}

const [
  /**
   * @returns the instance of the ComponentData of the currently rendered component.
   */
  useComponentData,
  /**
   * Context provider for the useComponentData hook. **Internal use only.**
   */
  ComponentDataProvider
] = createNonNullableContext<ComponentData>('ComponentDataContext')

export {useComponentData, ComponentDataProvider}
