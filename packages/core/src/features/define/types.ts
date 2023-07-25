import {ComponentStore} from '../../stores/ComponentStore'
import {ActionDefinition, ActionEventHandler, DefineActionHelper, EventName} from '../event'

//TODO typing for properties
/**
 * The type of function that initializes an actions on a component.
 */
export type ActionsInitializer = (props: ComponentStore['props'], def: DefineActionHelper) => Record<EventName, ActionEventHandler | ActionDefinition>
