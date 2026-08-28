---
sidebar_position: 11
title: Form storage
slug: /formengine-designer/features/form-storage
description: In this guide, we will look at how to connect external storage for forms
---

:::info For form authors

When the **Forms** tab is visible, your app uses storage-see [Work with multiple forms](designer-guide:manage-forms/work-with-multiple-forms/).
:::

## Form storage

By default, the designer does not use external form stores. In this mode you can create forms, export and import forms to JSON files.
If this is not enough for you and you would like to save forms in the form store, you can do it by connecting an external form store.

The first thing you need to do is to implement the [IFormStorage](/api-reference/@react-form-builder/designer/interfaces/IFormStorage)
interface. Then you need to pass the `IFormStorage` implementation to
the [formStorage](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#formstorage) property of the `FormBuilder`
component.

```jsx title='Sample code'
import {buildForm} from '@react-form-builder/core'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {useEffect, useState} from 'react'

const formStorage = new IndexedDbFormStorage('example-db', 'example-store')

function MyDesignerApp() {
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    formStorage.init({
      example: buildForm().json()
    }).then(() => {
      setReady(true)
    }).catch(console.error)
  }, [])

  if (!ready) return null

  return <FormBuilder view={view} formStorage={formStorage} formName="example"/>
}
```

## Example of IFormStorage working with IndexedDB

The example below works with the npm package [idb-keyval](https://www.npmjs.com/package/idb-keyval), which you can install with the command:

```bash
npm install idb-keyval
```

```typescript title='IndexedDbFormStorage.ts'
import type {IFormStorage} from '@react-form-builder/designer'
import type {UseStore} from 'idb-keyval'
import {kvClear, kvCreateStore, kvDel, kvGet, kvKeys, kvSet} from './KeyValueStorage'

/**
 * Stores forms in IndexedDB.
 */
export class IndexedDbFormStorage implements IFormStorage {
  #customStore: UseStore

  /**
   * Constructor.
   * @param dbName the database name.
   * @param storeName the store name.
   */
  constructor(dbName: string, storeName: string) {
    this.#customStore = kvCreateStore(dbName, storeName)
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
```

```typescript title='KeyValueStorage.ts'
import {clear, createStore, del, get, keys, set, UseStore} from 'idb-keyval'

const indexedDbExists = !!window.indexedDB

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
 * Removes the value from the store by the specified key.
 * @param key the key.
 * @param customStore the store.
 * @returns the Promise, which can be rejected if operations failed to complete.
 */
export const kvDel = (key: IDBValidKey, customStore?: UseStore): Promise<void> => {
  if (!indexedDbExists) return Promise.reject()
  return del(key, customStore)
}

/**
 * Returns a value from the store for the specified key.
 * @param key the key.
 * @param customStore the store.
 * @returns the Promise with a value or undefined if no value is found.
 */
export const kvGet = <T = any>(key: IDBValidKey, customStore?: UseStore): Promise<T | undefined> => {
  if (!indexedDbExists) return Promise.reject()
  return get<T>(key, customStore)
}

/**
 * Returns an array with all available keys from the store.
 * @param customStore the store.
 * @returns the Promise with the array with all available keys.
 */
export const kvKeys = <KeyType extends IDBValidKey>(customStore?: UseStore): Promise<KeyType[]> => {
  if (!indexedDbExists) return Promise.reject()
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
  if (!indexedDbExists) return Promise.reject()
  return set(key, value, customStore)
}

/**
 * Clears all values in the store.
 * @param customStore the store.
 * @returns the Promise, which can be rejected if operations failed to complete.
 */
export const kvClear = (customStore?: UseStore): Promise<void> => {
  if (!indexedDbExists) return Promise.reject()
  return clear(customStore)
}
```
