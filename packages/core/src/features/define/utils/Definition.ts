import {ComponentType} from 'react'
import {Annotation} from '../../annotation/utils/annotations/Annotation'
import {ActionsInitializer} from '../types'
import {ActionDefinition, ActionEventHandler} from '../../event/types'
import {Annotations} from '../../annotation/types'
import {defineAction} from '../../event/defineAction'
import {ComponentStore} from '../../../stores/ComponentStore'
import {key, string, style, validation} from '../../annotation'
import {forIn, startCase, transform} from 'lodash'
import {isFunction} from '../../../utils'
import {Model} from './Model'

//TODO проброс пропертей в инициализатор экшенов.
//TODO rename
export class Definition<T extends object> {
  readonly #name?: string

  get name() {
    return this.#name ?? this.type
  }

  get type(): string {
    return this.view.displayName || this.view.name
  }

  private constructor(
    readonly view: ComponentType<T>,
    name?: string,
    readonly properties?: Annotations<T>,
    readonly actionsInitializer?: ActionsInitializer,
    readonly hint?: string,
  ) {
    this.#name = name
  }

  named = (name: string) => this.#cloneWith({name})
  props = (properties: Annotations<T>) => this.#cloneWith({properties})
  actions = (fn: ActionsInitializer) => this.#cloneWith({actionsInitializer: fn})
  hinted = (hint: string) => this.#cloneWith({hint})

  static define<T extends object>(view: ComponentType<T>) {
    checkExistName()
    return new Definition<T>(view)


    function checkExistName() {
      const name = view.displayName || view.name
      if (!name) {
        throw Error('Component must be named!')
      }
    }
  }

  init(store: ComponentStore) {
    return new Model(
      this.view,
      initProperties(this.properties),
      this.#name,
      initActions(this.actionsInitializer?.(store.props, defineAction)),
      this.hint,
    )


    function initProperties(annotations?: Annotations<T>) {
      if (!annotations) return []

      const properties: Annotation[] = [
        key.build('key'),
        style.build('style'),
        validation.build('validation'),
      ]

      forIn(annotations, (value, key) => properties.push(value?.build(key) ?? string.build(key)))

      return properties
    }

    function initActions(actions?: Record<string, ActionEventHandler | ActionDefinition>): ActionDefinition[] | undefined {
      if (!actions) return

      return transform(actions, (result, value, key) => {
        if (isFunction(value)) {
          result.push({
            name: startCase(key),
            func: value,
          })
          return
        }

        result.push(value)
      }, [] as ActionDefinition[])
    }
  }

  #cloneWith(opts: Partial<Definition<T>>): Definition<T> {
    return new Definition(
      opts.view || this.view,
      opts.name || this.#name,
      opts.properties || this.properties,
      opts.actionsInitializer || this.actionsInitializer,
      opts.hint || this.hint,
    )
  }
}
