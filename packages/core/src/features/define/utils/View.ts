import {buildInternalErrorModel, internalErrorModel} from '../../ui/internalErrorModel'
import {screenModel} from '../../ui/screenModel'
import {slotModel} from '../../ui/slotModel'
import {createTemplateModel} from '../../ui/templateModel'
import {errorMessageModel} from '../../validation/components/DefaultErrorMessage'
import {Model} from './Model'

/**
 * Represents all the metadata of the form viewer components.
 */
export class View {
  #modelMap = new Map<string, Model>()
  #error?: Model
  #tooltips = new Map<string, Model>()
  #templateMap = new Map<string, Model>()

  /**
   * @returns the component's metadata for displaying the error on the form.
   */
  get error() {
    return this.#error || errorMessageModel
  }

  /**
   * @returns the array of strings with the names of the component types of the tooltip.
   */
  get tooltips() {
    return Array.from(this.#tooltips.keys())
  }

  /**
   * Static wrapper for the {@link View} constructor.
   * @param models the components metadata.
   * @returns the {@link View} instance.
   */
  static create(...models: Model[]) {
    return new View(models)
  }

  /**
   * Creates templates metadata.
   * @param templates the array of template names.
   * @returns the {@link View} instance.
   */
  withTemplates(templates: string[]): this {
    templates.forEach(name => {
      const model = createTemplateModel(name)
      this.define(model)
      this.#templateMap.set(model.type, model)
    })
    return this
  }

  /**
   * Creates an instance of the {@link View}.
   * @param models the components metadata.
   */
  constructor(models: Model[] = []) {
    this.define(screenModel)
    this.define(internalErrorModel)
    this.define(slotModel)
    models.forEach(this.define.bind(this))
  }

  /**
   * Returns the component's metadata for displaying the tooltip.
   * @param name the name of the tooltip component type.
   * @returns the component's metadata for displaying the tooltip.
   */
  getTooltipComponent(name: string) {
    return this.#tooltips.get(name)
  }

  /**
   * Defines the component's metadata for displaying the tooltip.
   * @param model the component's metadata.
   * @returns the {@link View} instance.
   */
  withTooltip(model: Model): this {
    this.#tooltips.set(model.type, model)
    return this
  }

  /**
   * Defines the component's metadata for displaying the error on the form.
   * @param model the component's metadata.
   * @returns the {@link View} instance.
   */
  withError(model: Model) {
    this.#error = model
    return this
  }

  /**
   * Defines the component's metadata for the form viewer.
   * @param model the component's metadata.
   */
  define(model: Model) {
    this.#modelMap.set(model.type, model)
  }

  /**
   * Returns the component's metadata for the form viewer for the specified type.
   * @param type the component type.
   * @returns the component metadata for the form viewer for the specified type.
   */
  get(type: string) {
    const result = this.#modelMap.get(type)
    if (result) return result
    return buildInternalErrorModel(`Type '${type}' is not found!`)
  }

  /**
   * @returns all component metadata for the form viewer.
   */
  all() {
    return [...this.#modelMap.values()]
  }

  /**
   * @returns the templates metadata for the form viewer.
   */
  templates() {
    return [...this.#templateMap.values()]
  }
}

export const createView = View.create
