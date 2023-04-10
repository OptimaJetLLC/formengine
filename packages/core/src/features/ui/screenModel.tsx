import {FbScreenProps} from '../../types'
import {Model} from '../define'

const Screen = (props: FbScreenProps) => <div>{props.children}</div>
export const screenModel = new Model(Screen)
