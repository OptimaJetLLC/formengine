import styled from '@emotion/styled'
import {useTooltipType, useViewerProps} from '@react-form-builder/core'
import {startCase} from 'lodash-es'
import {observer} from 'mobx-react'
import {InputPicker} from 'rsuite'
import type {ItemDataType} from 'rsuite/esm/@types/common'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

/**
 * React form builder component that displays tooltip picker
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const TooltipTypePicker = observer((props: AnnotationEditorProps) => {
  const {value, onChange, annotation, onClean} = props
  const viewerProps = useViewerProps()
  const tooltipType = useTooltipType()
  const data = viewerProps.view.tooltips.map(name => {
    return {
      value: name,
      label: startCase(name)
    } as ItemDataType
  })

  return <LabeledProperty annotation={annotation}>
    <SInputPicker value={value ?? tooltipType ?? ''} data={data} onChange={onChange} onClean={onClean}
                  block cleanable size={'xs'}/>
  </LabeledProperty>
})

const SInputPicker = styled(InputPicker)`
  width: 100%;
`
