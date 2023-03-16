import styled from '@emotion/styled'
import {useStore} from 'fb-core'
import {startCase} from 'lodash-es'
import {InputPicker} from 'rsuite'
import {ItemDataType} from 'rsuite/cjs/@types/common'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../ui/common/LabeledProperty'

export const TooltipTypePicker = () => {
  const {value, onChange, annotation, onRemove} = useEditor()
  const store = useStore()
  const data = store.props.view.tooltips.map(name => {
    return {
      value: name,
      label: startCase(name)
    } as ItemDataType
  })

  return <LabeledProperty annotation={annotation}>
    <SInputPicker value={value ?? store.tooltipType ?? ''} data={data} onChange={onChange} onClean={onRemove}
                  block cleanable size={'xs'}/>
  </LabeledProperty>
}

const SInputPicker = styled(InputPicker)`
  width: 100%;
`
