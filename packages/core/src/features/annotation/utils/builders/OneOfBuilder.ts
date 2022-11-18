import _ from 'lodash'
import {RadioButtonInput} from '../../components/RadioButtonInput'
import {Annotation} from '../annotations/Annotation'
import {Property} from '../annotations/Property'
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
    return this.setup({editor: RadioButtonInput})
  }

  build(key: string): Annotation {
    const result = super.build(key) as Property
    result.data = this.values.map((value, index) => {
      let label = this.labels?.[index] ?? _.startCase(value.toString())
      return {label, value}
    })

    return result
  }
}
