import {color, define, event, number, string, useLicense} from '@react-form-builder/core'
import {useCallback, useEffect, useMemo, useRef} from 'react'
import {Button} from 'rsuite'
import {alignItems, nonNegNumber, readOnly} from '../commonProperties'
import {Labeled} from './components/Labeled'
import type {SignaturePadHandle, SignaturePadProps} from './components/SignaturePad'
import {SignaturePad} from './components/SignaturePad'
import {useTouchOnEvent} from './hooks/useTouchOnEvent'

interface RsSignatureProps extends SignaturePadProps {
  value?: string
  label?: string
  clearButtonText?: string
  'data-testid'?: string
}

const RsSignature = ({value, style, className, label, clearButtonText, readOnly, ...props}: RsSignatureProps) => {
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

  return <Labeled label={label} style={style} className={className} data-testid={props['data-testid']}>
    <SignaturePad {...props} readOnly={readOnly} value={value} ref={padRef} onChange={onChange}/>
    {!readOnly &&
      <Button onClick={clear} disabled={!value} appearance={'primary'} style={buttonStyle}>{clearButtonText}</Button>
    }
  </Labeled>
}

export const rsSignature = define(RsSignature, 'RsSignature')
  .name('Signature')
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
