import {screen} from '../../../components/Screen'
import {Definition} from '../index'
import {ComponentStore} from '../../../stores/ComponentStore'

export class View {
  #map = new Map<string, Definition<any>>()

  constructor(defines: Definition<any>[] = []) {
    this.define(screen)
    defines.forEach(this.define.bind(this))
  }

  define(definition: Definition<any>) {
    this.#map.set(definition.type, definition)
  }

  get(type: string): Definition<any> {
    const result = this.#map.get(type)
    if (result) return result
    throw new Error(`The ${type} is not found!`)
  }

  getModel(store: ComponentStore) {
    return this.get(store.type).init(store)
  }

  all() {
    return [...this.#map.values()]
  }
}
