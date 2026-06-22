import type {UseStore} from 'idb-keyval'
import {clear, createStore, del, entries, get, keys, set} from 'idb-keyval'

const indexedDbExists = !!globalThis.indexedDB
const indexedDbUnavailableError = new Error('IndexedDB is not available in this environment.')

const toError = (e: unknown, fallbackMessage: string): Error => {
  if (e instanceof Error) return e
  if (e instanceof DOMException) return new Error(e.message)
  return new Error(fallbackMessage)
}

/**
 * Opens IndexedDB database and resolves with an IDBDatabase instance.
 * If `version` is provided, attempts to open with the specified version (can trigger onupgradeneeded).
 * @param dbName the database name.
 * @param version optional database version.
 * @returns the opened IDBDatabase instance.
 */
const kvOpenDb = (dbName: string, version?: number): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const req = version ? indexedDB.open(dbName, version) : indexedDB.open(dbName)
    req.onerror = () => reject(toError(req.error, `Failed to open IndexedDB "${dbName}"`))
    req.onsuccess = () => resolve(req.result)
  })
}

/**
 * Ensures the given object store exists in the database.
 * @param dbName the database name.
 * @param storeName the object store name to ensure.
 */
export const kvEnsureObjectStore = async (dbName: string, storeName: string): Promise<void> => {
  if (!indexedDbExists) throw indexedDbUnavailableError

  // Inspect existing DB schema/version
  const db = await kvOpenDb(dbName)
  const hasStore = db.objectStoreNames.contains(storeName)
  const currentVersion = db.version
  db.close()

  if (hasStore) return

  // Upgrade version and create the missing store
  await new Promise<void>((resolve, reject) => {
    const req = indexedDB.open(dbName, currentVersion + 1)

    req.onerror = () => reject(toError(req.error, `Failed to upgrade IndexedDB "${dbName}"`))

    req.onupgradeneeded = () => {
      const upDb = req.result
      if (!upDb.objectStoreNames.contains(storeName)) {
        upDb.createObjectStore(storeName)
      }
    }

    req.onblocked = () => {
      // Upgrade can be blocked by another open connection
      // We still keep waiting for onsuccess/onerror; this warning helps diagnose issues.
      console.warn(`IndexedDB upgrade blocked for "${dbName}". Close other tabs/instances of the app.`)
    }

    req.onsuccess = () => {
      req.result.close()
      resolve()
    }
  })
}

/**
 * Creates key-value storage.
 * @param dbName the database name.
 * @param storeName the store name.
 * @returns the object for storage management.
 */
export const kvCreateStore = (dbName: string, storeName: string): UseStore => {
  if (!indexedDbExists) return {} as UseStore
  return createStore(dbName, storeName)
}

/**
 * Creates key-value storage after ensuring that the underlying object store exists.
 * Use this instead of kvCreateStore() when the DB can be created/opened elsewhere
 * (or in race conditions) and might end up without the required object store.
 * @param dbName the database name.
 * @param storeName the store name.
 * @returns the object for storage management.
 */
export const kvCreateStoreEnsured = async (dbName: string, storeName: string): Promise<UseStore> => {
  if (!indexedDbExists) return {} as UseStore
  await kvEnsureObjectStore(dbName, storeName)
  return createStore(dbName, storeName)
}

/**
 * Removes the value from the store by the specified key.
 * @param key the key.
 * @param customStore the store.
 * @returns the Promise, which can be rejected if operations failed to complete.
 */
export const kvDel = (key: IDBValidKey, customStore?: UseStore): Promise<void> => {
  if (!indexedDbExists) return Promise.reject(indexedDbUnavailableError)
  return del(key, customStore)
}

/**
 * Returns a value from the store for the specified key.
 * @param key the key.
 * @param customStore the store.
 * @returns the Promise with a value or undefined if no value is found.
 */
export const kvGet = <T = any>(key: IDBValidKey, customStore?: UseStore): Promise<T | undefined> => {
  if (!indexedDbExists) return Promise.reject(indexedDbUnavailableError)
  return get<T>(key, customStore)
}

/**
 * Returns an array with all available keys from the store.
 * @param customStore the store.
 * @returns the Promise with the array with all available keys.
 */
export const kvKeys = <KeyType extends IDBValidKey>(customStore?: UseStore): Promise<KeyType[]> => {
  if (!indexedDbExists) return Promise.reject(indexedDbUnavailableError)
  return keys(customStore)
}

/**
 * Sets the value in the store by the specified key.
 * @param key the key.
 * @param value the value.
 * @param customStore the store.
 * @returns the Promise, which can be rejected if operations failed to complete.
 */
export const kvSet = (key: IDBValidKey, value: any, customStore?: UseStore): Promise<void> => {
  if (!indexedDbExists) return Promise.reject(indexedDbUnavailableError)
  return set(key, value, customStore)
}

/**
 * Clears all values in the store.
 * @param customStore the store.
 * @returns the Promise, which can be rejected if operations failed to complete.
 */
export const kvClear = (customStore?: UseStore): Promise<void> => {
  if (!indexedDbExists) return Promise.reject(indexedDbUnavailableError)
  return clear(customStore)
}

/**
 * Returns all entries from the store.
 * @param customStore the store.
 * @returns the Promise with the array of all entries in the store.
 */
export const kvEntries = (customStore?: UseStore) => {
  if (!indexedDbExists) return Promise.reject(indexedDbUnavailableError)
  return entries(customStore)
}
