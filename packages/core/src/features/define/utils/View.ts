import {buildInternalErrorModel, internalErrorModel} from '../../ui/internalErrorModel'
import {screenModel} from '../../ui/screenModel'
import {slotModel} from '../../ui/slotModel'
import {createTemplateModel} from '../../ui/templateModel'
import {errorMessageModel} from '../../validation/components/DefaultErrorMessage'
import {Model} from './Model'

export class View {
  #modelMap = new Map<string, Model>()
  #error?: Model
  #tooltips = new Map<string, Model>()
  #templateMap = new Map<string, Model>()

  get error() {
    return this.#error || errorMessageModel
  }

  get tooltips() {
    return Array.from(this.#tooltips.keys())
  }

  static create(...models: Model[]) {
    return new View(models)
  }

  withTemplates(templates: string[]): this {
    templates.forEach(name => {
      const model = createTemplateModel(name)
      this.define(model)
      this.#templateMap.set(model.type, model)
    })
    return this
  }

  constructor(models: Model[] = []) {
    this.define(screenModel)
    this.define(internalErrorModel)
    this.define(slotModel)
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
    return buildInternalErrorModel(`Type '${type}' is not found!`)
  }

  all() {
    return [...this.#modelMap.values()]
  }

  templates() {
    return [...this.#templateMap.values()]
  }
}

export const createView = View.create
