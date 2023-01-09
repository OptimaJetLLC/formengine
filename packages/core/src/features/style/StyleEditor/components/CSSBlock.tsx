import styled from '@emotion/styled'
import autosize from 'autosize'
import {useEffect, useRef, useState} from 'react'
import {Input} from 'rsuite'
import {ComponentStore} from '../../../../stores/ComponentStore'

const CSSBlock = ({componentStore}: { componentStore: ComponentStore }) => {
  //TODO mobx.createViewModel (непонятно как заставить работать с массивами) https://github.com/mobxjs/mobx-utils/issues/209
  const [value, setValue] = useState(componentStore.style.cssBlock)
  const onBlur = () => {
    if (value) componentStore.style.cssBlock = value
  }
  const ref = useRef<Element | null>(null)
  useEffect(() => {
    if (ref.current) autosize(ref.current)
  }, [ref.current])

  return <TextArea as={'textarea'} value={value} rows={3} ref={ref}
                   onChange={(val: any) => setValue(val)} onBlur={onBlur}/>
}

const TextArea = styled(Input)`
  //max-height: 300px;
  overflow-y: auto;
  resize: vertical !important;
`

export {CSSBlock}
