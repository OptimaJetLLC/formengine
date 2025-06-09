import {ComponentDataProvider, namedObserver, tooltipType} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../../../annotation-editors/AnnotationEditorProps'
import {TooltipTypePicker} from '../../../annotation-editors/TooltipTypePicker'

/**
 * React form builder component that displays the configuration properties of the validation error display component.
 * @returns the React element.
 */
const RawTooltipSettings = () => {
  const builderStore = useBuilderStore()

  const onChange = useCallback((value: string) => builderStore.viewer.form.tooltipType = value, [builderStore])
  const onClean = useCallback(() => builderStore.viewer.form.tooltipType = undefined, [builderStore])
  const disableCompute = useCallback(() => undefined, [])
  const setComputeCode = useCallback(() => undefined, [])
  const getComputeCode = useCallback(() => '', [])
  const getComputeType = useCallback(() => undefined, [])
  const hasComputeCode = useCallback(() => false, [])

  const annotationEditorProps: AnnotationEditorProps = {
    onChange,
    value: builderStore.viewer.form.tooltipType,
    componentData: builderStore.viewer.form.componentTree,
    onClean,
    annotation: tooltipType.calculable(false).notLocalize.build('tooltipType'),
    disableCompute,
    setComputeCode,
    getComputeCode,
    getComputeType,
    hasComputeCode,
  }

  return (
    <div>
      <ComponentDataProvider value={builderStore.viewer.form.componentTree}>
        <TooltipTypePicker {...annotationEditorProps}/>
      </ComponentDataProvider>
    </div>
  )
}

export const TooltipSettings = namedObserver('TooltipSettings', RawTooltipSettings)
