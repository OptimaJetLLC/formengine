import {Model} from 'fb-core'
import {Meta} from './Meta'

export interface BuilderComponent {
  readonly meta: Meta
  readonly model: Model
  readonly category?: string
}
