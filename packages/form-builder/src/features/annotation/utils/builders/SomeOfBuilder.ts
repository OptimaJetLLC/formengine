import {QuantifierBuilder} from './QuantifierBuilder'

export class SomeOfBuilder<T> extends QuantifierBuilder<T> {
  default(value: T[]): this {
    return super.default(value)
  }
}
