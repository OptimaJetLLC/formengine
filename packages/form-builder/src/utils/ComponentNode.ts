import {ComponentStore, Model, Store} from 'fb-core'
import {BuilderView, Meta} from '../features/define'

export class ComponentNode {
  readonly key: string
  readonly parent?: ComponentNode
  readonly children?: ComponentNode[]
  readonly data: ComponentStore
  readonly model: Model
  readonly meta: Meta

  constructor(store: Store, data: ComponentStore, parent?: ComponentNode) {
    this.key = data.key
    this.data = data
    this.parent = parent
    this.model = store.props.view.get(data.type)
    this.meta = (store.props.view as BuilderView).getMeta(data.type)
    this.children = data.children?.map(child => new ComponentNode(store, child, this))
  }
}
