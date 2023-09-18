import type {IFormStorage} from '@react-form-builder/designer'
import {nameObservable} from '@react-form-builder/core'
import {makeAutoObservable} from 'mobx'
import {kvCreateStore, kvDel, kvGet, kvKeys, kvSet} from './KeyValueStorage'

const className = 'IndexedDbFormStorage'

/**
 * Stores forms in IndexedDB.
 */
export class IndexedDbFormStorage implements IFormStorage {
  #customStore = kvCreateStore('form-builder-store', 'form-store')

  /**
   * Constructor.
   */
  constructor() {
    makeAutoObservable(this, undefined, {name: nameObservable(className)})
  }

  /**
   * Init IndexedDB with specified initial data.
   * @param initialData the initial data.
   */
  async init(initialData: Record<string, string>) {
    for (const formName in initialData) {
      const formNames = await this.getFormNames()
      if (formNames.indexOf(formName) === -1) {
        await this.saveForm(formName, initialData[formName])
      }
    }
  }

  /**
   * @inheritDoc
   */
  async getForm(formName: string) {
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
    await kvSet(formName, formValue, this.#customStore)
  }
}
