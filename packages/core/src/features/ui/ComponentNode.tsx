import {observer} from 'mobx-react'
import {Fragment, useEffect} from 'react'
import {ComponentStore} from '../../stores/ComponentStore'
import {ComponentDataProvider} from '../../utils/contexts/ComponenDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useListener} from '../../utils/useListener'
import {useMemoizedLocalObserver} from '../../utils/useMemoizedLocalObserver'
import {Erroneous} from '../validation'
import {ComponentViewer} from './ComponentViewer'

interface ComponentNodeProps {
  parentStore?: ComponentStore
  componentStore: ComponentStore
}

const _ComponentNode = ({componentStore, parentStore}: ComponentNodeProps) => {
  const store = useStore()
  const data = useMemoizedLocalObserver(() => ({
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

  useListener(componentStore.key, 'onChange',
    e => data.field?.setValue(e.value), [])
  useListener(componentStore.key, 'onBlur',
    _ => data.field?.setTouched(), [])

  const Wrapper = store.props.componentWrapper || Fragment

  return (
    <ComponentDataProvider value={data}>
      <Wrapper>
        <Erroneous>
          <ComponentViewer/>
        </Erroneous>
      </Wrapper>
    </ComponentDataProvider>
  )
}

export const ComponentNode = observer(_ComponentNode)
