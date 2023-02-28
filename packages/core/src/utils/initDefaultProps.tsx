import {isProperty} from '../features/annotation/utils/annotations/PropertyAn'
import {Model} from '../features/define'

export function initDefaultProps(model: Model<any>): Readonly<Record<string, any>> {
  return model.properties.reduce((props, value) => {
    if (isProperty(value)) {
      props[value.key] = value.schema?.getDefault()
    }
    return props
  }, {} as Record<string, any>)
}
