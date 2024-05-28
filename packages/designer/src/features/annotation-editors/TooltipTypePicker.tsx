import styled from '@emotion/styled'
import {namedObserver, useTooltipType} from '@react-form-builder/core'
import {startCase} from 'lodash-es'
import {InputPicker} from 'rsuite'
import type {ItemDataType} from 'rsuite/esm/@types/common'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

/**
 * React form builder component that displays tooltip picker
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const RawTooltipTypePicker = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean} = props
  const builderStore = useBuilderStore()
  const tooltipType = useTooltipType()
  const data = builderStore.view.tooltips.map(name => {
    return {
      value: name,
      label: startCase(name)
    } as ItemDataType
  })

  return <LabeledProperty {...props}>
    <SInputPicker value={value ?? tooltipType ?? ''} data={data} onChange={onChange}
                  onClean={onClean} block cleanable size={'xs'} placement={'auto'}/>
  </LabeledProperty>
}

export const TooltipTypePicker = namedObserver('TooltipTypePicker', RawTooltipTypePicker)

const SInputPicker = styled(InputPicker)`
  width: 100%;
`
