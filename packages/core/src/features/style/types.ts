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

export type Style = {
  styles?: Record<string, string>
  cssStyles?: StyleItem[]
  cssBlock?: string
}
