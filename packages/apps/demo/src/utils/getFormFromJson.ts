import SampleForm from '../../forms/SampleForm.json'

export const initialForms: Record<string, string> = {
  SampleForm: JSON.stringify(SampleForm)
}

export function getFormFromJson(name?: string) {
  if (name && initialForms[name]) return initialForms[name]
  throw new Error(`Unable to load form '${name}'`)
}
