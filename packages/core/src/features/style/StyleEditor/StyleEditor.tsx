import {useEffect} from 'react'
import {useComponentData} from '../../../utils/contexts/ComponentDataContext'
import {StyleAn} from '../../annotation/utils/annotations/StyleAn'
import {useEditor} from '../../annotation/utils/useEditor'
import {Rows} from '../../ui/Containers'
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

