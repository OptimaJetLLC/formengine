import {ReactNode} from 'react'
import {node} from '../features/annotation'
import {define} from '../features/define'

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

