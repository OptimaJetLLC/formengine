import type {PresetComponent} from '@react-form-builder/designer'
import type {UseStore} from 'idb-keyval'
import {kvCreateStore, kvDel, kvEntries, kvSet} from './KeyValueStorage'

/**
 * Stores preset components in IndexedDB.
 */
export class IndexedDbPresetStorage {
  readonly #customStore: UseStore

  /**
   * Constructor.
   * @param dbName the database name.
   * @param storeName the store name.
   */
  constructor(dbName: string, storeName: string) {
    this.#customStore = kvCreateStore(dbName, storeName)
  }

  /**
   * Loads the preset components from the local storage.
   * @returns the preset components.
   */
  loadPresets = async () => {
    const items = await kvEntries(this.#customStore)
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
    await kvSet(preset.name, JSON.stringify(preset), this.#customStore)
  }

  /**
   * Removes the preset component from the local storage.
   * @param name the name of the preset component.
   */
  removePreset = async (name: string) => {
    await kvDel(name, this.#customStore)
  }
}
