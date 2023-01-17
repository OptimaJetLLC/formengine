// @ts-ignore
import * as cssProperties from 'known-css-properties'
import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {useComponentData} from '../../../../utils/contexts/ComponenDataContext'
import {StyleAnnotationProps} from '../StyleEditor'
import {CompactCell, Row} from './List'

const properties: any = cssProperties.all.map((value: string) => {
  return {label: value, value}
})

export const CSSList = observer(({annotation}: StyleAnnotationProps) => {
  const {componentStore} = useComponentData()
  const {t} = useTranslation()
  componentStore.styles!.additional ??= annotation.default?.additional ?? [{}]
  const styles = componentStore.styles!.additional

  return <div>
    <h6>{t('style.cssStyles')}</h6>
    {styles?.map((item, index) => {
      return (
        <Row key={index}>
          <CompactCell
            rowIndex={index} dataKey={'name'} placeholder={'style'}
            options={properties} value={item.name}
            onChange={(value: string) => {
              if (styles[styles.length - 1].name || styles[styles.length - 1].value) {
                componentStore.styles!.additional = [...styles, {}]
              }
              item.name = value
            }}
          />
          <CompactCell
            rowIndex={index} dataKey={'value'} placeholder={'value'} editable={true} value={item.value}
            onChange={(value: string) => item.value = value}
          />
        </Row>
      )
    })}
  </div>
})
