import {Annotation} from '../../annotation/types/annotations/Annotation'
import {internalErrorMeta} from '../../components/internalErrorMeta'
import {screenMeta} from '../../components/screenMeta'
import {createTemplateMeta, createTemplateModel, slotMeta, slotModel} from '../../template'
import {errorMessageMeta} from '../../validation/errorMessageMeta'
import {BuilderComponent} from './BuilderComponent'
import {Meta} from './Meta'
import {View} from './View'

// todo to translation
const templatesCategoryName = 'Templates'

/**
 * Represents all the metadata of the form builder components.
 */
export class BuilderView extends View {
  #metaMap = new Map<string, Meta>()
  #tooltipsMeta = new Map<string, Meta>()
  #errorMeta = new Map<string, Meta>([
    [errorMessageMeta.type, errorMessageMeta],
  ])

  /**
   * Returns the component metadata for the specified component type name.
   * @param type the component type name.
   * @returns the component metadata for the specified component type name.
   */
  getMeta(type: string) {
    const result = this.#metaMap.get(type)
    if (result) return result
    return internalErrorMeta
  }

  /**
   * Returns the array of metadata properties of the tooltip component.
   * @param name the name of the tooltip component type.
   * @returns the array of metadata properties of the tooltip component.
   */
  getTooltipAnnotations(name: string): Annotation[] | undefined {
    return this.#tooltipsMeta.get(name)?.properties
  }

  /**
   * Returns the array of metadata properties of the error component.
   * @param name the name of the error component type.
   * @returns the array of metadata properties of the error component.
   */
  getErrorAnnotations(name: string): Annotation[] | undefined {
    return this.#errorMeta.get(name)?.properties
  }

  /**
   * @returns the array of strings with the names of the component types of the tooltip.
   */
  get tooltips() {
    return Array.from(this.#tooltipsMeta.keys())
  }

  /**
   * @returns the array of strings with the names of the component types of the error.
   */
  get errors() {
    return Array.from(this.#errorMeta.keys())
  }

  /**
   * Sets the metadata of the component that displays the form's tooltips.
   * @param builderComponent the metadata of the component that displays the form's tooltips.
   * @returns the instance of the {@link BuilderView} class.
   */
  withTooltipMeta(builderComponent: BuilderComponent): this {
    const {model, meta} = builderComponent
    this.define(model)
    this.#tooltipsMeta.set(model.type, meta)
    return this
  }

  /**
   * Sets the metadata of the component that displays form's errors.
   * @param builderComponent the metadata of the component that displays the form's errors.
   * @returns the instance of the {@link BuilderView} class.
   */
  withErrorMeta(builderComponent: BuilderComponent): this {
    const {model, meta} = builderComponent
    this.define(model)
    this.#errorMeta.set(model.type, meta)
    return this
  }

  /**
   * Creates metadata for the form builder for templates from the specified template names.
   * @param templates the array of template names.
   * @returns the instance of the {@link BuilderView} class.
   */
  withTemplates(templates: string[]): this {
    templates.forEach(name => {
      const model = createTemplateModel(name)
      this.define(model)

      const meta = createTemplateMeta(name)
      this.#metaMap.set(meta.type, meta)

      this.builderComponents.push({meta, model, category: templatesCategoryName})
    })
    return this
  }

  /**
   * Creates metadata for form builder components.
   * @param builderComponents the array of metadata of form builder components.
   */
  constructor(public builderComponents: BuilderComponent[]) {
    super(builderComponents.map(({model}) => model))
    this.#metaMap.set(screenMeta.type, screenMeta)
    this.#metaMap.set(internalErrorMeta.type, internalErrorMeta)
    this.#metaMap.set(slotMeta.type, slotMeta)
    this.builderComponents.push({meta: slotMeta, model: slotModel, category: templatesCategoryName})

    const metas = builderComponents.map(({meta}) => meta)

    metas.forEach(meta => {
      this.#metaMap.set(meta.type, meta)
    })
  }
}
