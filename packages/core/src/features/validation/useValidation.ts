import {useEffect, useState} from 'react'
import {useComponentData} from '../../utils/contexts/ComponenDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {ActionEventHandler} from '../event/types'

export const useValidation = (eventActions: Record<string, ActionEventHandler[]>) => {
  const store = useStore()
  const {componentStore, model} = useComponentData()

  const [field] = useState(() => {
    const valuedAn = model.properties.find((p) => p.valued)
      ?? model.properties.find((p) => p.name === 'value')
    return valuedAn ? store.form.set(componentStore, valuedAn) : undefined
  })

  useEffect(() => {
    field && eventActions['onChange'].push((e) => field.setValue(e.value))
    field && eventActions['onBlur'].push((e) => field.setTouched())
  }, [])

  return field
}
