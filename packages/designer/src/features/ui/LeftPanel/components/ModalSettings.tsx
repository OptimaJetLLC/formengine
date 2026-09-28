import {ComponentDataProvider, createAnnotation, namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../../../annotation-editors/AnnotationEditorProps'
import {ModalTypePicker} from '../../../annotation-editors/ModalTypePicker'

/**
 * The annotation builder for the form property describing the type of form modal.
 */
const modalType = createAnnotation('modalType').typed('string')

const disableCompute = () => undefined
const setComputeCode = () => undefined
const getComputeCode = () => ''
const getComputeType = () => undefined
const hasComputeCode = () => false

/**
 * React form builder component that displays the configuration properties of the modal component.
 * @returns the React element.
 */
const RawModalSettings = () => {
  const builderStore = useBuilderStore()
  const form = builderStore.viewer.form

  const onChange = useCallback(
    (value?: string) => {
      // eslint-disable-next-line react-hooks/immutability
      form.modalType = value
    },
    [form]
  )

  const onClean = useCallback(() => onChange(), [onChange])

  const annotationEditorProps: AnnotationEditorProps = {
    onChange,
    value: form.modalType,
    componentData: form.componentTree,
    onClean,
    annotation: modalType.calculable(false).notLocalize.build('modalType'),
    disableCompute,
    setComputeCode,
    getComputeCode,
    getComputeType,
    hasComputeCode,
  }

  return (
    <div>
      <ComponentDataProvider value={form.componentTree}>
        <ModalTypePicker {...annotationEditorProps} />
      </ComponentDataProvider>
    </div>
  )
}

export const ModalSettings = namedObserver('ModalSettings', RawModalSettings)
