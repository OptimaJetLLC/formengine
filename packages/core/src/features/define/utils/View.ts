import {slotModel} from '../../template'
import {internalErrorModel} from '../../ui/internalErrorModel'
import {screenModel} from '../../ui/screenModel'
import {Model} from './Model'

/**
 * Represents all the metadata of the form viewer components.
 */
export class View {
  #modelMap = new Map<string, Model>()

  /**
   * Static wrapper for the {@link View} constructor.
   * @param models the components metadata.
   * @returns the {@link View} instance.
   */
  static create(...models: Model[]) {
    return new View(models)
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
    const result = this.find(type)
    if (result) return result
    throw new Error(`Type '${type}' is not found!`)
  }

  /**
   * Returns the component's metadata for the form viewer for the specified type.
   * @param type the component type.
   * @returns the component metadata for the form viewer for the specified type or undefined.
   */
  find(type: string) {
    return this.#modelMap.get(type)
  }

  /**
   * @returns all component metadata for the form viewer.
   */
  all() {
    return [...this.#modelMap.values()]
  }
}

export const createView = View.create
