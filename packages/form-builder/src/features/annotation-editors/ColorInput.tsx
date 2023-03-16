import styled from '@emotion/styled'
import {isString, isUndefined} from 'lodash-es'
import ColorPicker from 'rsuite-color-picker'
import 'rsuite-color-picker/lib/styles.css'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../ui/common/LabeledProperty'

const PLACEHOLDER_COLOR = {r: 255, g: 255, b: 255, a: 0}

type RgbColor = { r: number; g: number; b: number; a: number } | undefined

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

export function rgbToString(value?: RgbColor | string) {
  if (isUndefined(value) || isString(value)) return value
  const {r, g, b, a} = value
  return `rgb(${r}, ${g}, ${b}, ${a})`
}

export function rgbFromString(value: string) {
  const matchColors = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  const [, r, g, b, a] = matchColors.exec(value) || []
  return [r, g, b].some(isUndefined) ? undefined : {r, g, b, a}
}
