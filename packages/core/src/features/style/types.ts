export type StyleItem = {
  name?: string,
  value?: string
}
export type StandardStyleItem = Record<string, { cssName: string, measure: string | Function }>
