import {Fragment, useEffect} from 'react'
import {ComponentStore} from '../../stores/ComponentStore'
import {namedObserver} from '../../utils'
import {ComponentData, ComponentDataProvider} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useMemoizedLocalObserver} from '../../utils/useMemoizedLocalObserver'
import {useEventListener} from '../event'
import {TooltipWrapper} from '../tooltip/TooltipWrapper'
import {Erroneous} from '../validation'
import {ComponentViewer} from './ComponentViewer'

export interface ComponentTreeItemProps {
  parentStore?: ComponentStore
  componentStore: ComponentStore
}

export const ComponentTreeItem = namedObserver('ComponentTreeItem', ({componentStore, parentStore}: ComponentTreeItemProps) => {
  const store = useStore()
  const data = useMemoizedLocalObserver<ComponentData>(() => ({
    key: componentStore.key,
    componentStore,
    parentStore,
    model: store.props.view.initModel(componentStore),
    get field() {
      return store.form.get(componentStore.key)
    },
  }), {
    model: false
  }, [componentStore, parentStore, store])

  useEffect(() => {
    store.form.set(componentStore, data.model)
  }, [])

  useEventListener(data.key, 'onChange', e => data.field?.setValue(e.value), [])
  useEventListener(data.key, 'onBlur', _ => data.field?.setTouched(), [])

  const Wrapper = store.props.componentWrapper || Fragment

  const Tooltip = !!data.componentStore.tooltipProps ? TooltipWrapper : Fragment

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
