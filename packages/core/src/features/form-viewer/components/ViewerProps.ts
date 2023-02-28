import {EventStream} from '../../event/utils/EventStream'

export interface ViewerProps {
  event?: (stream: EventStream) => void
}
