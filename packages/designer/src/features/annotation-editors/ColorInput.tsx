import {Close} from '@rsuite/icons'
import {useCallback, useMemo} from 'react'
import type {RgbaColor} from 'react-colorful'
import {RgbaColorPicker} from 'react-colorful'
import {Input, InputGroup, Popover, Whisper} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import styles from './ColorInput.module.css'

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

  const style = useMemo(() => ({
    backgroundColor: value,
  } as const), [value])

  return (
    <LabeledProperty {...props}>
      <InputGroup inside className={styles.fullWidth} size={'xs'}>
        <Whisper placement="auto" trigger="hover" speaker={speaker} enterable>
          <Input className={styles.input} style={style} readOnly/>
        </Whisper>
        <InputGroup.Button className={styles.button} onClick={onClean}>
          <Close/>
        </InputGroup.Button>
      </InputGroup>
    </LabeledProperty>
  )
}
