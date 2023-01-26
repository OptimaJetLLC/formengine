import {createNamedContext} from 'form-viewer'
import {EventBus} from '../../features/event/utils/EventBus'

export const [useEventBus, EventBusProvider, EventBusContext] = createNamedContext<EventBus>('EventBusContext')
