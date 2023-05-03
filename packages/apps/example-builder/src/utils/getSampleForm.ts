import {ComponentStore} from 'fb-core'
import {assign} from 'lodash-es'
import SampleForm from '../../SampleForm.json'

export const sampleFormName = 'SampleForm'

//TODO can stringify and parse to form
export function getSampleForm(name?: string): ComponentStore | Promise<ComponentStore> {
  if (name === sampleFormName) return sampleComponentStore()
  return new Promise((_, reject) => {
    reject(`Failed to load form '${name}'`)
  })
}

export function sampleComponentStore() {
  return assign(new ComponentStore('', ''), SampleForm)
}
