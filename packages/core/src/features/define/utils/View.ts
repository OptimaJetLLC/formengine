import {screenModel} from '../../ui/screenModel'
import {errorMessageModel} from '../../validation/components/ErrorMessage'
import {Model} from './Model'

export class View {
  #modelMap = new Map<string, Model>()
  #error?: Model
  #tooltips = new Map<string, Model>()

  get error() {
    return this.#error || errorMessageModel
  }

  get tooltips() {
    return Array.from(this.#tooltips.keys())
  }

  static create(...models: Model[]) {
    return new View(models)
  }

  constructor(models: Model[] = []) {
    this.define(screenModel)
    models.forEach(this.define.bind(this))
  }

  getTooltipComponent(name: string) {
    return this.#tooltips.get(name)
  }

  withTooltip(model: Model): this {
    this.#tooltips.set(model.type, model)
    return this
  }

  withError(model: Model) {
    this.#error = model
    return this
  }

  define(model: Model) {
    this.#modelMap.set(model.type, model)
  }

  get(type: string) {
    const result = this.#modelMap.get(type)
    if (result) return result
    throw new Error(`The ${type} is not found!`)
  }

  all() {
    return [...this.#modelMap.values()]
  }
}

export const createView = View.create
