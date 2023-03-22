import {createElement, useMemo} from 'react'
import {ComponentState} from '../../stores/ComponentState'
import {namedObserver} from '../../utils'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useActions} from '../event'
import {useComponentTree} from './ComponentTreeProvider'

export const ComponentViewer = namedObserver('ComponentViewer', () => {
  const store = useStore(), data = useComponentData()
  const component = useComponentTree()
  const componentState = useMemo(() => new ComponentState(data, store, component), [data, store])

  useActions()

  return createElement(data.model.view, componentState.get)
})
