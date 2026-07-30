import {getFormFromJson, RSuiteForm} from '@react-form-builder/apps-common'
import {isUndefined} from '@react-form-builder/core'
import type {
  BuilderView,
  GenerateJsonFormSchemaOptions,
  IFormBuilder,
  IPresetComponentOptions,
  PresetComponent,
} from '@react-form-builder/designer'
import {FormBuilder} from '@react-form-builder/designer'
import type {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {IndexedDbPresetStorage} from '@react-form-builder/indexed-db-form-storage'
import {createSchema} from '@react-form-builder/json-schema-generator'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import config from '../utils/config.json'
import {licenseKey} from '../utils/licenseKey'
import type {FormBuilderAppProps} from '../utils/types'
import {useIndexedDbStorage} from '../utils/useIndexedDbStorage'
import {useUrlFormBootstrap} from '../utils/useUrlFormBootstrap'
import {useSetBuilderRef} from './BuilderRefContext'

import {forms, sampleFormName} from './rsuiteDesignerComponents'

type RSuiteBuilderSharedProps = FormBuilderAppProps & {view: BuilderView}

/**
 * Shared RSuite FormBuilder shell; the `view` is built either with runtime CSS loaders or with static CSS imports.
 * @param props the combined props.
 * @param props.view the RSuite `BuilderView` (CSS loaders or static CSS).
 * @param props.appName the app name prefix for storage keys.
 * @returns the FormBuilder element, or null while IndexedDB is initializing.
 */
export function RSuiteBuilderShared(props: RSuiteBuilderSharedProps) {
  const {view, appName = 'form-builder', ...rest} = props
  const dbName = `${appName}-db`
  const storeName = `${appName}-store`
  const presetDbName = `${appName}-presets-db`
  const presetStoreName = `${appName}-presets`

  const [presetOptions, setPresetOptions] = useState<IPresetComponentOptions | undefined>(undefined)
  const builderRef = useRef<IFormBuilder>(null)
  const setBuilderRef = useSetBuilderRef()

  useEffect(() => {
    setBuilderRef?.(builderRef)
  }, [setBuilderRef])

  const {formStorage, initialized, indexedDbExists} = useIndexedDbStorage(dbName, storeName, forms)
  const getBundledForm = useCallback((name: string) => getFormFromJson(name), [])
  const urlBootstrap = useUrlFormBootstrap({
    formStorage,
    storageReady: initialized,
    getBundledForm,
  })

  const presetStorage = useMemo(() => {
    return indexedDbExists ? new IndexedDbPresetStorage(presetDbName, presetStoreName) : undefined
  }, [indexedDbExists, presetDbName, presetStoreName])

  const getFormFn = useCallback(
    (formName?: string) => {
      const name = !formName || isUndefined(formName) ? (urlBootstrap.formName ?? sampleFormName) : formName
      if (formStorage) {
        return formStorage.getForm(name).catch(() => {
          if (urlBootstrap.bootstrap?.form?.mode === 'named' || !urlBootstrap.bootstrap?.form) {
            return getFormFromJson(name)
          }
          throw new Error(`Unable to load form '${name}'`)
        })
      }
      if (!indexedDbExists) {
        return getFormFromJson(name)
      }
      return Promise.reject(new Error(`Unable to load form '${name}'`))
    },
    [formStorage, indexedDbExists, urlBootstrap.bootstrap?.form, urlBootstrap.formName]
  )

  const initDatabase = useCallback(async (dbFormStorage: IndexedDbFormStorage) => {
    let cleanDatabase = true
    const accessDateKey = 'accessDate'
    const formNameKey = 'formName'

    try {
      const accessDate = localStorage.getItem(accessDateKey)
      if (accessDate && config.releaseDate === Number(accessDate)) cleanDatabase = false
    } catch (e) {
      console.error(e)
    }

    if (cleanDatabase) {
      localStorage.removeItem(formNameKey)
      localStorage.setItem(accessDateKey, `${config.releaseDate}`)
    }
    return await dbFormStorage.init({RSuiteForm})
  }, [])

  const getPresetOptions = useCallback((): IPresetComponentOptions | undefined => {
    if (!indexedDbExists) return undefined

    return {
      onCreate: (preset: PresetComponent) => {
        presetStorage?.savePreset(preset).catch(console.error)
      },
      onRemove: (name: string) => {
        presetStorage?.removePreset(name).catch(console.error)
      },
    }
  }, [indexedDbExists, presetStorage])

  const generateJsonFormSchema = useCallback((options: GenerateJsonFormSchemaOptions) => {
    const {components, descriptions} = options
    const schema = createSchema(components, descriptions)
    return JSON.stringify(schema, undefined, 2)
  }, [])

  useEffect(() => {
    async function initDb() {
      const presetComponents = await presetStorage?.loadPresets()
      const options = getPresetOptions()

      if (!isUndefined(presetComponents)) {
        setPresetOptions({
          ...options,
          components: presetComponents,
        })
      } else {
        setPresetOptions(options)
      }

      if (!formStorage) return
      await initDatabase(formStorage)
    }

    initDb().catch(e => console.error(e))
  }, [formStorage, presetStorage, getPresetOptions, initDatabase])

  if (!initialized || !urlBootstrap.ready) return null

  return (
    <FormBuilder
      licenseKey={licenseKey}
      getForm={getFormFn}
      formName={urlBootstrap.formName ?? sampleFormName}
      persistFormName={urlBootstrap.persistFormName}
      view={view}
      formStorage={formStorage}
      presetComponentOptions={presetOptions}
      generateJsonFormSchema={generateJsonFormSchema}
      builderRef={builderRef}
      localStoragePrefix={`${appName}-rsuite`}
      {...rest}
    />
  )
}
