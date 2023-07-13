import {CSSObject} from '@emotion/react'

type Measure = string | ((value: any) => string | undefined)

/**
 * The type for a standard CSS component property.
 */
export type StandardStyleItem = Record<string, { cssName: string, measure?: Measure }>

/**
 * The type for the CSS property of a React component.
 */
export type Css = {
  object?: CSSObject
  string?: string
  className?: string

  any?: string
  mobile?: string
  tablet?: string
  desktop?: string
}
