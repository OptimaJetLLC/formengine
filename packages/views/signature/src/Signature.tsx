import {color, define, event, number, string, useAriaAttributes, useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import {useCallback, useMemo, useRef} from 'react'
import {Button} from './Button'
import {alignItems, nonNegNumber, readOnly} from './props'
import styles from './Signature.module.css'
import type {SignaturePadHandle} from './SignaturePad'
import {SignaturePad} from './SignaturePad'
import type {SignatureProps} from './SignatureProps'
import {useTouchOnEvent} from './useTouchOnEvent'

const Signature = ({value, style, className, label, clearButtonText, readOnly, ...props}: SignatureProps) => {
  const padRef = useRef<SignaturePadHandle>(null)
  const {id} = useComponentData()
  const aria = useAriaAttributes({labeled: !!label})
  const onChange = useTouchOnEvent(props, 'onChange')

  const clearButtonStyle = useMemo(
    () => ({
      width: props.width,
      marginTop: 6,
    }),
    [props.width]
  )

  // SignaturePad does not display the data-testid attribute
  const dataTestId = (props as any)?.['data-testid']

  const clear = useCallback(() => {
    padRef.current?.clear()
    onChange(undefined)
  }, [onChange])

  return (
    <div style={style} className={cx(styles.container, className)} data-testid={dataTestId}>
      <div className={styles.rows}>
        {label && (
          <label id={aria['aria-labelledby']} htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <SignaturePad {...props} id={id} readOnly={readOnly} value={value} ref={padRef} ariaAttributes={aria} onChange={onChange} />
      </div>
      {!readOnly && (
        <Button onClick={clear} disabled={!value} style={clearButtonStyle}>
          {clearButtonText}
        </Button>
      )}
    </div>
  )
}

export const signature = define(Signature, 'RsSignature')
  .name('Signature')
  .category('fields')
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
    onChange: event,
  })
  .css({alignItems})
