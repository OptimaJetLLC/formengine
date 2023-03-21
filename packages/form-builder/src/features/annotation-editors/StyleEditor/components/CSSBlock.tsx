import styled from '@emotion/styled'
import autosize from 'autosize'
import {Device, useComponentData} from 'fb-core'
import {observer} from 'mobx-react'
import {useEffect, useRef, useState} from 'react'
import {Input, SelectPicker} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {useTranslationPart} from '../../../localization/hooks'

const items: Device[] = ['any', 'desktop', 'mobile', 'tablet']

const CSSBlock = observer(() => {
  const {componentStore} = useComponentData()
  const {viewMode} = useBuilderStore()
  const [device, setDevice] = useState<Device>('any')
  const t = useTranslationPart('style')
  const translatedItems = items.map(value => ({value, label: t(value)}))

  useEffect(() => {
    setDevice(viewMode === 'desktop' ? 'any' : viewMode)
  }, [viewMode])

  const ref = useRef<Element | null>(null)
  useEffect(() => {
    if (ref.current) autosize(ref.current)
  }, [ref.current])

  const styleValue = componentStore.styles?.[device] ?? ''
  const handleChange = (value: string) => componentStore.styles![device] = value

  return (
    <div>
      <SHeader>
        {t('cssBlock')}
        <SPicker value={device} data={translatedItems} onChange={val => setDevice(val as Device)} appearance={'subtle'} size={'xs'}
                 searchable={false} cleanable={false}/>
      </SHeader>
      <TextArea
        as={'textarea'}
        value={styleValue}
        rows={3}
        onChange={handleChange}/>
    </div>
  )
})

const SHeader = styled.h6`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SPicker = styled(SelectPicker)`
  margin-inline-end: 4px;

  .rs-picker-toggle-value {
    font-size: 15px;
  }
`

const TextArea = styled(Input)`
  overflow-y: auto;
  resize: vertical !important;
`

export {CSSBlock}
