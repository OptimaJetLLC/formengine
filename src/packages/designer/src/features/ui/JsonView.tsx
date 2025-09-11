import {namedObserver} from '@react-form-builder/core'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {CodeEditor} from '../components/CodeEditor/CodeEditor'

const RawJsonView = () => {
  const builderStore = useBuilderStore()
  const [initialValue] = useState(builderStore.formAsString)
  const sourceRef = useRef(initialValue)
  const onSetSource = useCallback((value: string) => sourceRef.current = value, [])

  useEffect(() => {
    return () => builderStore.parseForm(sourceRef.current)
  }, [builderStore])

  return <CodeEditor language="json" initialValue={initialValue} onChange={onSetSource}/>
}

export const JsonView = namedObserver('JsonView', RawJsonView)
