import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {useEffect, useState} from 'react'

interface IndexedDbStorageState {
  formStorage?: IndexedDbFormStorage
  initialized: boolean
  error?: Error
  indexedDbExists: boolean
}

/**
 * Hook for managing IndexedDB form storage
 * @param dbName Name of the IndexedDB database.
 * @param storeName Name of the IndexedDB object store.
 * @param forms Initial forms to store in IndexedDB.
 * @returns Object containing storage state and utilities
 */
export function useIndexedDbStorage(dbName: string, storeName: string, forms?: Record<string, any>) {
  const indexedDbExists = !!globalThis.indexedDB
  const [state, setState] = useState<IndexedDbStorageState>({
    formStorage: undefined,
    initialized: !indexedDbExists,
    error: undefined,
    indexedDbExists,
  })

  useEffect(() => {
    if (!indexedDbExists) return

    let cancelled: boolean = false

    const initStorage = async () => {
      try {
        const storage = new IndexedDbFormStorage(dbName, storeName)
        await storage.init(forms || {})

        if (!cancelled) {
          setState({formStorage: storage, initialized: true, error: undefined, indexedDbExists})
        }
      } catch (e) {
        console.error('Failed to initialize IndexedDB storage:', e)
        if (!cancelled) {
          setState({formStorage: undefined, initialized: true, error: e as Error, indexedDbExists})
        }
      }
    }

    initStorage().catch(console.error)

    return () => {
      cancelled = true
    }
  }, [dbName, storeName, forms, indexedDbExists])

  return state
}
