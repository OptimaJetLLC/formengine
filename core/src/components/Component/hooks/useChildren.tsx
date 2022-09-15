import {ComponentStore} from '../../../stores/ComponentStore'
import {useComponentData} from '../../../utils/contexts/ComponenDataContext'
import {Wrapper} from '../../../utils/types'
import {Components} from '../../Components'

export function useChildren(currentProps: Record<string, any>, Wrapper?: Wrapper) {
  const {componentStore, model} = useComponentData()

  if (!componentStore.children?.length) return

  const containers = model.properties.filter(value => value.isContainer)

  for (let container of containers) {
    const isChild = (child: ComponentStore) =>
      child.bindTo === container.key || !child.bindTo && container.key === 'children'

    const isVisible = (child: ComponentStore) =>
      container.bindTo ? child.visible === componentStore.props[container.bindTo] : true

    const components = componentStore.children.filter(isChild).filter(isVisible)

    currentProps[container.key] =
      components.length
        ? <Components parent={componentStore} components={components} Wrapper={Wrapper}/>
        : null
  }
}
