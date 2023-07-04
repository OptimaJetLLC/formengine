import {ComponentStore} from '../../stores/ComponentStore'
import {ActionDefinition, ActionEventHandler, DefineActionHelper, EventName} from '../event'

//TODO типизация для пропсов
export type ActionsInitializer = (props: ComponentStore['props'], def: DefineActionHelper) => Record<EventName, ActionEventHandler | ActionDefinition>
