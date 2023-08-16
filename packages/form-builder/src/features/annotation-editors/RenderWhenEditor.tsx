import {ComponentProperty} from '@react-form-builder/core'
import {Input} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {useAnnotation} from '../../utils/EditorContext'
import LabeledProperty from '../components/LabeledProperty'

/**
 * React form builder component to edit the 'Render when' component property.
 * @returns the React element.
 */
export const RenderWhenEditor = () => {
  const selected = useBuilderStore().oneSelected?.store
  const {annotation} = useAnnotation()

  if (!selected) return null

  const {renderWhen} = selected

  const onChange = (value: string) => {
    if (!selected.renderWhen) {
      selected.renderWhen = {value}
      return
    }
    selected.renderWhen.value = value
  }

  const getEditableProperty = () => ({
    componentKey: selected.key,
    annotation: annotation,
    property: selected.renderWhen,
    saveProperty: (property: ComponentProperty) => {
      const renderWhen = selected.renderWhen || {}
      selected.renderWhen = Object.assign(renderWhen, property)
      return selected.renderWhen
    }
  })

  return (
    <LabeledProperty annotation={annotation} getEditableProperty={getEditableProperty}>
      <Input value={renderWhen?.value ?? ''} onChange={onChange} size={'xs'}/>
    </LabeledProperty>
  )
}
