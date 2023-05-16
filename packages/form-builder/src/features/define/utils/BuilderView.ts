import {generateTemplateTypeName, slotModel, View} from '@react-form-builder/core'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {internalErrorMeta} from '../../components/internalErrorMeta'
import {screenMeta} from '../../components/screenMeta'
import {slotMeta} from '../../components/slotMeta'
import {createTemplateMeta} from '../../components/templateMeta'
import {BuilderComponent} from './BuilderComponent'
import {Meta} from './Meta'

const templatesCategoryName = 'Templates'

export class BuilderView extends View {
  #metaMap = new Map<string, Meta>()
  #tooltipsMeta = new Map<string, Meta>()

  getMeta(type: string) {
    const result = this.#metaMap.get(type)
    if (result) return result
    return internalErrorMeta
  }

  getTooltipAnnotations(name: string): Annotation[] | undefined {
    return this.#tooltipsMeta.get(name)?.properties
  }

  withTooltipMeta(builderComponent: BuilderComponent): this {
    const {model, meta} = builderComponent
    super.withTooltip(model)
    this.#tooltipsMeta.set(model.type, meta)
    return this
  }

  withErrorMeta(builderComponent: BuilderComponent): this {
    const {model, meta} = builderComponent
    super.withError(model)
    //this.#errorMeta.set(model.type, meta)
    return this
  }

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
