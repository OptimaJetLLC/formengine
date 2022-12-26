import {keys} from 'lodash'
import {StylesFromProps} from './conts'

export const removePropsStyles = (props: Record<string, any>) => {
  keys(props)?.forEach(key => {
    if (StylesFromProps[key]) delete props[key]
  })

  return props
}
