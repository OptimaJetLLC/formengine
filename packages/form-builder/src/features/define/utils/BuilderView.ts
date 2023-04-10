import {Model, View} from 'fb-core'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {screenMeta} from '../../components/screenMeta'
import {Meta} from './Meta'

export class BuilderView extends View {
  #metaMap = new Map<string, Meta>()
  #tooltipsMeta = new Map<string, Meta>()

  getMeta(type: string) {
    const result = this.#metaMap.get(type)
    if (result) return result
    throw new Error(`The ${type} is not found!`)
  }

  getTooltipAnnotations(name: string): Annotation[] | undefined {
    return this.#tooltipsMeta.get(name)?.properties
  }

  withTooltipMeta(tuple: Readonly<[Model, Meta]>): this {
    const [model, meta] = tuple
    super.withTooltip(model)
    this.#tooltipsMeta.set(model.type, meta)
    return this
  }

  withErrorMeta(tuple: Readonly<[Model, Meta]>): this {
    const [model, meta] = tuple
    super.withError(model)
    //this.#errorMeta.set(model.type, meta)
    return this
  }

  constructor(models: Model[], metas: Meta[]) {
    super(models)
    this.#metaMap.set(screenMeta.type, screenMeta)

    metas.forEach(meta => {
      this.#metaMap.set(meta.type, meta)
    })
  }
}
