import type {AriaAttributesIds} from '@react-form-builder/core'
import {forwardRef} from '@react-form-builder/core'
import {useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react'
import VanillaSignaturePad from 'signature_pad'
import type {SignatureProps} from './SignatureProps'

/**
 * The Signature component reference type.
 */
export type SignaturePadHandle = {
  clear(): void
}

/**
 * The internal Signature pad properties.
 */
export interface SignaturePadProps extends SignatureProps {
  /**
   * The 'aria' attributes for internal Signature pad.
   */
  ariaAttributes: AriaAttributesIds
}

const withDefaultProps = ({lineWidth = 1.5, ...props}: SignatureProps) => {
  return {
    velocityFilterWeight: 0.7,
    minWidth: lineWidth > 0.5 ? lineWidth - 0.5 : lineWidth,
    maxWidth: lineWidth + 0.5,
    minDistance: 5,
    dotSize: lineWidth,
    throttle: 16,
    penColor: 'black',
    backgroundColor: 'transparent',
    ...props
  }
}

export const SignaturePad = forwardRef<SignaturePadHandle, SignaturePadProps>((props, ref) => {
  const {
    value,
    width = 300,
    height = 150,
    className,
    onChange,
    backgroundColor,
    readOnly,
    ariaAttributes,
    ...padProps
  } = props

  const initialValue = useRef(value)
  const initialPadProps = useRef(padProps)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const signPadRef = useRef<VanillaSignaturePad>(null)
  const clear = useCallback(() => signPadRef.current?.clear(), [])
  const [vanillaSignaturePad, setVanillaSignaturePad] = useState<VanillaSignaturePad>()

  useImperativeHandle(ref, () => ({clear}), [clear])

  useEffect(() => {
    if (!canvasRef.current) return

    const pad = new VanillaSignaturePad(canvasRef.current, withDefaultProps(initialPadProps.current))
    if (initialValue.current) {
      const ratio = Math.max(window.devicePixelRatio ?? 1, 1)
      const options = {ratio, width, height}
      pad.fromDataURL(initialValue.current, options).catch(console.error)
    }
    pad.addEventListener('endStroke', () => onChange?.(pad.toDataURL()))
    pad.on()

    setVanillaSignaturePad(pad)

    signPadRef.current = pad

    return () => pad.off()
  }, [onChange, width, height])

  useEffect(() => {
    if (readOnly) {
      vanillaSignaturePad?.off()
      return
    }
    vanillaSignaturePad?.on()

    return () => vanillaSignaturePad?.off()
  }, [readOnly, vanillaSignaturePad])

  const canvasStyle = useMemo(() => ({borderRadius: 6, backgroundColor}),
    [backgroundColor])

  return <canvas ref={canvasRef} className={className} width={width} height={height} style={canvasStyle}
                 id={padProps.id} {...ariaAttributes}/>
})
