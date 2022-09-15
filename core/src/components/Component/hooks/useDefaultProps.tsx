import {useMemo} from 'react'
import {useComponentData} from '../../../utils/contexts/ComponenDataContext'

export function useDefaultProps() {
  const {model} = useComponentData()

  return useMemo(() => {
    const props: Record<string, any> = {}

    model.properties.forEach((value) => {
      if (value.isSystem) return
      if (value.isFunction) return
      if (value.isContainer) return

      props[value.key] = value.defaultValue
    })

    return props
  }, [])
}
