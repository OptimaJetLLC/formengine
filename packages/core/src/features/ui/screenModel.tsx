import type {ScreenProps} from '../../types'
import {Model} from '../define'

const Screen = (props: ScreenProps) => <div>{props.children}</div>
Screen.displayName = 'Screen'

/**
 * Form viewer screen metadata. **Internal use only.**
 */
export const screenModel = new Model(Screen, undefined, undefined,
  undefined, undefined, undefined, undefined, undefined, undefined,
  'container')
