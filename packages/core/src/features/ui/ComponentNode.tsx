import {observer} from 'mobx-react'
import {Fragment, useEffect} from 'react'
import {ComponentData, ComponentDataProvider} from '../../utils/contexts/ComponenDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useMemoizedLocalObserver} from '../../utils/useMemoizedLocalObserver'
import {useActionListener} from '../event'
import {TooltipWrapper} from '../tooltip/TooltipWrapper'
import {Erroneous} from '../validation'
import {ComponentNodeProps} from './ComponentNodeProps'
import {ComponentViewer} from './ComponentViewer'

const _ComponentNode = ({componentStore, parentStore}: ComponentNodeProps) => {
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

  useActionListener(data.key, 'onChange', e => data.field?.setValue(e.value), [])
  useActionListener(data.key, 'onBlur', _ => data.field?.setTouched(), [])

  const Wrapper = store.props.componentWrapper || Fragment

  const Tooltip = !!data.componentStore.tooltipProps ? TooltipWrapper : Fragment

  return (
    <ComponentDataProvider value={data}>
      <Wrapper>
        <Tooltip>
          <Erroneous>
            <ComponentViewer component={ComponentNode}/>
          </Erroneous>
        </Tooltip>
      </Wrapper>
    </ComponentDataProvider>
  )
}

export const ComponentNode = observer(_ComponentNode)
