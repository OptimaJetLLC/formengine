import {StyleAn, useComponentData} from 'fb-core'
import {useEffect} from 'react'
import {useEditor} from '../../../utils/useEditor'
import {Rows} from '../../ui/common/Containers'
import {CSSBlock} from './components/CSSBlock'
import {CSSList} from './components/CSSList'
import {DefinedStyles} from './components/DefinedStyles'
import {StandardStyles} from './components/StandardStyles'

export const StyleEditor = () => {
  const {componentStore} = useComponentData()
  const {annotation}: { annotation: StyleAn } = useEditor()
  useEffect(() => {
    componentStore.styles ??= {}
  }, [componentStore.styles])

  if (!componentStore.styles) return null

  return (
    <Rows ml={'5px'} my={0}>
      <StandardStyles/>
      <CSSList annotation={annotation}/>
      <CSSBlock annotation={annotation}/>
      <DefinedStyles annotation={annotation}/>
    </Rows>
  )
}

