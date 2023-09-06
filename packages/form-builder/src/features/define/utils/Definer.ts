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
  cssObject?: Annotations<CSSObject>,
  icon?: ComponentType,
  readonly actionsInitializer?: ActionsInitializer,

  properties?: Annotations<T>,
  customPreview?: ReactNode,
}

//TODO forwarding properties to the initializer of actions.
/**
 * The builder class to define the metadata of the form builder component.
 */
export class Definer<T extends object> {
  data: DefinerData<T>

  /**
   * Static method to create an instance of the component's metadata builder class.
   * @param view the React component type.
   * @param displayName the display name for the anonymous component.
   * @returns the instance of the {@link Definer} class.
   */
  static define<T extends object>(view: ComponentType<T>, displayName?: string) {
    const name = displayName ?? view.displayName ?? view.name
    if (!name) throw Error('Anonymous components are not allowed!')
    const definer = new Definer<T>(view)
    if (displayName) definer.type(displayName)
    return definer
  }

  private constructor(view: ComponentType<T>) {
    this.data = {view}
  }

  name = (name: string) => this.#updateWith({name})

  icon = (icon: ComponentType) => this.#updateWith({icon})

  category = (category: string) => this.#updateWith({category})

  type = (type: string) => {
    this.data.view.displayName = type
    return this
  }

  props = (properties: Annotations<T>) => this.#updateWith({properties})

  css = (css: Annotations<CSSObject>): Definer<T> => this.#updateWith({cssObject: css})

  actions = (fn: ActionsInitializer) => this.#updateWith({actionsInitializer: fn})

  preview = (customPreview: ReactNode) => this.#updateWith({customPreview})

  /**
   * @returns the component type name.
   */
  getType(): string {
    return this.data.view.displayName || this.data.view.name
  }

  /**
   * Creates component metadata for the form builder and form viewer.
   * @returns component metadata for the form builder and form viewer.
   */
  build(): BuilderComponent {
    const propAns = toArray(this.data.properties)
    const cssAns = toArray(this.data.cssObject, {annotationType: 'Style', calculable: false})
    const valuedAn = propAns.find(an => Boolean(an.valued)) ?? propAns.find(an => an.name === 'value')

    const model = new Model(
      this.data.view,
      this.data.name || this.getType(),
      this.data.actionsInitializer,
      valuedAn?.key,
      valuedAn?.type,
      getDefault(propAns),
      {any: {object: getDefault(cssAns)}},
      this.getType(),
      this.data.icon
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

  /**
   * Modifies the component's metadata builder with custom options.
   * @param opts the custom options.
   * @returns the modified instance of the builder.
   */
  #updateWith(opts: Partial<DefinerData<T>>): Definer<T> {
    Object.assign(this.data, opts)
    return this
  }
}

export const define = Definer.define

function getDefault(annotations: Annotation[]): Readonly<Record<string, any>> {
  return annotations.reduce((props, an) => {
    props[an.key] = an.default
    return props
  }, {} as Record<string, any>)
}
