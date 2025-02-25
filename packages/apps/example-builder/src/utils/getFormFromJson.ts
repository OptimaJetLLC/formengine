import agreement from '../../forms/agreement.json'
import SampleForm from '../../forms/SampleForm.json'
import template from '../../forms/template.json'

const forms: Record<string, any> = {
  SampleForm,
  template,
  agreement
}

export const initialForms: Record<string, string> = {}

Object.entries(forms)
  .forEach(([key, value]) => initialForms[key] = JSON.stringify(value))

/**
 * Returns the form from json.
 * @param name the name of the form.
 * @returns the form.
 */
export function getFormFromJson(name?: string) {
  if (name && initialForms[name]) return initialForms[name]
  throw new Error(`Unable to load form '${name}'`)
}
