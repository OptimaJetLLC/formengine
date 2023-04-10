import {createElement, useMemo} from 'react'
import {ComponentState} from '../../stores/ComponentState'
import {namedObserver} from '../../utils'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useActions} from '../event'
import {useComponentTree} from './ComponentTreeContext'
import {useOverrides} from './OverridesContext'

export const ComponentViewer = namedObserver('ComponentViewer', () => {
  const store = useStore(), data = useComponentData()
  const component = useComponentTree()
  const overrides = useOverrides()
  const componentState = useMemo(() => new ComponentState(data, store, component, overrides), [data, overrides.current])

  useActions()

  return createElement(data.model.view, componentState.get)
})
