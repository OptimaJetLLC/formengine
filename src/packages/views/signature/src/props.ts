import {number, oneOf, readOnly as readOnlyProp} from '@react-form-builder/core'

export const alignItems = oneOf('start', 'center', 'end')
  .default('start')
  .radio()

export const nonNegNumber = number.withEditorProps({min: 0})

export const readOnly = readOnlyProp.hinted('Read only component').default(false)
