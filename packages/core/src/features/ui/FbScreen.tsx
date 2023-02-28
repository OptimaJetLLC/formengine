import {ReactNode} from 'react'
import {node} from '../annotation'
import {define} from '../define'
import {CustomActionDefinition} from '../event'

interface FbScreenProps {
  actions?: CustomActionDefinition[]
  children: ReactNode
}

const FbScreen = (props: FbScreenProps) => <div>{props.children}</div>

export const fbScreen = define(FbScreen)
  .named('Screen')
  .props({
    children: node
  })

