import {createStore, del, get, keys, set, UseStore} from 'idb-keyval'

const indexedDbExists = !!window.indexedDB

export const kvCreateStore = (dbName: string, storeName: string): UseStore => {
  if (!indexedDbExists) return {} as UseStore
  return createStore(dbName, storeName)
}

export const kvDel = (key: IDBValidKey, customStore?: UseStore): Promise<void> => {
  if (!indexedDbExists) return Promise.reject()
  return del(key, customStore)
}

export const kvGet = <T = any>(key: IDBValidKey, customStore?: UseStore): Promise<T | undefined> => {
  if (!indexedDbExists) return Promise.reject()
  return get<T>(key, customStore)
}

export const kvKeys = <KeyType extends IDBValidKey>(customStore?: UseStore): Promise<KeyType[]> => {
  if (!indexedDbExists) return Promise.reject()
  return keys(customStore)
}

export const kvSet = (key: IDBValidKey, value: any, customStore?: UseStore): Promise<void> => {
  if (!indexedDbExists) return Promise.reject()
  return set(key, value, customStore)
}
