import {Meta} from './Meta'
import {Model} from './Model'

/**
 * Description of the React component that connects to the form builder.
 * Contains metadata for the form builder and metadata for the form viewer.
 */
export interface BuilderComponent {
  readonly meta: Meta
  readonly model: Model
  readonly category?: string
}
