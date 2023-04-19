import {namedObserver} from 'fb-core'
import {useEffect, useRef, useState} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {CodeEditor} from '../components/CodeEditor'

export const JsonView = namedObserver('JsonView', () => {
  const builderStore = useBuilderStore()
  const [source, setSource] = useState(builderStore.stringifyForm())
  // we need sourceRef to track the actual value of the source
  const sourceRef = useRef(source)
  const onSetSource = (value: string) => {
    setSource(value)
    sourceRef.current = value
  }
  useEffect(() => () => builderStore.parseForm(sourceRef.current), [])

  return <CodeEditor language='json' value={source} onChange={onSetSource}/>
})
