import {namedObserver, oneOf, useStore} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {AnnotationEditorProps} from '../../../annotation-editors/AnnotationEditorProps'
import {Picker} from '../../../annotation-editors/Picker'

export const ErrorComponentPicker = namedObserver('ErrorComponentPicker', () => {
  const viewerStore = useStore()
  const builderStore = useBuilderStore()

  const onChange = useCallback((value?: string) => viewerStore.form.errorType = value, [viewerStore])
  const onClean = useCallback(() => viewerStore.form.errorType = undefined, [viewerStore])
  const disableCompute = useCallback(() => undefined, [])
  const setComputeCode = useCallback(() => undefined, [])
  const getComputeCode = useCallback(() => '', [])
  const getComputeType = useCallback(() => undefined, [])
  const hasComputeCode = useCallback(() => false, [])

  const values = builderStore.view.errors
  const annotation = oneOf(...values)
    .default(values[0])
    .calculable(false)
    .notLocalize
    .withEditorProps({
      creatable: false
    })
    .build('errorType')

  const props: AnnotationEditorProps = {
    value: viewerStore.form.errorType,
    onChange,
    onClean,
    annotation: annotation,
    componentData: builderStore.viewer.form.componentTree,
    disableCompute,
    setComputeCode,
    getComputeCode,
    getComputeType,
    hasComputeCode,
  }

  return <Picker {...props}/>
})
