import styled from '@emotion/styled'
import {ComponentStore, useComponentData} from '@react-form-builder/core'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../components/LabeledProperty'

/**
 * The property editor for the children property type.
 * @returns the React element.
 */
export const ChildViewer = () => {
  const {annotation} = useEditor()
  const {store} = useComponentData()
  const isChild = (child: ComponentStore) =>
    child.bindTo === annotation.key || !child.bindTo && annotation.key === 'children'

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
