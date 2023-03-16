import {ComponentStore} from '../../../stores/ComponentStore'
import {WrapperProps} from '../../../utils/types'
import {fbScreen} from '../../ui/FbScreen'
import {defaultErrorMessage, ErrorMessageProps} from '../../validation/components/ErrorMessage'
import {Annotations, Definition} from './Definition'

export class View {
  #map = new Map<string, Definition<any>>()
  #error?: Definition<ErrorMessageProps>
  #tooltips = new Map<string, Definition<any>>()

  constructor(defines: Definition<any>[] = []) {
    this.define(fbScreen)
    defines.forEach(this.define.bind(this))
  }

  get error() {
    return this.#error || defaultErrorMessage
  }

  get tooltips() {
    return Array.from(this.#tooltips.keys())
  }

  static create<U extends Definition<any>>(...defines: U[]) {
    return new View(defines)
  }

  getTooltipAnnotations(name: string): Annotations<any> {
    return this.#tooltips.get(name)?.properties ?? {} as Annotations<any>
  }

  getTooltipComponent(name: string): Definition<any> | undefined {
    return this.#tooltips.get(name)
  }

  withError(definition: Definition<ErrorMessageProps>) {
    this.#error = definition
    return this
  }

  withTooltip<T extends WrapperProps>(definition: Definition<T>): this {
    this.#tooltips.set(definition.name, definition)
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
