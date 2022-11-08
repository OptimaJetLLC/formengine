import {useEffect, useState} from 'react'
import {useComponentData} from '../../utils/contexts/ComponenDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {ActionEventHandler} from '../event/types'
import {toValidateScheme} from './utils/toValidateScheme'

export const useValidation = (eventActions: Record<string, ActionEventHandler[]>) => {
  const store = useStore()
  const {componentStore: {key, validation}} = useComponentData()
  const field = useState(() => store.form.set(key, {schema: toValidateScheme(validation)}))[0]

  useEffect(() => {
    eventActions['onChange'].push((e) => field.setValue(e.value))
    eventActions['onBlur'].push((e) => field.setTouched())
  }, [])

  return field
}
