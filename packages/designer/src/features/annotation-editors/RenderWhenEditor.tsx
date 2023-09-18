import type {ComponentPropertyComputeType} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useCallback} from 'react'
import {Input} from 'rsuite'
import LabeledProperty, {LabeledPropertyProps} from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

/**
 * React form builder component to edit the 'Render when' component property.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const RenderWhenEditor = observer((props: AnnotationEditorProps) => {
  const componentStore = props.componentData.store

  const onChange = (value: string) => {
    if (!componentStore.renderWhen) {
      componentStore.renderWhen = {value}
      return
    }
    componentStore.renderWhen.value = value
  }

  const getComputeCode = useCallback(() => componentStore.renderWhen?.fnSource ?? '', [componentStore])
  const getComputeType = useCallback(() => ('function' as ComponentPropertyComputeType), [])

  const setComputeCode = useCallback((code: string) => {
    componentStore.renderWhen ??= {}
    componentStore.renderWhen.fnSource = code
    componentStore.renderWhen.computeType = 'function'
  }, [componentStore])

  const disableCompute = useCallback(() => {
    if (componentStore.renderWhen) componentStore.renderWhen.computeType = undefined
  }, [componentStore])

  const renderWhenProperties: LabeledPropertyProps = {
    annotation: props.annotation,
    componentData: props.componentData,
    getComputeCode,
    getComputeType,
    setComputeCode,
    disableCompute
  }

  return (
    <LabeledProperty {...renderWhenProperties} >
      <Input value={componentStore.renderWhen?.value ?? ''} onChange={onChange} size={'xs'}/>
    </LabeledProperty>
  )
})
