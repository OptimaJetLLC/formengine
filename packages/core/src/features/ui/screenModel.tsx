import {ScreenProps} from '../../types'
import {Model} from '../define'

const Screen = (props: ScreenProps) => <div>{props.children}</div>
export const screenModel = new Model(Screen)
