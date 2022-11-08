import {ReactNode} from 'react'
import {node} from '../annotation'
import {define} from '../define'

interface ScreenProps {
  children: ReactNode
}

const Screen = (props: ScreenProps) => {

  return (
    <div>
      {props.children}
    </div>
  )
}

export const screen = define(Screen)
  .props({
    children: node
  })

