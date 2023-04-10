import {startCase, transform} from 'lodash-es'
import {observer} from 'mobx-react'
import {ComponentType} from 'react'
import {ComponentStore} from '../../../stores/ComponentStore'
import {isFunction} from '../../../utils'
import {ActionDefinition, ActionEventHandler, defineAction} from '../../event'
import {Css} from '../../style/types'
import {ActionsInitializer} from '../types'

export class Model {
  readonly #name?: string
  readonly view: ComponentType<any>

  constructor(
    view: ComponentType<any>,
    name?: string,
    readonly actionsInitializer?: ActionsInitializer,
    readonly valued?: string,
    readonly defaultProps?: Readonly<Record<string, any>>,
    readonly css?: Css,
  ) {
    this.view = observer(view)
    this.view.displayName = view.displayName || view.name
    this.#name = name
  }

  get name() {
    return this.#name ?? this.type
  }

  get type(): string {
    return this.view.displayName || this.view.name
  }

  getActions(cs: ComponentStore) {
    return initActions(this.actionsInitializer?.(cs.props, defineAction))
  }
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
