import {observer} from 'mobx-react'
import {ComponentType, ReactNode} from 'react'
import {Annotation} from '../../annotation/utils/annotations/Annotation'
import {ActionDefinition} from '../../event/actionDefinition'

export class Model<T> {
  readonly #name?: string
  readonly view: ComponentType<T>

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
}
