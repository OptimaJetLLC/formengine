export interface Field {
  storeDataInParentForm?: boolean
  error?: string
  touched: boolean
  value: unknown
  valued: string
  setValue: (value: unknown) => void
  setTouched: () => void
  validate: () => void
  reset: () => void
  clear: () => void
}
