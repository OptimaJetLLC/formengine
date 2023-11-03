import {ComponentStore} from '../../stores/ComponentStore'
import {BaseBuilder} from '../annotation/utils/builders/BaseBuilder'
import {ActionDefinition, ActionEventHandler, DefineActionHelper, EventName} from '../event'

/**
 * The type of function that initializes an actions on a component. **Internal use only.**
 * @param props the component's property settings.
 * @param def the helper to create an action event handler.
 * @returns the Record with action event handlers.
 */
export type ActionsInitializer = (props: ComponentStore['props'], def: DefineActionHelper) => Record<EventName, ActionEventHandler | ActionDefinition>

/**
 * The type-safe description of the component's metadata property builders.
 * @template T the component property name type.
 */
export type Annotations<T extends object> =
  {
    [key in keyof T]: BaseBuilder<T[key]> | undefined
  }

/**
 * The component kind type.
 */
export type ComponentKind = 'container' | 'component'
