import {forwardRef} from '@react-form-builder/core'
import type {ComponentPropsWithoutRef, CSSProperties} from 'react'
import {useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react'
import VanillaSignaturePad from 'signature_pad'

/**
 * The Signature component reference type.
 */
export type SignaturePadHandle = {
  clear(): void
}

/**
 * The Signature pad properties.
 */
export interface SignaturePadProps
  extends Omit<ComponentPropsWithoutRef<'canvas'>, 'width' | 'height' | 'onChange'> {
  /**
   * The initial data URL for drawing the signature image.
   */
  value?: string

  /**
   * The canvas width.
   * @default 300
   */
  width?: number

  /**
   * The canvas height.
   * @default 150
   */
  height?: number

  /**
   * The line width.
   * @default 1.5
   */
  lineWidth?: number

  /**
   * Triggered after stroke update.
   */
  onChange?: (value?: string) => void

  /**
   * The pen color.
   */
  penColor?: CSSProperties['fill']

  /**
   * The background color.
   */
  backgroundColor?: CSSProperties['fill']

  /**
   * Flag, if true - the component is running in read-only mode.
   */
  readOnly?: boolean
}

const withDefaultProps = ({lineWidth = 1.5, ...props}: SignaturePadProps) => {
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

  return <canvas ref={canvasRef} className={className} width={width} height={height} style={canvasStyle}/>
})
