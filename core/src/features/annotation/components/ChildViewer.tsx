import {ReactNode} from 'react'
import {ComponentStore} from '../../../stores/ComponentStore'
import {LabeledInput} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'

const ChildViewer = (props: PropertyEditorProps) => {
  const {annotation, value, componentStore} = props

  const isChild = (child: ComponentStore) =>
    child.bindTo === annotation.key || !child.bindTo && annotation.key === 'children'

  return (
    <LabeledInput>
      <label>{annotation.name}</label>
      <ul>
        {componentStore.children?.filter(isChild)
          .map((item) => (<li key={item.key}>{item.key}</li>))}
      </ul>
    </LabeledInput>
  )
}

export {ChildViewer}
