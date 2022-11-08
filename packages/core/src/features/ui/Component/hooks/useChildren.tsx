import {ComponentStore} from '../../../../stores/ComponentStore'
import {useComponentData} from '../../../../utils/contexts/ComponenDataContext'
import {isContainer} from '../../../annotation/utils'
import {ComponentTree} from '../../ComponentTree'

export function useChildren(currentProps: Record<string, any>) {
  const {componentStore, model} = useComponentData()

  if (!componentStore.children?.length) return

  const containers = model.properties.filter(isContainer)

  for (let container of containers) {
    const isChild = (child: ComponentStore) =>
      child.bindTo === container.key || !child.bindTo && container.key === 'children'

    //TODO!
    /*const isVisible = (child: ComponentStore) =>
        container.bindTo ? child.visible === componentStore.props[container.bindTo] : true*/

    const components = componentStore.children.filter(isChild)//.filter(isVisible)

    currentProps[container.key] =
      components.length
        ? <ComponentTree parent={componentStore} data={components}/>
        : null
  }
}
