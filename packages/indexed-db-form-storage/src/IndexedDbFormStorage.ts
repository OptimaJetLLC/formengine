import {nameObservable} from '@react-form-builder/core'
import type {IFormStorage} from '@react-form-builder/designer'
import type {UseStore} from 'idb-keyval'
import {makeAutoObservable} from 'mobx'
import {kvClear, kvCreateStore, kvDel, kvEnsureObjectStore, kvGet, kvKeys, kvSet} from './KeyValueStorage'

const className = 'IndexedDbFormStorage'

/**
 * Stores forms in IndexedDB.
 */
export class IndexedDbFormStorage implements IFormStorage {
  #customStore: UseStore
  #dbName: string
  #storeName: string

  /**
   * Constructor.
   * @param dbName the database name.
   * @param storeName the store name.
   */
  constructor(dbName: string, storeName: string) {
    this.#dbName = dbName
    this.#storeName = storeName
    this.#customStore = kvCreateStore(dbName, storeName)
    makeAutoObservable(this, undefined, {name: nameObservable(className)})
  }

  /**
   * Init IndexedDB with specified initial data.
   * @param initialData the initial data.
   */
  async init(initialData: Record<string, string>) {
    await kvEnsureObjectStore(this.#dbName, this.#storeName)

    const formNames = await this.getFormNames()
    for (const formName in initialData) {
      if (formNames.indexOf(formName) === -1) {
        await this.saveForm(formName, initialData[formName])
      }
    }
  }

  /**
   * @inheritDoc
   */
  async getForm(formName?: string) {
    if (!formName) throw new Error('The formName is not defined')
    const formValue = await kvGet(formName, this.#customStore)
    if (!formValue) throw new Error(`Cannot find form '${formName}'`)
    return formValue
  }

  /**
   * @inheritDoc
   */
  getFormNames(): Promise<string[]> {
    return kvKeys(this.#customStore)
  }

  /**
   * @inheritDoc
   */
  removeForm(formName: string): Promise<any> {
    return kvDel(formName, this.#customStore)
  }

  /**
   * @inheritDoc
   */
  async saveForm(formName: string, formValue: string): Promise<any> {
    return await kvSet(formName, formValue, this.#customStore)
  }

  /**
   * Clears all values in the storage.
   * @returns the Promise with the result of the work.
   */
  async clear() {
    return await kvClear(this.#customStore)
  }
}
