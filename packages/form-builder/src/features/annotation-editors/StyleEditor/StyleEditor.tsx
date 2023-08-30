import {useEffect} from 'react'
import {Rows} from '../../components/Containers'
import {AnnotationEditorProps} from '../AnnotationEditorProps'
import {ClassName} from './components/ClassName'
import {CSSBlock} from './components/CSSBlock'
import {DefinedStyles} from './components/DefinedStyles'
import {StandardStyles} from './components/StandardStyles'
import {observer} from 'mobx-react'

/**
 * Component style editor for the form builder.
 * @returns the React element.
 */
export const StyleEditor = observer((props: AnnotationEditorProps) => {
  const {store} = props.componentData

  useEffect(() => {
    store.css ??= {}
  }, [store.css])

  if (!store.css) return null

  return (
    <Rows style={{marginLeft: 5}}>
      <StandardStyles/>
      <CSSBlock/>
      <ClassName/>
      <DefinedStyles/>
    </Rows>
  )
})

