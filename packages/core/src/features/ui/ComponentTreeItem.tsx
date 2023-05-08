import {Fragment} from 'react'
import {ComponentStore} from '../../stores/ComponentStore'
import {namedObserver} from '../../utils'
import {ComponentData, ComponentDataProvider} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useEventListener} from '../event'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {TooltipWrapper} from '../tooltip/TooltipWrapper'
import {Erroneous} from '../validation'
import {ComponentViewer} from './ComponentViewer'

export interface ComponentTreeItemProps {
  parentStore?: ComponentStore
  componentStore: ComponentStore
}

export const ComponentTreeItem = namedObserver('ComponentTreeItem', ({componentStore, parentStore}: ComponentTreeItemProps) => {
  const store = useStore()
  const props = useViewerProps()
  const data = useCachedComponentData(componentStore, parentStore)

  useEventListener(data.key, 'onChange', e => data.field?.setValue(e.value), [])
  useEventListener(data.key, 'onBlur', _ => data.field?.setTouched(), [])

  const Wrapper = props.componentWrapper || Fragment
  const Tooltip = !!data.store.tooltipProps ? TooltipWrapper : Fragment

  return (
    <ComponentDataProvider value={data}>
      <Wrapper>
        <Tooltip>
          <Erroneous>
            <ComponentViewer/>
          </Erroneous>
        </Tooltip>
      </Wrapper>
    </ComponentDataProvider>
  )
})

function useCachedComponentData(componentStore: ComponentStore, parentStore?: ComponentStore) {
  const store = useStore()
  const props = useViewerProps()

  //If exists return with updated parent
  if (store.cache.has(componentStore)) {
    const data = store.cache.get(componentStore)!
    return Object.assign<ComponentData, Partial<ComponentData>>(data, {parent: parentStore})
  }

  store.cache.set(componentStore, {
    get key() {
      return this.store.key
    },
    store: componentStore,
    parent: parentStore,
    model: props.view.get(componentStore.type),
    get field() {
      return store.form.get(componentStore.key)
    },
  })

  return store.cache.get(componentStore)!
}
