import {generateTemplateTypeName, slotModel, View} from '@react-form-builder/core'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {internalErrorMeta} from '../../components/internalErrorMeta'
import {screenMeta} from '../../components/screenMeta'
import {createTemplateMeta, slotMeta} from '../../template'
import {errorMessageMeta} from '../../validation/errorMessageMeta'
import {BuilderComponent} from './BuilderComponent'
import {Meta} from './Meta'

// todo to translation
const templatesCategoryName = 'Templates'

/**
 * Represents all the metadata of the form builder components.
 */
export class BuilderView extends View {
  #metaMap = new Map<string, Meta>()
  #tooltipsMeta = new Map<string, Meta>()
  errorMeta = errorMessageMeta

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
   * Sets the metadata of the component that displays the form's tooltips.
   * @param builderComponent the metadata of the component that displays the form's tooltips.
   * @returns the instance of the {@link BuilderView} class.
   */
  withTooltipMeta(builderComponent: BuilderComponent): this {
    const {model, meta} = builderComponent
    super.withTooltip(model)
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
    super.withError(model)
    this.errorMeta = meta
    return this
  }

  /**
   * Creates metadata for the form builder for templates from the specified template names.
   * @param templates the array of template names.
   * @returns the instance of the {@link BuilderView} class.
   */
  withTemplates(templates: string[]): this {
    super.withTemplates(templates)
    templates.forEach(name => {
      const meta = createTemplateMeta(name)
      this.#metaMap.set(meta.type, meta)

      const typeName = generateTemplateTypeName(name)
      const model = this.get(typeName)

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
