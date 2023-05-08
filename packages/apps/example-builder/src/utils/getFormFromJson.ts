import {ComponentStore} from 'fb-core'
import {assign} from 'lodash-es'
import agreement from '../../forms/agreement.json'
import SampleForm from '../../forms/SampleForm.json'
import template from '../../forms/template.json'

const forms: Record<string, any> = {
  SampleForm,
  template,
  agreement
}

//TODO can stringify and parse to form
export function getFormFromJson(name?: string): ComponentStore {
  if (name && forms[name]) return assign(new ComponentStore('', ''), forms[name])
  throw new Error(`Unable to load form '${name}'`)
}
