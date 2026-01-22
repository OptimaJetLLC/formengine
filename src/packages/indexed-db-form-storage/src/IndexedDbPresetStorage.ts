import type {PresetComponent} from '@react-form-builder/designer'
import type {UseStore} from 'idb-keyval'
import {kvCreateStoreEnsured, kvDel, kvEntries, kvSet} from './KeyValueStorage'

/**
 * Stores preset components in IndexedDB.
 */
export class IndexedDbPresetStorage {
  readonly #dbName: string
  readonly #storeName: string
  #customStore?: UseStore
  #storePromise?: Promise<UseStore>

  /**
   * Constructor.
   * @param dbName the database name.
   * @param storeName the store name.
   */
  constructor(dbName: string, storeName: string) {
    this.#dbName = dbName
    this.#storeName = storeName
  }

  private async getStore(): Promise<UseStore> {
    if (this.#customStore) return this.#customStore

    if (!this.#storePromise) {
      this.#storePromise = kvCreateStoreEnsured(this.#dbName, this.#storeName).then(store => {
        this.#customStore = store
        return store
      })
    }

    return this.#storePromise
  }

  /**
   * Loads the preset components from the local storage.
   * @returns the preset components.
   */
  loadPresets = async () => {
    const store = await this.getStore()
    const items = await kvEntries(store)
    const result: PresetComponent[] = []
    items.forEach(item => {
      try {
        result.push(JSON.parse(item[1]))
      } catch (e) {
        console.warn('Error parsing preset component', e)
      }
    })
    return result
  }

  /**
   * Saves the preset component to the local storage.
   * @param preset the preset component to save.
   */
  savePreset = async (preset: PresetComponent) => {
    const store = await this.getStore()
    await kvSet(preset.name, JSON.stringify(preset), store)
  }

  /**
   * Removes the preset component from the local storage.
   * @param name the name of the preset component.
   */
  removePreset = async (name: string) => {
    const store = await this.getStore()
    await kvDel(name, store)
  }
}
