import _ from 'lodash'
import {RadioInput} from '../../components/RadioInput'
import {Annotation} from '../annotations/Annotation'
import {PropertyAn} from '../annotations/PropertyAn'
import {SchemedBuilder} from './SchemedBuilder'

export class OneOfBuilder<T> extends SchemedBuilder<T> {
  values!: (string | number)[]
  labels?: string[]

  labeled(...labels: string[]) {
    const clone = this.clone()
    clone.labels = labels
    return clone
  }

  radio() {
    return this.setup({editor: RadioInput})
  }

  build(key: string): Annotation {
    const result = super.build(key) as PropertyAn
    result.data = this.values.map((value, index) => {
      let label = this.labels?.[index] ?? _.startCase(value.toString())
      return {label, value}
    })

    return result
  }
}
