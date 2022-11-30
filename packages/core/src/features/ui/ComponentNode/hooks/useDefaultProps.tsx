import {useMemo} from 'react'
import {useComponentData} from '../../../../utils/contexts/ComponenDataContext'
import {isProperty} from '../../../annotation/utils'

export function useDefaultProps() {
  const {model} = useComponentData()

  return useMemo(() => {
    const props: Record<string, any> = {}

    model.properties.forEach((value) => {
      if (isProperty(value)) {
        props[value.key] = value.schema?.getDefault()
      }
    })

    return props
  }, [])
}
