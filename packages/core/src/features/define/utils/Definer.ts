import type {CSSObject} from '@emotion/serialize/dist/declarations/types'
import type {ComponentType, ReactNode} from 'react'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {modules} from '../constants'
import type {ActionsInitializer, Annotations} from '../types'
import type {BuilderComponent} from './BuilderComponent'
import {Meta} from './Meta'
import {Model} from './Model'
import {toArray} from './toArray'

/**
 * Definer class data.
 */
export type DefinerData<T extends object> = {
  /**
   * The React component.
   */
  readonly component: ComponentType<T>,
  /**
   * The component name.
   */
  name?: string,
  /**
   * The component category.
   */
  category?: string,
  /**
   * The CSS metadata.
   */
  cssObject?: Annotations<CSSObject>,
  /**
   * The component icon.
   */
  icon?: ComponentType,
  /**
   * The function that initializes an actions on a component (for internal use only).
   */
  readonly actionsInitializer?: ActionsInitializer,
  /**
   * The property metadata.
   */
  properties?: Annotations<T>,
  /**
   * The custom component to display in the component list (unused).
   */
  customPreview?: ReactNode,
}

/**
 * The builder class to define the metadata of the form builder component.
 */
export class Definer<T extends object> {
  data: DefinerData<T>

  /**
   * Static method to create an instance of the component's metadata builder class.
   * @param component the React component.
   * @param displayName the display name for the anonymous component.
   * @returns the instance of the {@link Definer} class.
   */
  static define<T extends object>(component: ComponentType<T>, displayName?: string) {
    const name = displayName ?? component.displayName ?? component.name
    if (!name) throw Error('Anonymous components are not allowed!')
    const definer = new Definer<T>(component)
    if (displayName) definer.type(displayName)
    return definer
  }

  private constructor(component: ComponentType<T>) {
    this.data = {component}
  }

  name = (name: string) => this.#updateWith({name})

  icon = (icon: ComponentType) => this.#updateWith({icon})

  category = (category: string) => this.#updateWith({category})

  type = (type: string) => {
    this.data.component.displayName = type
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
    return this.data.component.displayName || this.data.component.name
  }

  /**
   * Creates component metadata for the form builder and form viewer.
   * @returns component metadata for the form builder and form viewer.
   */
  build(): BuilderComponent {
    const propAns = toArray(this.data.properties)
    const cssAns = toArray(this.data.cssObject, {annotationType: 'Style', calculable: false})
    const valuedAnnotations = propAns.filter(an => an.valued === true)
    const firstValuedAn = valuedAnnotations[0]
    if (valuedAnnotations.length > 1) {
      console.warn('Several annotations with the "valued" property were found.' +
        ' There should be only one "valued" property in the component description!' +
        ` The annotation with the key "${valuedAnnotations[0].key}" will be used.`)
    }
    const valuedAn = firstValuedAn ?? propAns.find(an => an.name === 'value')

    const model = new Model(
      this.data.component,
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
