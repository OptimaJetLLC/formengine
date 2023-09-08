import {ComponentDataProvider, namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {tooltipType} from '../../../annotation'
import {AnnotationEditorProps} from '../../../annotation-editors/AnnotationEditorProps'
import {TooltipTypePicker} from '../../../annotation-editors/TooltipTypePicker'

/**
 * React form builder component that displays the configuration properties of the validation error display component.
 * @returns the React element.
 */
export const TooltipSettings = namedObserver('TooltipSettings', () => {
  const builderStore = useBuilderStore()

  const onChange = useCallback(value => builderStore.viewer.form.tooltipType = value, [builderStore])
  const onClean = useCallback(() => builderStore.viewer.form.tooltipType = undefined, [builderStore])

  const annotationEditorProps: AnnotationEditorProps = {
    onChange,
    value: builderStore.viewer.form.tooltipType,
    componentData: builderStore.viewer.form.componentTree,
    onClean,
    annotation: tooltipType.calculable(false).notLocalize.build('tooltipType')
  }

  return (
    <div>
      <ComponentDataProvider value={builderStore.viewer.form.componentTree}>
        <TooltipTypePicker {...annotationEditorProps}/>
      </ComponentDataProvider>
    </div>
  )
})
