import styled from '@emotion/styled'
import {startCase} from 'lodash'
import {InputPicker} from 'rsuite'
import {ItemDataType} from 'rsuite/cjs/@types/common'
import {useStore} from '../../../utils/contexts/StoreContext'
import LabeledProperty from '../../ui/LabeledProperty'
import {useEditor} from '../utils/useEditor'

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
