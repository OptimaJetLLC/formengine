import type {OnMount} from '@monaco-editor/react'
import {namedObserver} from '@react-form-builder/core'
import * as monaco from 'monaco-editor'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {CodeEditor} from '../components/CodeEditor/CodeEditor'

const RawJsonView = () => {
  const builderStore = useBuilderStore()
  const [initialValue] = useState(builderStore.formAsString)
  const sourceRef = useRef(initialValue)
  const onSetSource = useCallback((value: string) => (sourceRef.current = value), [])

  const schema = useMemo(() => {
    const result = builderStore.generateJsonFormSchema()
    if (result) return JSON.parse(result)
  }, [builderStore])

  const handleMount: OnMount = useCallback(
    (editor, monacoApi) => {
      if (!schema) return

      monaco.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
          {
            uri: 'urn:schema.json',
            fileMatch: ['form.json'],
            schema: schema,
          },
        ],
      })

      const newModel = monacoApi.editor.createModel(initialValue, 'json', monacoApi.Uri.parse('file:///form.json'))
      editor.setModel(newModel)
    },
    [initialValue, schema]
  )

  useEffect(() => {
    return () => builderStore.parseForm(sourceRef.current)
  }, [builderStore])

  return <CodeEditor language="json" initialValue={initialValue} onChange={onSetSource} onMount={handleMount} />
}

export const JsonView = namedObserver('JsonView', RawJsonView)
