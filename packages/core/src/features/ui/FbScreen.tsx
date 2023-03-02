import {ReactNode} from 'react'
import {node, tooltipType} from '../annotation'
import {define} from '../define'
import {CustomActionDefinition} from '../event'

interface FbScreenProps {
  actions?: CustomActionDefinition[]
  children: ReactNode,
  tooltipType: string
}

const FbScreen = (props: FbScreenProps) => <div>{props.children}</div>

export const fbScreen = define(FbScreen)
  .named('Screen')
  .props({
    children: node,
    tooltipType: tooltipType.calculable(false)
  })
