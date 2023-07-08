import {CSSObject} from '@emotion/react'

type Measure = string | ((value: any) => string | undefined)

export type StandardStyleItem = Record<string, { cssName: string, measure?: Measure }>

export type Css = {
  object?: CSSObject
  string?: string

  any?: string
  mobile?: string
  tablet?: string
  desktop?: string
}
