import {ComponentType} from 'react'
import {ActionDefinition} from '../../event/types'
import {Annotation} from "../../annotation/utils/annotations/Annotation";

export class Model<T> {
  readonly #name?: string

  get name() {
    return this.#name ?? this.type
  }

  get type() {
    return this.view.displayName || this.view.name
  }

  constructor(
    readonly view: ComponentType<T>,
    readonly properties: Annotation[],
    name?: string,
    readonly actions?: ActionDefinition[],
    readonly hint?: string,
  ) {
    this.#name = name
  }
}
