// @ts-ignore
import {useComponentData} from 'fb-core'
// @ts-ignore
import * as cssProperties from 'known-css-properties'
import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {StyleAnnotationProps} from '../StyleAnnotationProps'
import {CompactCell, Row} from './List'

const properties: any = cssProperties.all.map((value: string) => {
  return {label: value, value}
})

const CssListWrapper = ({annotation}: StyleAnnotationProps) => {
  const {componentStore} = useComponentData()

  useEffect(() => {
    if (componentStore.styles) {
      componentStore.styles.additional ??= annotation.default?.additional ?? [{}]
    }
  }, [componentStore.styles])

  if (!componentStore.styles) return null
  return <_CssList/>
}

const _CssList = observer(() => {
  const {componentStore} = useComponentData()
  const {t} = useTranslation()

  const styles = componentStore.styles!.additional
  if (!styles) return null

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
            rowIndex={index} dataKey={'value'} placeholder={'value'} value={item.value}
            onChange={(value: string) => item.value = value}
          />
        </Row>
      )
    })}
  </div>
})

export const CSSList = observer(CssListWrapper)
