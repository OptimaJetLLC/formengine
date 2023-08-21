import {PersistedForm} from '@react-form-builder/core'
import {assign} from 'lodash-es'
import agreement from '../../forms/agreement.json'
import SampleForm from '../../forms/SampleForm.json'
import template from '../../forms/template.json'

const forms: Record<string, any> = {
  SampleForm,
  template,
  agreement
}

export const initialForms = {
  SampleForm: JSON.stringify(SampleForm)
}

export function getFormFromJson(name?: string) {
  if (name && forms[name]) return assign({}, forms[name]) as PersistedForm
  throw new Error(`Unable to load form '${name}'`)
}
