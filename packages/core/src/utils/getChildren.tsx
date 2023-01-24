import {isContainer} from '../features/annotation'
import {ComponentTree} from '../features/ui/ComponentTree'
import {ComponentStore} from '../stores/ComponentStore'
import {Store} from '../stores/Store'
import {ComponentData} from './contexts/ComponenDataContext'

export function getChildren(data: ComponentData, store: Store) {
  const containers = data.model.properties.filter(isContainer)
  const currentProps: Record<string, any> = {}
  for (let container of containers) {
    const isChild = (child: ComponentStore) =>
      child.bindTo === container.key || !child.bindTo && container.key === 'children'

    //TODO!
    /*const isVisible = (child: ComponentStore) =>
        container.bindTo ? child.visible === componentStore.props[container.bindTo] : true*/

    const components = data.componentStore.children?.filter(isChild)//.filter(isVisible)

    currentProps[container.key] =
      components?.length
        ? <ComponentTree parentStore={data.componentStore} data={components}/>
        : store.props.dropZone || null
  }
  return currentProps
}
