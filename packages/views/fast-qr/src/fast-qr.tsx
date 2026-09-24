import {color, define, isUndefined, number, oneOf, string, useBuilderValue} from '@react-form-builder/core'
import init, {qr_svg, SvgOptions} from 'fast_qr/fast_qr.js'
import module from 'fast_qr/fast_qr_bg.wasm?url'
import type {RefObject} from 'react'
import {useEffect, useMemo, useRef} from 'react'
import {QrIcon} from './icon'

/**
 * The Fast QR component properties.
 */
export interface FastQrProps {
  /**
   * The QR code width.
   */
  width?: number

  /**
   * The QR code content.
   */
  content: string

  /**
   * The different possible shapes to represent modules.
   */
  shape?: number

  /**
   * The background color.
   */
  backgroundColor?: string

  /**
   * The module color.
   */
  moduleColor?: string

  /**
   * The margin.
   */
  margin?: number

  /**
   * The image, base64 or URL.
   */
  image?: string

  /**
   * The image background color.
   */
  imageBackgroundColor?: string

  /**
   * The image background shape.
   */
  imageBackgroundShape?: number

  /**
   * The image X position in module units.
   */
  imagePositionX?: number

  /**
   * The image Y position in module units.
   */
  imagePositionY?: number

  /**
   * Image size in module units.
   */
  imageSize?: number

  /**
   * Image gap in module units.
   */
  imageGap?: number

  /**
   * The error correction coding level.
   */
  errorCorrectionLevel?: number

  /**
   * The QR code version.
   */
  version?: number

  /**
   * The CSS class name.
   */
  className?: string
}

const colorPartToHex = (color: number) => {
  if (color % 1 === 0) return (color | 1 << 8).toString(16).slice(1)
  return Math.trunc((color * 255) | 1 << 8).toString(16).slice(1)
}

const rgbaColorToHex = (color?: string) => {
  if (!color) return undefined

  const index = color.indexOf(')')
  if (color.startsWith('rgba(') && index >= 0) {
    const colors = color.substring(5, index)
      .split(',')
      .map(s => s.trim())
      .map(s => Number(s))
      .map(colorPartToHex)
      .join('')
    return `#${colors}`
  }
}

type RenderQrProps = Omit<FastQrProps, 'width' | 'className'>

const renderQr = async (props: RenderQrProps, ref: RefObject<HTMLDivElement | null>) => {
  await init({module_or_path: module})

  if (!ref.current) return

  let svgOptions = new SvgOptions()
  if (props.margin) svgOptions = svgOptions.margin(props.margin)

  const backgroundColor = rgbaColorToHex(props.backgroundColor)
  if (backgroundColor) svgOptions = svgOptions.background_color(backgroundColor)

  const moduleColor = rgbaColorToHex(props.moduleColor)
  if (moduleColor) svgOptions = svgOptions.module_color(moduleColor)

  if (props.shape) svgOptions = svgOptions.shape(props.shape)
  if (props.image) svgOptions = svgOptions.image(props.image)

  const imageBackgroundColor = rgbaColorToHex(props.imageBackgroundColor)
  if (imageBackgroundColor) svgOptions = svgOptions.image_background_color(imageBackgroundColor)

  if (props.imageBackgroundShape) svgOptions = svgOptions.image_background_shape(props.imageBackgroundShape)
  if (!isUndefined(props.imageSize)) {
    svgOptions = svgOptions.image_size(props.imageSize)
  }
  if (!isUndefined(props.imageGap)) {
    svgOptions = svgOptions.image_gap(props.imageGap)
  }
  if (props.imagePositionX && props.imagePositionY) {
    const position = new Float64Array([props.imagePositionX, props.imagePositionY])
    svgOptions = svgOptions.image_position(position)
  }

  if (props.errorCorrectionLevel) svgOptions = svgOptions.ecl(props.errorCorrectionLevel)
  if (props.version) svgOptions = svgOptions.version(props.version)

  ref.current.innerHTML = qr_svg(props.content, svgOptions)
}

const defaultContent = 'https://formengine.io'

const FastQr = ({
                  backgroundColor,
                  className,
                  content,
                  errorCorrectionLevel,
                  image,
                  imageBackgroundColor,
                  imageBackgroundShape,
                  imageGap,
                  imagePositionX,
                  imagePositionY,
                  imageSize,
                  margin,
                  moduleColor,
                  shape,
                  version,
                  width,
                  ...rest
                }: FastQrProps) => {

  const ref = useRef<HTMLDivElement>(null)

  const data = useBuilderValue(content, defaultContent)

  useEffect(() => {
    // construct a plain object to avoid capturing props
    const qrProps: RenderQrProps = {
      backgroundColor,
      content: data,
      errorCorrectionLevel,
      image,
      imageBackgroundColor,
      imageBackgroundShape,
      imageGap,
      imagePositionX,
      imagePositionY,
      imageSize,
      margin,
      moduleColor,
      shape,
      version
    }

    if (!data) return

    renderQr(qrProps, ref).catch(console.error)
  }, [backgroundColor, data, errorCorrectionLevel, image, imageBackgroundColor, imageBackgroundShape, imageGap,
    imagePositionX, imagePositionY, imageSize, margin, moduleColor, shape, version])

  const divStyle = useMemo(() => ({width} as const), [width])

  if (!data) return null

  return <div {...rest} className={className} style={divStyle} ref={ref}></div>
}

const nonNegNumber = number.withEditorProps({min: 0})

export const fastQr = define(FastQr, 'FastQR')
  .name('QR Code')
  .category('static')
  .icon(QrIcon)
  .props({
    width: nonNegNumber.default(300),
    content: string.default(defaultContent).dataBound,
    moduleColor: color,
    shape: oneOf(0, 1, 2, 3, 4, 5).default(0)
      .labeled('Square', 'Circle', 'RoundedSquare', 'Vertical', 'Horizontal', 'Diamond')
      .withEditorProps({creatable: false}),
    errorCorrectionLevel: oneOf(0, 1, 2, 3).default(0)
      .labeled('Low, 7%', 'Medium, 15%', 'Quartile, 25%', 'High, 30%')
      .withEditorProps({creatable: false}),
    version: number.withEditorProps({min: 0, max: 39}),
    image: string,
    imageBackgroundColor: color,
    imageBackgroundShape: oneOf(0, 1, 2).default(0)
      .labeled('Square', 'Circle', 'RoundedSquare')
      .withEditorProps({creatable: false}),
  })
