import {ComponentDataProvider, namedObserver, tooltipType} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../../../annotation-editors/AnnotationEditorProps'
import {TooltipTypePicker} from '../../../annotation-editors/TooltipTypePicker'

const disableCompute = () => undefined
const setComputeCode = () => undefined
const getComputeCode = () => ''
const getComputeType = () => undefined
const hasComputeCode = () => false

/**
 * React form builder component that displays the configuration properties of the validation error display component.
 * @returns the React element.
 */
const RawTooltipSettings = () => {
  const builderStore = useBuilderStore()

  // eslint-disable-next-line react-hooks/immutability
  const onChange = useCallback((value: string) => builderStore.viewer.form.tooltipType = value, [builderStore])
  // eslint-disable-next-line react-hooks/immutability
  const onClean = useCallback(() => builderStore.viewer.form.tooltipType = undefined, [builderStore])

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
