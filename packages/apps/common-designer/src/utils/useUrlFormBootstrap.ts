import type {IFormStorage} from '@react-form-builder/designer'
import {useEffect, useMemo, useState} from 'react'
import type {DemoUrlBootstrap, DemoUrlFormBootstrap} from './urlFormBootstrap'
import {loadBootstrapFormJson, parseDemoUrlBootstrap} from './urlFormBootstrap'

type UrlFormBootstrapState = {
  /** True until URL form (if any) is prepared in storage. */
  ready: boolean
  bootstrap: DemoUrlBootstrap | null
  /** Form name to pass to FormBuilder when URL drives the form. */
  formName?: string
  persistFormName?: false
  error?: string
}

type UseUrlFormBootstrapArgs = {
  formStorage?: IFormStorage
  storageReady: boolean
  /**
   * Fallback loader for `?form=<name>` when storage misses the form.
   * @param name form name
   */
  getBundledForm?: (name: string) => string | Promise<string>
}

/**
 * Reads demo URL params once and prepares the requested form in storage.
 * @param args storage and bundled-form helpers
 * @returns bootstrap readiness state for the form builder
 */
export function useUrlFormBootstrap(args: UseUrlFormBootstrapArgs): UrlFormBootstrapState {
  const {formStorage, storageReady, getBundledForm} = args
  const bootstrap = useMemo(() => {
    if (typeof window === 'undefined') {
      return null
    }
    return parseDemoUrlBootstrap(window.location.search)
  }, [])

  const [ready, setReady] = useState(() => !bootstrap?.form)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const formBootstrap = bootstrap?.form
    if (!formBootstrap || !storageReady) {
      return
    }

    let cancelled = false

    async function prepare(form: DemoUrlFormBootstrap) {
      try {
        if (form.mode === 'named' && form.namedForm) {
          if (formStorage) {
            try {
              await formStorage.getForm(form.namedForm)
            } catch {
              if (getBundledForm) {
                const json = await getBundledForm(form.namedForm)
                await formStorage.saveForm(form.namedForm, json)
              }
            }
          }
        } else {
          const json = loadBootstrapFormJson(form)
          if (formStorage) {
            await formStorage.saveForm(form.formName, json)
          }
        }
        if (!cancelled) {
          setReady(true)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e))
          setReady(true)
        }
      }
    }

    prepare(formBootstrap)

    return () => {
      cancelled = true
    }
  }, [bootstrap, formStorage, getBundledForm, storageReady])

  if (!bootstrap?.form) {
    return {ready: true, bootstrap}
  }

  return {
    ready,
    bootstrap,
    formName: bootstrap.form.formName,
    persistFormName: false,
    error,
  }
}
