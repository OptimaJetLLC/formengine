import {ComponentStore} from 'fb-core'
import {assign} from 'lodash-es'
import SampleForm from '../../SampleForm.json'

//TODO can stringify and parse to form
export function getSampleForm() {
  return assign(new ComponentStore('', ''), SampleForm)
}
