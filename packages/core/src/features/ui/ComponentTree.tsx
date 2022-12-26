import {observer} from 'mobx-react'
import {ComponentStore} from '../../stores/ComponentStore'
import {ComponentNode} from './ComponentNode'

interface ComponentTreeProps {
  parentStore?: ComponentStore
  data: ComponentStore[]
}

const _ComponentTree = ({parentStore, data}: ComponentTreeProps) => <>
  {data.map(cs => <ComponentNode key={cs.key} componentStore={cs} parentStore={parentStore}/>)}
</>

export const ComponentTree = observer(_ComponentTree)
