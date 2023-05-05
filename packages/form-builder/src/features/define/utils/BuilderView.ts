import {View} from 'fb-core'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {internalErrorMeta} from '../../components/internalErrorMeta'
import {screenMeta} from '../../components/screenMeta'
import {BuilderComponent} from './BuilderComponent'
import {Meta} from './Meta'

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

  constructor(public builderComponents: BuilderComponent[]) {
    super(builderComponents.map(({model}) => model))
    const metas = builderComponents.map(({meta}) => meta)
    this.#metaMap.set(screenMeta.type, screenMeta)
    this.#metaMap.set(internalErrorMeta.type, internalErrorMeta)

    metas.forEach(meta => {
      this.#metaMap.set(meta.type, meta)
    })
  }
}
