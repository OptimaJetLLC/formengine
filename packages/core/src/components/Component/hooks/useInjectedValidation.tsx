import {useEffect} from 'react'
import {ActionEventHandler} from '../../../features/event/types'
import {FieldProps} from '../../../features/validation/useValidation'

export function useInjectedValidation(events: Record<string, Function>, eventActions: Record<string, ActionEventHandler[]>, field: FieldProps) {
  useEffect(() => {
    if (eventActions['onChange']) {
      eventActions['onChange'].push((e) => field.setValue(e.value))
    } else {
      events.onChange = field.setValue
    }

    if (eventActions['onBlur']) {
      eventActions['onBlur'].push(() => field.setTouched())
    } else {
      events.onBlur = () => field.setTouched()
    }

    //props.value = field.value
  }, [])
}
