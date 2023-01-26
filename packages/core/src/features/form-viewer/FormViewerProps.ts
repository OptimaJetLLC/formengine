import {StoreProps} from '../../stores/StoreProps'
import {EventBus} from '../event/utils/EventBus'

export interface FormViewerProps extends StoreProps {
  event?: (bus: EventBus) => void
}
