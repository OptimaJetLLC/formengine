import {ComponentStore} from '../../../stores/ComponentStore'
import {fbScreen} from '../../ui/FbScreen'
import {defaultErrorMessage, ErrorMessageProps} from '../../validation/components/ErrorMessage'
import {Definition} from '../index'

export class View {
  #map = new Map<string, Definition<any>>()
  #error?: Definition<ErrorMessageProps>

  constructor(defines: Definition<any>[] = []) {
    this.define(fbScreen)
    defines.forEach(this.define.bind(this))
  }

  get error() {
    return this.#error || defaultErrorMessage
  }

  static create<U extends Definition<any>>(...defines: U[]) {
    return new View(defines)
  }

  withError(definition: Definition<ErrorMessageProps>) {
    this.#error = definition
    return this
  }

  define(definition: Definition<any>) {
    this.#map.set(definition.type, definition)
  }

  get(type: string): Definition<any> {
    const result = this.#map.get(type)
    if (result) return result
    throw new Error(`The ${type} is not found!`)
  }

  initModel(store: ComponentStore) {
    return this.get(store.type).init(store)
  }

  all() {
    return [...this.#map.values()]
  }
}

export const createView = View.create
