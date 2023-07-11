import type {CSSObject} from '@emotion/serialize/dist/declarations/types'
import {ActionsInitializer, Model} from '@react-form-builder/core'
import {ComponentType, ReactNode} from 'react'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {modules} from '../constants'
import type {Annotations} from '../types'
import {BuilderComponent} from './BuilderComponent'
import {Meta} from './Meta'
import {toArray} from './toArray'

type DefinerData<T extends object> = {
  readonly view: ComponentType<T>,
  name?: string,
  category?: string,
  cssString?: string,
  cssObject?: Annotations<CSSObject>,
  readonly actionsInitializer?: ActionsInitializer,

  properties?: Annotations<T>,
  customPreview?: ReactNode,
}

//TODO проброс пропертей в инициализатор экшенов.
export class Definer<T extends object> {
  data: DefinerData<T>

  static define<T extends object>(view: ComponentType<T>) {
    checkExistName()
    return new Definer<T>(view)

    function checkExistName() {
      const name = view.displayName || view.name
      if (!name) throw Error('Anonymous components are not allowed!')
    }
  }

  private constructor(view: ComponentType<T>) {
    this.data = {view}
  }

  name = (name: string) => this.#updateWith({name})

  category = (category: string) => this.#updateWith({category})

  type = (type: string) => {
    this.data.view.displayName = type
    return this
  }

  props = (properties: Annotations<T>) => this.#updateWith({properties})

  css = (css: Annotations<CSSObject> | string): Definer<T> =>
    typeof css === 'string' ?
      this.#updateWith({cssString: css})
      : this.#updateWith({cssObject: css})

  actions = (fn: ActionsInitializer) => this.#updateWith({actionsInitializer: fn})

  preview = (customPreview: ReactNode) => this.#updateWith({customPreview})

  getType(): string {
    return this.data.view.displayName || this.data.view.name
  }

  build(): BuilderComponent {
    const propAns = toArray(this.data.properties)
    const cssAns = toArray(this.data.cssObject, {type: 'Style', calculable: false})
    const valuedAn = propAns.find(an => Boolean(an.valued)) ?? propAns.find(an => an.name === 'value')

    const model = new Model(
      this.data.view,
      this.data.name || this.getType(),
      this.data.actionsInitializer,
      valuedAn?.key,
      getDefault(propAns),
      {
        object: getDefault(cssAns),
        string: this.data.cssString
      },
    )

    const meta = new Meta(
      this.getType(),
      propAns,
      cssAns,
      modules,
      this.data.customPreview,
      valuedAn,
    )

    return {model, meta, category: this.data.category} as const
  }

  #updateWith(opts: Partial<DefinerData<T>>): Definer<T> {
    Object.assign(this.data, opts)
    return this
  }
}

export const define = Definer.define

function getDefault(annotations: Annotation[]): Readonly<Record<string, any>> {
  return annotations.reduce((props, an) => {
    props[an.key] = an.schema?.getDefault()
    return props
  }, {} as Record<string, any>)
}
