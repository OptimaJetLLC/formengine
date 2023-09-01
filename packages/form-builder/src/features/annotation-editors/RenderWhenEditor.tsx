import {ComponentProperty} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {Input} from 'rsuite'
import {EditableProperty} from '../../stores/BuilderStore'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

/**
 * React form builder component to edit the 'Render when' component property.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const RenderWhenEditor = observer((props: AnnotationEditorProps) => {
  const {annotation} = props
  const selected = useBuilderStore().oneSelected?.store

  if (!selected) return null

  const onChange = (value: string) => {
    if (!selected.renderWhen) {
      selected.renderWhen = {value}
      return
    }
    selected.renderWhen.value = value
  }

  const getEditableProperty = () => new EditableProperty(
    selected.key,
    annotation,
    (property: ComponentProperty) => {
      const renderWhen = selected.renderWhen || {}
      selected.renderWhen = Object.assign(renderWhen, property)
      return selected.renderWhen
    },
    selected.renderWhen
  )

  return (
    <LabeledProperty annotation={annotation} getEditableProperty={getEditableProperty}>
      <Input value={selected.renderWhen?.value ?? ''} onChange={onChange} size={'xs'}/>
    </LabeledProperty>
  )
})
