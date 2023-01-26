import {isProperty} from '../features/annotation/utils/annotations/PropertyAn'
import {ComponentData} from './contexts/ComponenDataContext'

export function getDefaultProps(data: ComponentData) {
  return data.model.properties.reduce((props, value) => {
    if (isProperty(value)) {
      props[value.key] = value.schema?.getDefault()
    }
    return props
  }, {} as Record<string, any>)
}
