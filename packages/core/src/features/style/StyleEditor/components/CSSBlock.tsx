import styled from '@emotion/styled'
import autosize from 'autosize'
import {observer} from 'mobx-react'
import {useEffect, useRef} from 'react'
import {useTranslation} from 'react-i18next'
import {Input} from 'rsuite'
import {useComponentData} from '../../../../utils/contexts/ComponentDataContext'
import {StyleAnnotationProps} from '../StyleAnnotationProps'

const CSSBlock = observer(({annotation}: StyleAnnotationProps) => {
  const {componentStore} = useComponentData()
  const {t} = useTranslation()

  const ref = useRef<Element | null>(null)
  useEffect(() => {
    if (ref.current) autosize(ref.current)
  }, [ref.current])

  return (
    <div>
      <h6 style={{marginBottom: 5}}>{t('style.cssStyleBlock')}</h6>
      <TextArea
        as={'textarea'}
        value={componentStore.styles!.cssString ?? annotation.default?.cssString ?? ''}
        rows={3}
        onChange={(value: string) => componentStore.styles!.cssString = value}/>
    </div>
  )
})

const TextArea = styled(Input)`
  //max-height: 300px;
  overflow-y: auto;
  resize: vertical !important;
`

export {CSSBlock}
