import {namedObserver} from '@react-form-builder/core'
import {useEffect, useRef, useState} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {CodeEditor} from '../components/CodeEditor'

const _JsonView = () => {
  const builderStore = useBuilderStore()
  const [initialValue] = useState(builderStore.formAsString)
  const sourceRef = useRef(initialValue)
  const onSetSource = (value: string) => sourceRef.current = value

  useEffect(() => {
    return () => builderStore.parseForm(sourceRef.current)
  }, [builderStore])

  return <CodeEditor language="json" initialValue={initialValue} onChange={onSetSource}/>
}

export const JsonView = namedObserver('JsonView', _JsonView)
