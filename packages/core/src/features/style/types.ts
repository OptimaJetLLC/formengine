import {CSSObject} from '@emotion/react'

/**
 * CSS styles for a device.
 */
export type DeviceStyle = {
  object?: CSSObject
  string?: string
}

/**
 * The type for the CSS property of a React component.
 */
export type Css = {
  any?: DeviceStyle
  mobile?: DeviceStyle
  tablet?: DeviceStyle
  desktop?: DeviceStyle
}
