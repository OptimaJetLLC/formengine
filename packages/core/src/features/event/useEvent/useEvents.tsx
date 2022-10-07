import {EventTuple} from '../types'
import {useActions} from './hooks/useActions'
import {useEventHandlers} from './hooks/useEventHandlers'
import {useNotifies} from './hooks/useNotifies'

export function useEvents(): EventTuple {
  const [handlers, actionsMap] = useEventHandlers()

  useNotifies(actionsMap)
  useActions(actionsMap)

  return [handlers, actionsMap]
}
