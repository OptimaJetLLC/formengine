import {observer, useLocalObservable} from 'mobx-react'
import {Fragment} from 'react'
import {ComponentStore} from '../../stores/ComponentStore'
import {ComponentDataProvider} from '../../utils/contexts/ComponenDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useListener} from '../../utils/useListener'
import {Editable} from '../dnd'
import {Erroneous} from '../validation'
import {ComponentViewer} from './ComponentViewer'

interface ComponentNodeProps {
  parentStore?: ComponentStore
  componentStore: ComponentStore
}

const _ComponentNode = ({componentStore, parentStore}: ComponentNodeProps) =>{
  const store = useStore()
  const data = useLocalObservable(() => ({
    componentStore,
    parentStore,
    model: store.props.view.initModel(componentStore),
    get field() {
      return store.form.set(componentStore, this.model)
    },

  }), {
    model: false
  })

  useListener(componentStore.key, 'onChange',
    e => data.field?.setValue(e.value), [])
  useListener(componentStore.key, 'onBlur',
    _ => data.field?.setTouched(), [])

  const Wrapper = store.isBuilderMode ? Editable : Fragment

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
