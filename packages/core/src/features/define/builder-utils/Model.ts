import {observer} from 'mobx-react'
import {ComponentType} from 'react'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {ActionDefinition} from '../../event'

export class Model<T> {
  readonly view: ComponentType<T>
  readonly #name?: string

  constructor(
    view: ComponentType<T>,
    readonly properties: Annotation[],
    readonly style: Annotation[],
    name?: string,
    readonly actions?: ActionDefinition[],
  ) {
    this.view = observer(view)
    this.view.displayName = view.displayName || view.name
    this.#name = name
  }

  get name() {
    return this.#name ?? this.type
  }

  get type() {
    return this.view.displayName || this.view.name
  }

  get valuedAn() {
    return this.properties.find((p) => p.valued)
      ?? this.properties.find((p) => p.name === 'value')
  }
}
