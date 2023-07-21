import {startCase, transform} from 'lodash-es'
import {observer} from 'mobx-react'
import {ComponentType} from 'react'
import {ComponentStore} from '../../../stores/ComponentStore'
import {isFunction} from '../../../utils'
import {ActionDefinition, ActionEventHandler, defineAction} from '../../event'
import {Css} from '../../style/types'
import {ActionsInitializer} from '../types'

/**
 * Represents component metadata for the form viewer.
 */
export class Model<T = any> {
  readonly #name?: string
  //TODO Rename to component? For avoid const Error = props.view.error.view
  readonly view: ComponentType<T>

  /**
   * Creates component metadata for the form viewer.
   * @param view React component type.
   * @param name the component name.
   * @param actionsInitializer the function to initialize actions in the component.
   * @param valued the name of the component property where the component value is stored
   * @param defaultProps the component's default property values.
   * @param css the component's CSS values.
   * @param typeName the component type name.
   */
  constructor(
    view: ComponentType<T>,
    name?: string,
    readonly actionsInitializer?: ActionsInitializer,
    readonly valued?: string,
    readonly defaultProps?: Readonly<Record<string, any>>,
    readonly css?: Css,
    readonly typeName?: string
  ) {
    this.view = observer(view)
    this.view.displayName = view.displayName || view.name
    this.#name = name
  }

  /**
   * @returns the component name, or {@link type} if there is no component name.
   */
  get name() {
    return this.#name ?? this.type
  }

  /**
   * @returns the component type name.
   */
  get type(): string {
    return this.typeName || this.view.displayName || this.view.name
  }

  /**
   * Returns actions for the component or undefined if there are no actions for the component.
   * @param cs the component.
   * @returns actions for the component or undefined if there are no actions for the component.
   */
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
