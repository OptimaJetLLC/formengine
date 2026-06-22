import {PersistedForm} from '@react-form-builder/core'

export const parseForm = (form?: string) => {
  if (!form) return
  return JSON.parse(form) as PersistedForm
}
