import {StoreProps} from '../../stores/StoreProps'
import {EventStream} from '../event/utils/EventStream'

export interface FormViewerProps extends StoreProps {
  event?: (stream: EventStream) => void
}
