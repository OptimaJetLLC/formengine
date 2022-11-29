import styled from '@emotion/styled'
import ColorPicker from 'rsuite-color-picker'
import 'rsuite-color-picker/lib/styles.css'
import {LabeledInput} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

export const ColorInput = ({componentStore, annotation}: PropertyEditorProps) => {
  const {value, onChange} = makeAnnotationProps({componentStore, annotation})
  return (
    <Container>
      <label>{annotation.name}</label>
      <ColorPicker value={value} onChange={({rgb}) => onChange(rgb)}/>
    </Container>
  )
}

const Container = styled(LabeledInput)`
  .rsuite-color-picker {
    min-height: 30px;
    width: 100%;
    padding: 6px;
    background-clip: content-box;
    background-position: 0px 0px, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);

    .rsuite-color-picker-overlay {
      left: initial;
      right: 0;
    }
  }
`
