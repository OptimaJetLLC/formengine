import {namedObserver, oneOf, useStore} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../../../annotation-editors/AnnotationEditorProps'
import {Picker} from '../../../annotation-editors/Picker'

const disableCompute = () => undefined
const setComputeCode = () => undefined
const getComputeCode = () => ''
const getComputeType = () => undefined
const hasComputeCode = () => false

const RawErrorComponentPicker = () => {
  const viewerStore = useStore()
  const builderStore = useBuilderStore()

  // eslint-disable-next-line react-hooks/immutability
  const onChange = useCallback((value?: string) => (viewerStore.form.errorType = value), [viewerStore])
  // eslint-disable-next-line react-hooks/immutability
  const onClean = useCallback(() => (viewerStore.form.errorType = undefined), [viewerStore])

  const values = useMemo(() => {
    const names = builderStore.view.filterModels(model => model.hasComponentRole('error-message')).map(model => model.type)
    return [...new Set(names)]
  }, [builderStore.view])

  const defaultValue = values[0]
  const value = viewerStore.form.errorType ?? defaultValue
  const annotation = oneOf(...values)
    .default(defaultValue)
    .calculable(false)
    .notLocalize.withEditorProps({
      creatable: false,
    })
    .build('errorType')

  const props: AnnotationEditorProps = {
    value,
    onChange,
    onClean,
    annotation,
    componentData: builderStore.viewer.form.componentTree,
    disableCompute,
    setComputeCode,
    getComputeCode,
    getComputeType,
    hasComputeCode,
  }

  return <Picker {...props} />
}

export const ErrorComponentPicker = namedObserver('ErrorComponentPicker', RawErrorComponentPicker)
