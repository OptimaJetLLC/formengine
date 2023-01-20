import {observer} from 'mobx-react'
import {useEffect, useRef, useState} from 'react'
import {useBuilderStore} from '../../../utils/contexts/BuilderStoreContext'
import {CodeEditor} from '../../calculation/components/CodeEditor'

const _JsonView = () => {
  const builderStore = useBuilderStore()
  const [source, setSource] = useState(builderStore.stringifyForm())
  useEffect(() => setSource(builderStore.stringifyForm()), [builderStore.viewer.screen])
  // we need sourceRef to track the actual value of the source
  const sourceRef = useRef(source)
  const onSetSource = (value: string) => {
    setSource(value)
    sourceRef.current = value
  }
  useEffect(() => () => builderStore.parseForm(sourceRef.current), [])

  return <CodeEditor source={source} setSource={onSetSource}/>
}

export const JsonView = observer(_JsonView)
