import {observer} from 'mobx-react'
import {ComponentType} from 'react'
import {ComponentStore} from '../../stores/ComponentStore'
import {ComponentNodeProps} from './ComponentNodeProps'

interface ComponentTreeProps {
  parentStore?: ComponentStore
  data: ComponentStore[]
  component: ComponentType<ComponentNodeProps>
}

const _ComponentTree = ({parentStore, data, component}: ComponentTreeProps) => {
  const NodeComponent = component
  return <>
    {data.map(cs => <NodeComponent key={cs.key} componentStore={cs} parentStore={parentStore}/>)}
  </>
}

export const ComponentTree = observer(_ComponentTree)
