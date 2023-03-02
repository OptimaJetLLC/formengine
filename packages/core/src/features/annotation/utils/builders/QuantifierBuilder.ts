import {startCase} from 'lodash'
import {Annotation} from '../annotations/Annotation'
import {PropertyAn} from '../annotations/PropertyAn'
import {SchemedBuilder} from './SchemedBuilder'

export abstract class QuantifierBuilder<T> extends SchemedBuilder<T> {
  values!: (string | number)[]
  labels?: string[]

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

  get required(): this {
    return super.required as this
  }
}
