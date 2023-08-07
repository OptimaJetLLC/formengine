import styled from '@emotion/styled'
import {useTooltipType, useViewerProps} from '@react-form-builder/core'
import {startCase} from 'lodash-es'
import {InputPicker} from 'rsuite'
import type {ItemDataType} from 'rsuite/esm/@types/common'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../components/LabeledProperty'

/**
 * React form builder component that displays tooltip picker
 * @returns the React element.
 */
export const TooltipTypePicker = () => {
  const {value, onChange, annotation, onRemove} = useEditor()
  const props = useViewerProps()
  const tooltipType = useTooltipType()
  const data = props.view.tooltips.map(name => {
    return {
      value: name,
      label: startCase(name)
    } as ItemDataType
  })

  return <LabeledProperty annotation={annotation}>
    <SInputPicker value={value ?? tooltipType ?? ''} data={data} onChange={onChange} onClean={onRemove}
                  block cleanable size={'xs'}/>
  </LabeledProperty>
}

const SInputPicker = styled(InputPicker)`
  width: 100%;
`
