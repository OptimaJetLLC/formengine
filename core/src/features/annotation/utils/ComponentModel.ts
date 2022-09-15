import {ComponentType} from 'react'
import {ActionDefinition} from '../../event/types'
import {Annotation} from './Annotation'

export class ComponentModel<T> {
  readonly #name?: string

  get name() {
    return this.#name ?? this.type
  }

  get type() {
    return this.view.displayName || this.view.name
  }

  constructor(
    readonly view: ComponentType<T>,
    readonly properties: Annotation<T>[],
    name?: string,
    readonly actions?: ActionDefinition[],
    readonly hint?: string,
  ) {
    this.#name = name
  }
}
