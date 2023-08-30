import styled from '@emotion/styled'
import {ComponentStore} from '@react-form-builder/core'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

/**
 * The property editor for the children property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ChildViewer = (props: AnnotationEditorProps) => {
  const {annotation} = props
  const {store} = props.componentData
  const isChild = (child: ComponentStore) =>
    child.slot === annotation.key || !child.slot && annotation.key === 'children'

  return (
    <LabeledProperty annotation={annotation}>
      <Sul>
        {store.children?.filter(isChild)
          .map((item) => (<li key={item.key}>{item.key}</li>))}
      </Sul>
    </LabeledProperty>
  )
}

const Sul = styled.ul`
  width: 100%;
  padding-left: 12px;
`
