import {ComponentType} from 'react'
import {ComponentDefinition, PropertyAnnotations} from '../types'
import {PropertyAnnotationBuilders} from './PropertyAnnotationBuilder'

export class ComponentDefinitionBuilder<T extends object> {
  typeName: string
  properties?: PropertyAnnotationBuilders<T>

  private constructor(readonly view: ComponentType<T>) {
    const typeName = view.displayName || view.name
    if (!typeName) {
      throw Error('Component must be named!')
    }
    this.typeName = typeName
  }

  static defineView<T extends object>(view: ComponentType<T>) {
    return new ComponentDefinitionBuilder<T>(view)
  }

  props = (properties: PropertyAnnotationBuilders<T>) => this.#with({properties})

  typed = (typeName: string) => this.#with({typeName})

  build() {
    return {
      typeName: this.typeName,
      view: this.view,
      props: this.#buildProps()
    } as ComponentDefinition<T>
  }

  #with(value: Partial<ComponentDefinitionBuilder<T>>) {
    return Object.assign(this, value)
  }

  #buildProps() {
    const result = {} as PropertyAnnotations<T>
    if (!this.properties) return result

    let key: keyof typeof this.properties
    for (key in this.properties) {
      const property = this.properties[key]
      result[key] = property.build(key)
    }
    return result
  }
}

export const defineView = ComponentDefinitionBuilder.defineView
