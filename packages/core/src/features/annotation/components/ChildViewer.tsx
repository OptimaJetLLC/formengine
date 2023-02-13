import styled from '@emotion/styled'
import {ComponentStore} from '../../../stores/ComponentStore'
import {useComponentData} from '../../../utils/contexts/ComponenDataContext'
import LabeledProperty from '../../ui/LabeledProperty'
import {useEditor} from '../utils/useEditor'

export const ChildViewer = () => {
  const {annotation} = useEditor()
  const {componentStore} = useComponentData()
  const isChild = (child: ComponentStore) =>
    child.bindTo === annotation.key || !child.bindTo && annotation.key === 'children'

  return (
    <LabeledProperty annotation={annotation}>
      <Sul>
        {componentStore.children?.filter(isChild)
          .map((item) => (<li key={item.key}>{item.key}</li>))}
      </Sul>
    </LabeledProperty>
  )
}

const Sul = styled.ul`
  width: 100%;
  padding-left: 12px;
`
