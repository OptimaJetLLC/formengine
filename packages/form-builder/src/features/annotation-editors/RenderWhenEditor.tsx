import {ComponentProperty} from 'fb-core'
import {Input} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {useAnnotation} from '../../utils/EditorContext'
import LabeledProperty from '../ui/common/LabeledProperty'

export const RenderWhenEditor = () => {
  const selected = useBuilderStore().getSingleSelected()
  const {annotation} = useAnnotation()

  if (!selected) return null

  const {renderWhen} = selected.data

  const onChange = (value: string) => {
    if (!selected.data.renderWhen) {
      selected.data.renderWhen = {value}
      return
    }
    selected.data.renderWhen.value = value
  }

  const getEditableProperty = () => ({
    componentKey: selected.key,
    annotation: annotation,
    property: selected.data.renderWhen,
    saveProperty: (property: ComponentProperty) => {
      const renderWhen = selected.data.renderWhen || {}
      selected.data.renderWhen = Object.assign(renderWhen, property)
      return selected.data.renderWhen
    }
  })

  return (
    <LabeledProperty annotation={annotation} getEditableProperty={getEditableProperty}>
      <Input value={renderWhen?.value ?? ''} onChange={onChange} size={'xs'}/>
    </LabeledProperty>
  )
}
