import styled from '@emotion/styled'
import {useTooltipType} from '@react-form-builder/core'
import {startCase} from 'lodash-es'
import {observer} from 'mobx-react'
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
export const TooltipTypePicker = observer((props: AnnotationEditorProps) => {
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
})

const SInputPicker = styled(InputPicker)`
  width: 100%;
`
