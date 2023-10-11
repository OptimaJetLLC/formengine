import {namedObserver, useDestroy} from '@react-form-builder/core'
import {useRef, useState} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {CodeEditor} from '../components/CodeEditor'

export const JsonView = namedObserver('JsonView', () => {
  const builderStore = useBuilderStore()
  const [initialValue] = useState(builderStore.formAsString)
  const sourceRef = useRef(initialValue)
  const onSetSource = (value: string) => sourceRef.current = value
  useDestroy(() => builderStore.parseForm(sourceRef.current))

  return <CodeEditor language="json" initialValue={initialValue} onChange={onSetSource}/>
})
