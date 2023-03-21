import {CSSObject} from '@emotion/react'

export type StyleItem = {
  name?: string,
  value?: string
}

type Measure = string | ((value: any) => string | undefined)

export type Measured = {
  value?: any,
  measure: string
}

export type StandardStyleItem = Record<string, { cssName: string, measure?: Measure }>

export type Styles = {
  cssObject?: CSSObject
  cssString?: string
  any?: string
  mobile?: string
  tablet?: string
  desktop?: string
  additional?: StyleItem[]
}
