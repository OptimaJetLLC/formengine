import {ComponentType} from 'react'
import {isContainer} from '../features/annotation'
import {ComponentNodeProps} from '../features/ui/ComponentNodeProps'
import {ComponentTree} from '../features/ui/ComponentTree'
import {ComponentStore} from '../stores/ComponentStore'
import {Store} from '../stores/Store'
import {ComponentData} from './contexts/ComponentDataContext'

const defaultContainerKey = 'children'

export function getChildren(data: ComponentData, store: Store, component: ComponentType<ComponentNodeProps>) {
  const containers = data.model.properties.filter(isContainer)
  const currentProps: Record<string, any> = {}
  for (let container of containers) {
    const isChild = (child: ComponentStore) =>
      child.bindTo === container.key || !child.bindTo && container.key === defaultContainerKey

    //TODO!
    /*const isVisible = (child: ComponentStore) =>
        container.bindTo ? child.visible === componentStore.props[container.bindTo] : true*/

    const components = data.componentStore.children?.filter(isChild)//.filter(isVisible)

    let dropZoneElement = null
    if (store.props.dropZone) {
      const Dz = store.props.dropZone
      const bindTo = container.key === defaultContainerKey ? undefined : container.key
      dropZoneElement = <Dz bindTo={bindTo}></Dz>
    }

    currentProps[container.key] =
      components?.length
        ? <ComponentTree parentStore={data.componentStore} data={components} component={component}/>
        : dropZoneElement
  }
  return currentProps
}
