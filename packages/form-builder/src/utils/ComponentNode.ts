import {ComponentStore, Model} from 'fb-core'
import {Meta} from '../features/define'
import {BuilderStore} from '../stores/BuilderStore'

export class ComponentNode {
  readonly key: string
  readonly parent?: ComponentNode
  readonly children?: ComponentNode[]
  readonly data: ComponentStore
  readonly model: Model
  readonly meta: Meta

  constructor(store: BuilderStore, data: ComponentStore, parent?: ComponentNode) {
    this.key = data.key
    this.data = data
    this.parent = parent
    this.model = store.view.get(data.type)
    this.meta = store.view.getMeta(data.type)
    this.children = data.children?.map(child => new ComponentNode(store, child, this))
  }
}
