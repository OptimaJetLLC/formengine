import styled from '@emotion/styled'
import {Close} from '@rsuite/icons'
import {isString, isUndefined} from 'lodash-es'
import {Button} from 'rsuite'
import ColorPicker from 'rsuite-color-picker'
import 'rsuite-color-picker/lib/styles.css'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

const PLACEHOLDER_COLOR = {r: 255, g: 255, b: 255, a: 0}

type RgbColor = { r: number; g: number; b: number; a: number } | undefined

/**
 * The property editor for the color property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ColorInput = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean, annotation} = props
  return <LabeledProperty annotation={annotation}>
    <SColorPicker>
      <ColorPicker value={rgbFromString(value) ?? PLACEHOLDER_COLOR} onChange={({rgb}) => onChange(rgbToString(rgb))}/>
      <SButton onClick={onClean} size={'xs'}>
        <Close/>
      </SButton>
    </SColorPicker>
  </LabeledProperty>
}

const SButton = styled(Button)`
  && {
    position: absolute;
    inset-inline-end: 0;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    padding: 6px 8px;
  }
`

const SColorPicker = styled.div`
  position: relative;
  display: flex;
  gap: 5px;
  align-items: center;
  width: 100%;

  .rsuite-color-picker {
    min-height: 22px;
    min-width: 30px;
    flex: 1;
    padding: 0;
    background-clip: content-box;
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);

    .rsuite-color-picker-overlay {
      left: initial;
      right: 0;
      z-index: 10;
    }

    .rsuite-color-picker-review {
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      border-radius: 6px;
    }
  }
`

/**
 * Converts the value to a string containing the color in CSS format.
 * @param value the object or string with a CSS color.
 * @returns the string containing the color in CSS format.
 */
export function rgbToString(value?: RgbColor | string) {
  if (isUndefined(value) || isString(value)) return value
  const {r, g, b, a} = value
  return `rgb(${r}, ${g}, ${b}, ${a})`
}

/**
 * Converts the string containing a rgba color value into an object.
 * @param value the string containing a rgba color.
 * @returns the object with properties '{r, g, b, a}'.
 */
export function rgbFromString(value: string) {
  const matchColors = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  const [, r, g, b, a] = matchColors.exec(value) || []
  return [r, g, b].some(isUndefined) ? undefined : {r, g, b, a}
}
