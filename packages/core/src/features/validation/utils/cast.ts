import * as Yup from 'yup'

export const cast = (value: any, type: string) => {
  switch (type) {
    case 'number':
      return Yup.number().cast(value)
    default:
      return value
  }
}
