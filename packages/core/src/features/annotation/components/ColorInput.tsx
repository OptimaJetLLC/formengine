import styled from '@emotion/styled'
import ColorPicker from 'rsuite-color-picker'
import 'rsuite-color-picker/lib/styles.css'
import {rgbFromString, rgbToString} from '../../style/utils'
import LabeledProperty from '../../ui/LabeledProperty'
import {useEditor} from '../utils/useEditor'

const PLACEHOLDER_COLOR = {r: 255, g: 255, b: 255, a: 0}

export const ColorInput = () => {
  const {value, onChange, annotation} = useEditor()
  return <LabeledProperty annotation={annotation}>
    <SColorPicker>
      <ColorPicker value={rgbFromString(value) ?? PLACEHOLDER_COLOR} onChange={({rgb}) => onChange(rgbToString(rgb))}/>
    </SColorPicker>
  </LabeledProperty>
}

const SColorPicker = styled.div`
  width: 100%;

  .rsuite-color-picker {
    min-height: 30px;
    width: 100%;
    padding: 6px;
    background-clip: content-box;
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);

    .rsuite-color-picker-overlay {
      left: initial;
      right: 0;
      z-index: 10;
    }
  }
`
