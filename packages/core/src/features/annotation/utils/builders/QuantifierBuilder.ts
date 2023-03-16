import {startCase} from 'lodash-es'
import {Annotation} from '../../types/annotations/Annotation'
import {PropertyAn} from '../../types/annotations/PropertyAn'
import {SchemedBuilder} from './SchemedBuilder'

export abstract class QuantifierBuilder<T> extends SchemedBuilder<T> {
  values!: (string | number)[]
  labels?: string[]

  get required(): this {
    return super.required as this
  }

  labeled(...labels: string[]) {
    const clone = this.clone()
    clone.labels = labels
    return clone
  }

  build(key: string): Annotation {
    const result = super.build(key) as PropertyAn
    result.data = this.values.map((value, index) => {
      const label = this.labels?.[index] ?? startCase(value.toString())
      return {label, value}
    })

    return result
  }

  default(value: T | T[]): this {
    return this.setup({schema: this.annotation.schema?.default(value)})
  }
}
