import {RadioInput} from '../../components/RadioInput'
import {QuantifierBuilder} from './QuantifierBuilder'

export class OneOfBuilder<T> extends QuantifierBuilder<T> {
  radio() {
    return this.setup({editor: RadioInput})
  }

  default(value: T): this {
    return super.default(value)
  }
}
