import {FullScreenExpandable, useBuilderStore} from 'fb-core'
import {observer} from 'mobx-react'
import {useEffect, useRef, useState} from 'react'
import {JsEditor} from '../../calculation/components/JsEditor'

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

  return <FullScreenExpandable>
    <JsEditor value={source} onChange={onSetSource}/>
  </FullScreenExpandable>
}

export const JsonView = observer(_JsonView)
