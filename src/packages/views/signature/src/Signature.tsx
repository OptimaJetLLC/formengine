import {color, define, event, number, string, useLicense} from '@react-form-builder/core'
import {useCallback, useEffect, useMemo, useRef} from 'react'
import {Button} from './Button'
import {alignItems, nonNegNumber, readOnly} from './props'
import type {SignaturePadHandle} from './SignaturePad'
import {SignaturePad} from './SignaturePad'
import {useTouchOnEvent} from './useTouchOnEvent'
import type {SignatureProps} from './SignatureProps'
import {LabeledInput, LabelLeft, Rows} from './styled'

const Signature = ({value, style, className, label, clearButtonText, readOnly, ...props}: SignatureProps) => {
  const padRef = useRef<SignaturePadHandle>(null)
  const buttonStyle = useMemo(() => ({width: props.width, marginTop: 6}),
    [props.width])
  const onChange = useTouchOnEvent(props, 'onChange')
  const {checkLicense} = useLicense()

  const clear = useCallback(() => {
    padRef.current?.clear()
    onChange(undefined)
  }, [onChange])

  useEffect(() => {
    checkLicense([{
      name: 'ftComponentSignature'
    }])
  }, [checkLicense])

  return <LabeledInput style={style} className={className}>
    <Rows>
      {label && <LabelLeft>{label}</LabelLeft>}
      <SignaturePad {...props} readOnly={readOnly} value={value} ref={padRef} onChange={onChange}/>
    </Rows>
    {!readOnly &&
      <Button onClick={clear} disabled={!value} style={buttonStyle}>{clearButtonText}</Button>
    }
  </LabeledInput>
}

export const signature = define(Signature, 'Signature')
  .name('Signature')
  .type('RsSignature')
  .props({
    value: string.valued,
    label: string.default('Signature'),
    clearButtonText: string.default('Clear'),
    width: nonNegNumber.default(370),
    height: nonNegNumber.default(200),
    lineWidth: number.default(1.5).withEditorProps({min: 0, step: 0.1}),
    penColor: color.default('rgba(0, 0, 0, 1)'),
    backgroundColor: color.default('rgba(167, 167, 167, 0.1)'),
    readOnly,
    onChange: event
  })
  .css({alignItems})
