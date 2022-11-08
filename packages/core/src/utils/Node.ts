import {Model} from '../features/define'
import {ComponentStore} from '../stores/ComponentStore'
import {Store} from '../stores/Store'

export class Node {
  readonly key: string
  readonly parent?: Node
  readonly children?: Node[]
  readonly data: ComponentStore
  readonly model: Model<any>

  constructor(store: Store, data: ComponentStore, parent?: Node) {
    this.key = data.key
    this.data = data
    this.parent = parent
    this.model = store.props.view.getModel(data)
    this.children = data.children?.map(child => new Node(store, child, this))
  }
}
