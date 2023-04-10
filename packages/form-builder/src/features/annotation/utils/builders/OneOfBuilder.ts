import {QuantifierBuilder} from './QuantifierBuilder'

export class OneOfBuilder<T> extends QuantifierBuilder<T> {
  radio() {
    return this.setup({editor: 'radio'})
  }

  default(value: T): this {
    return super.default(value)
  }
}
