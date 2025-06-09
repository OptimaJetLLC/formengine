import SampleForm from '../../forms/SampleForm.json'

export const initialForms: Record<string, string> = {
  SampleForm: JSON.stringify(SampleForm)
}

/**
 * Returns the form from json.
 * @param name the name of the form.
 * @returns the form.
 */
export function getFormFromJson(name?: string) {
  if (name && initialForms[name]) return initialForms[name]
  throw new Error(`Unable to load form '${name}'`)
}
