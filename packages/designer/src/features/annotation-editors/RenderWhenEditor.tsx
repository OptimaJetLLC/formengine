import {namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {Input} from 'rsuite'
import type {LabeledPropertyProps} from '../components/LabeledProperty'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps, CalculableEditorProps} from './AnnotationEditorProps'
import {clearRenderWhenCompute, setRenderWhenFunction, setRenderWhenValue} from './componentStoreEdits'

/**
 * React form builder component to edit the 'Render when' component property.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const RawRenderWhenEditor = (props: AnnotationEditorProps) => {
  const componentStore = props.componentData.store

  const onChange = useCallback(
    (value: string) => {
      setRenderWhenValue(componentStore, value)
    },
    [componentStore]
  )

  const getComputeCode = useCallback(() => componentStore.renderWhen?.fnSource ?? '', [componentStore])
  const getComputeType = useCallback(() => componentStore.renderWhen?.computeType, [componentStore])
  const hasComputeCode = useCallback<CalculableEditorProps['hasComputeCode']>(
    type => {
      if (type === 'function') return !!getComputeCode()
      return false
    },
    [getComputeCode]
  )

  const setComputeCode = useCallback(
    (code: string) => {
      setRenderWhenFunction(componentStore, code)
    },
    [componentStore]
  )

  const disableCompute = useCallback(() => {
    clearRenderWhenCompute(componentStore)
  }, [componentStore])

  const renderWhenProperties: LabeledPropertyProps = {
    annotation: props.annotation,
    componentData: props.componentData,
    getComputeCode,
    getComputeType,
    setComputeCode,
    disableCompute,
    hasComputeCode,
  }

  return (
    <LabeledProperty {...renderWhenProperties}>
      <Input value={componentStore.renderWhen?.value ?? ''} onChange={onChange} size={'xs'} />
    </LabeledProperty>
  )
}

export const RenderWhenEditor = namedObserver('RenderWhenEditor', RawRenderWhenEditor)
