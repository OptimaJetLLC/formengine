import {StoreProps} from '../../stores/StoreProps'
import {EventStream} from '../event/utils/EventStream'

/**
 * Form viewer React component properties.
 */
export interface FormViewerProps extends StoreProps {

  /**
   * The function for processing form events.
   * @param stream the event stream of the form viewer.
   */
  event?: (stream: EventStream) => void
}
