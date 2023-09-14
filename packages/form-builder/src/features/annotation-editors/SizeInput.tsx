import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {Input, InputNumber, InputPicker} from 'rsuite'
import {toLabeledValues} from '../annotation/utils/LabeledValue'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

type InputValue = string | number;
export const OtherUnit = 'other'
export const SizeUnits = ['px', '%', 'em', 'vw', 'vh']
export const SizeKeywords = ['max-content', 'min-content', 'fit-content', 'auto']
const options = toLabeledValues([...SizeUnits, ...SizeKeywords, OtherUnit], false)

/**
 * The property editor for the CSS size property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const SizeInput = (props: AnnotationEditorProps) => {
  const {value: CSSValue, onChange, onClean} = props
  const {value, unit} = parseCSSValue(CSSValue)

  const handleValueChange = (value: InputValue) => onChange(makeCSSValue(value, unit))
  const handleUnitChange = (unit: string) => onChange(makeCSSValue(value ?? 10, unit))

  const input = unit === OtherUnit
    ? <Input value={value} size={'xs'} onChange={handleValueChange}/>
    : <InputNumber value={value} size={'xs'} onChange={handleValueChange}/>

  return (
    <LabeledProperty {...props}>
      <Container>
        {isNeedValue(unit) && input}
        <SPicker
          value={unit ?? ''}
          onChange={handleUnitChange}
          data={options}
          className={cx({withValue: isNeedValue(unit)})}
          creatable
          placement={'bottomEnd'}
          size={'xs'}
          onClean={onClean}
        />
      </Container>
    </LabeledProperty>
  )
}

function parseCSSValue(cssValue?: string) {
  if (!cssValue) return {}
  if (SizeKeywords.includes(cssValue)) return {unit: cssValue}

  //Parse '10.1%' to '10.1' and '%'
  const match = cssValue.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]{2,4}|%)$/i)
  if (!match) return {value: cssValue, unit: OtherUnit}

  const value = parseFloat(match[1])
  const unit = match[2]
  return SizeUnits.includes(unit)
    ? {value, unit}
    : {value: `${value}${unit}`, unit: OtherUnit}
}

const isNeedValue = (unit?: string) => typeof unit !== 'undefined' && !SizeKeywords.includes(unit)

const makeCSSValue = (value: InputValue, unit?: string) => {
  const number = convertToNumberForNonOtherUnit(value, unit)
  return `${isNeedValue(unit) ? number : ''}${unit === OtherUnit ? '' : unit}`
}

/**
 * Converts the measured value to a number if the value is not measured in 'other'.
 * @param value the measured value.
 * @param unit the unit of measure.
 * @returns the value converted to a number, or the original value if the unit is 'other'.
 * @internal
 */
function convertToNumberForNonOtherUnit(value: InputValue, unit?: string) {
  if (unit !== OtherUnit && typeof value === 'string') {
    const match = value.match(/[+-]?\d+(\.\d+)?/)
    return parseFloat(match?.[0] ?? '10')
  }
  return value
}

const Container = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
`

const SPicker = styled(InputPicker)`
  width: auto;

  &.withValue {
    width: min-content;
    min-width: 70px;
  }
`

export {SizeInput}
