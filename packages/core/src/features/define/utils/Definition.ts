import {CSSObject} from '@emotion/serialize/dist/declarations/types'
import {ComponentDefinition} from 'form-viewer'
import {forIn, startCase, transform} from 'lodash'
import {ComponentType, ReactNode} from 'react'
import {ComponentStore} from '../../../stores/ComponentStore'
import {isFunction} from '../../../utils'
import {event, htmlAttributes, key, renderWhen, string, stylization, tooltipProps, validation} from '../../annotation'
import {Annotation} from '../../annotation/utils/annotations/Annotation'
import {BaseBuilder} from '../../annotation/utils/builders/BaseBuilder'
import {ActionDefinition, ActionEventHandler, defineAction, DidMountEvent, WillUnmountEvent} from '../../event'
import {ActionsInitializer} from '../types'
import {Model} from './Model'

export type Annotations<T extends object> =
  {
    [key in keyof OmitUnimportant<T>]: BaseBuilder<T[key]> | undefined
  }

/** Remove some useless property for annotation defining which we define automatics */
type OmitUnimportant<T extends object> = Omit<T, 'style' | 'className' | 'classPrefix'>

//TODO проброс пропертей в инициализатор экшенов.
//TODO rename
export class Definition<T extends object> {
  readonly #name?: string

  private constructor(
    readonly view: ComponentType<T>,
    name?: string,
    readonly properties?: Annotations<T>,
    readonly style?: Annotations<object>,
    readonly actionsInitializer?: ActionsInitializer,
    // todo the hint is not used, instead we need to create a hint component
    readonly hint?: string,
    readonly customPreview?: ReactNode,
    readonly viewedWith?: ComponentDefinition<T>,
  ) {
    this.#name = name
  }

  get name() {
    return this.#name ?? this.type
  }

  get type(): string {
    return this.viewedWith?.typeName
      || this.viewedWith?.view.displayName
      || this.viewedWith?.view.name
      || this.view.displayName
      || this.view.name
  }

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

  static defineBuilder<T extends object>(componentDefinition: ComponentDefinition<T>) {
    return Definition.define(componentDefinition.view)
      .typed(componentDefinition.typeName)
      .viewed(componentDefinition)
  }

  typed = (displayName: string) => {
    this.view.displayName = displayName
    return this
  }

  viewed = (viewedWith: ComponentDefinition<T>) => this.#cloneWith({viewedWith})

  named = (name: string) => this.#cloneWith({name})

  props = (properties: Annotations<T>) => {
    if (this.viewedWith?.props) {
      const viewProps = this.viewedWith?.props
      let key: keyof typeof properties
      for (key in properties) {
        const annotation = properties[key]?.annotation
        const viewProp = viewProps[key]
        if (!annotation || !viewProp) continue

        // rewrite with view properties
        // todo remove @ts-ignore, we suppress TS here, later we will remove this props from annotation
        // @ts-ignore
        annotation.valued = viewProp.valued
        // @ts-ignore
        annotation.schema = viewProp.schema
      }
    }

    return this.#cloneWith({properties})
  }

  css = (style: Annotations<CSSObject>) => this.#cloneWith({style})

  actions = (fn: ActionsInitializer) => this.#cloneWith({actionsInitializer: fn})

  hinted = (hint: string) => this.#cloneWith({hint})

  preview = (customPreview: ReactNode) => this.#cloneWith({customPreview})

  init(store: ComponentStore) {
    return new Model(
      this.viewedWith?.view || this.view,
      initProperties(this.properties),
      initStyle(this.style),
      this.#name,
      initActions(this.actionsInitializer?.(store.props, defineAction)),
    )

    function initProperties(annotations?: Annotations<T>) {
      if (!annotations) return []

      const properties: Annotation[] = [
        key.build('key'),
        tooltipProps.build('tooltipProps'),
        renderWhen.build('renderWhen'),
        htmlAttributes.build('htmlAttributes'),
        validation.build('validation'),
        event.build(DidMountEvent),
        event.build(WillUnmountEvent),
      ]

      if (!('style' in annotations)) properties.push(stylization.build('stylization'))

      forIn(annotations, (value, key) => properties.push(value?.build(key) ?? string.build(key)))

      return properties
    }

    function initStyle(annotations?: Annotations<any>) {
      const styles: Annotation[] = []
      if (!annotations) return styles
      forIn(annotations, (value, key) =>
        styles.push(value?.setup({type: 'Style'}).build(key) ?? string.build(key)))
      return styles
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
      opts.style || this.style,
      opts.actionsInitializer || this.actionsInitializer,
      opts.hint || this.hint,
      opts.customPreview || this.customPreview,
      opts.viewedWith || this.viewedWith,
    )
  }
}
