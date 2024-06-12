import {color, define, event, number, string} from '@react-form-builder/core'
import {useCallback, useMemo, useRef} from 'react'
import {Button} from 'rsuite'
import {alignItems} from '../commonProperties'
import {RsLabeledInput, RsRtlLabel} from './components/Labeled'
import {Rows} from './components/Layout'
import {SignaturePad, SignaturePadHandle, SignaturePadProps} from './components/SignaturePad'

interface RsSignatureProps extends SignaturePadProps {
  value?: string
  label?: string
  clearButtonText?: string
}

const RsSignature = ({value, onChange, style, className, label, clearButtonText, ...props}: RsSignatureProps) => {
  const padRef = useRef<SignaturePadHandle>(null)
  const buttonStyle = useMemo(() => ({width: props.width, marginTop: 6}),
    [props.width])

  const clear = useCallback(() => {
    padRef.current?.clear()
    onChange?.(undefined)
  }, [onChange])

  const handleChange = useCallback((value?: string) => {
    onChange?.(value)
  }, [onChange])

  return <RsLabeledInput style={style} className={className}>
    <Rows>
      {label && <RsRtlLabel>{label}</RsRtlLabel>}
      <SignaturePad value={value} onChange={handleChange} ref={padRef} {...props}/>
    </Rows>
    <Button onClick={clear} disabled={!value} appearance={'primary'} style={buttonStyle}>{clearButtonText}</Button>
  </RsLabeledInput>
}

export const rsSignature = define(RsSignature, 'RsSignature')
  .name('Signature')
  .props({
    value: string.valued,
    label: string.default('Signature'),
    clearButtonText: string.default('Clear'),
    width: number.default(370),
    height: number.default(200),
    lineWidth: number.default(1.5),
    penColor: color.default('rgba(0, 0, 0, 1)'),
    backgroundColor: color.default('rgba(167, 167, 167, 0.1)'),
    onChange: event
  })
  .css({alignItems})
