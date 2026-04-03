import styled from '@emotion/styled'
import {Close} from '@rsuite/icons'
import {useCallback, useMemo} from 'react'
import type {RgbaColor} from 'react-colorful'
import {RgbaColorPicker} from 'react-colorful'
import {Input, InputGroup, Popover, Whisper} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

const SInput = styled(Input)<{ color: string }>`
  && {
    background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>');
    background-color: ${({color}) => color ?? 'var(--rs-btn-default-bg)'};
  }
`

const SButton = styled(InputGroup.Button)`
  && {
    background-color: var(--rs-btn-default-bg) !important;
    position: absolute;
    inset-inline-end: 0;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    padding: 6px 8px;
  }
`

/**
 * Converts the value to a string containing the color in CSS format.
 * @param value the object or string with a CSS color.
 * @returns the string containing the color in CSS format.
 */
function rgbToString(value: RgbaColor) {
  const {r, g, b, a} = value
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

/**
 * Converts the string containing a rgba color value into an object.
 * @param value the string containing a rgba color.
 * @returns the object with properties '{r, g, b, a}'.
 */
function rgbFromString(value: string): RgbaColor {
  const matchColors = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  const [, r, g, b, a] = matchColors.exec(value) || []
  return {r: Number(r), g: Number(g), b: Number(b), a: Number(a)}
}

const fullWidthStyle = {width: '100%'} as const

/**
 * The property editor for the color property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ColorInput = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean} = props
  const color = useMemo(() => rgbFromString(value ?? 'rgba(255, 255, 255, 0)'), [value])
  const handleChange = useCallback((rgba: RgbaColor) => onChange(rgbToString(rgba)), [onChange])

  const speaker = useMemo(() => (
    <Popover>
      <RgbaColorPicker color={color} onChange={handleChange}/>
    </Popover>
  ), [color, handleChange])

  return <LabeledProperty {...props}>
    <InputGroup inside style={fullWidthStyle} size={'xs'}>
      <Whisper placement="auto" trigger="hover" speaker={speaker} enterable>
        <SInput color={value} readOnly/>
      </Whisper>
      <SButton onClick={onClean}>
        <Close/>
      </SButton>
    </InputGroup>
  </LabeledProperty>
}
