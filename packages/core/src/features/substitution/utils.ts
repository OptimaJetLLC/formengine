import {denote} from 'rc-marked-input'
import {Store} from '../../stores/Store'
import {isString} from '../../utils'
import {ArgumentValue} from '../event/types'
import {componentMarkup} from './consts'

export function denoteBinds(value: ArgumentValue, store: Store) {
  if (!isString(value)) return value

  return denote(value, mark => {
    let node = store.findNode(mark.value)
    return node?.data.props[mark.label] ?? ''
  }, componentMarkup)
}
