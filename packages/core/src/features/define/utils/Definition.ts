import {forIn, startCase, transform} from 'lodash'
import {ComponentType, ReactNode} from 'react'
import {ComponentStore} from '../../../stores/ComponentStore'
import {isFunction} from '../../../utils'
import {htmlAttributes, key, string, style, validation} from '../../annotation'
import {Annotations} from '../../annotation/types'
import {Annotation} from '../../annotation/utils/annotations/Annotation'
import {defineAction} from '../../event/defineAction'
import {ActionDefinition, ActionEventHandler} from '../../event/types'
import {ActionsInitializer} from '../types'
import {Model} from './Model'

//TODO проброс пропертей в инициализатор экшенов.
//TODO rename
export class Definition<T extends object> {
  readonly #name?: string

  private constructor(
    readonly view: ComponentType<T>,
    name?: string,
    readonly properties?: Annotations<T>,
    readonly actionsInitializer?: ActionsInitializer,
    readonly hint?: string,
    readonly customPreview?: ReactNode,
  ) {
    this.#name = name
  }

  get name() {
    return this.#name ?? this.type
  }

  get type(): string {
    return this.view.displayName || this.view.name
  }

  typed = (displayName: string) => {
    this.view.displayName = displayName
    return this
  }

  static define<T extends object, U>(view: ComponentType<T>) {
    checkExistName()
    return new Definition<T>(view)


    function checkExistName() {
      const name = view.displayName || view.name
      if (!name) {
        throw Error('Component must be named!')
      }
    }
  }

  named = (name: string) => this.#cloneWith({name})

  props = (properties: Annotations<T>) => this.#cloneWith({properties})

  actions = (fn: ActionsInitializer) => this.#cloneWith({actionsInitializer: fn})

  hinted = (hint: string) => this.#cloneWith({hint})

  preview = (customPreview: ReactNode) => this.#cloneWith({customPreview})

  init(store: ComponentStore) {
    return new Model(
      this.view,
      initProperties(this.properties),
      this.#name,
      initActions(this.actionsInitializer?.(store.props, defineAction)),
      this.hint,
      this.customPreview
    )

    function initProperties(annotations?: Annotations<T>) {
      if (!annotations) return []

      const properties: Annotation[] = [
        key.build('key'),
        htmlAttributes.build('htmlAttributes'),
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
      opts.customPreview || this.customPreview,
    )
  }
}
