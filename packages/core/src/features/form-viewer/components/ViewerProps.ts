import {EventBus} from '../../event/utils/EventBus'

export interface ViewerProps {
  event?: (bus: EventBus) => void
}
