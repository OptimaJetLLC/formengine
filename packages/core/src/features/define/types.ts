import {ComponentStore} from '../../stores/ComponentStore'
import {ActionDefinition} from '../event/actionDefinition'
import {ActionEventHandler} from '../event/actionEventHandler'
import {DefineActionHelper} from '../event/defineAction'
import {EventName} from '../event/types'

//TODO типизация для пропсов
export type ActionsInitializer = (props: ComponentStore['props'], def: DefineActionHelper) => Record<EventName, ActionEventHandler | ActionDefinition>
