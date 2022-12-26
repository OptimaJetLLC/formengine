import {observer} from 'mobx-react'
import {createElement, useState} from 'react'
import {ComponentState} from '../../stores/ComponentState'
import {useComponentData} from '../../utils/contexts/ComponenDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useActions} from '../event/useActions'

const _ComponentViewer = () => {
  const store = useStore(), data = useComponentData()
  const [state] = useState(() => new ComponentState(data, store))

  useActions()

  return createElement(data.model.view, state.get)
}

export const ComponentViewer = observer(_ComponentViewer)
