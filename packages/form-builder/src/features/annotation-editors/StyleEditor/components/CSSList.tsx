import {useComponentData} from 'fb-core'
// @ts-ignore
import * as cssProperties from 'known-css-properties'
import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {AutocompleteCell, EditableTable, makeColumns} from '../../../ui/common/EditableTable'
import {StyleAnnotationProps} from '../StyleAnnotationProps'

const properties: any = cssProperties.all.map((value: string) => {
  return {label: value, value}
})

const columns = makeColumns([
  {
    name: 'name',
    input: AutocompleteCell as any,
    inputProps: {
      options: properties,
      placeholder: 'style'
    }
  },
  {
    name: 'value',
    input: AutocompleteCell as any,
    inputProps: {
      placeholder: 'value'
    }
  }
])

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

  const handleChange = (data: any) => {
    componentStore.styles!.additional = data
  }

  return <div>
    <h6>{t('style.cssList')}</h6>
    <EditableTable data={styles} columns={columns} onChange={handleChange} autoAdd hideHeader/>
  </div>
})

export const CSSList = observer(CssListWrapper)
