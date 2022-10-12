import {ReactNode} from 'react'
import {node} from '../annotation'
import {define} from '../define'

interface PageProps {
  children: ReactNode
}

const Screen = (props: PageProps) => {

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

