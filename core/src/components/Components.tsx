import {observer} from 'mobx-react'
import {ComponentStore} from '../stores/ComponentStore'
import {ComponentDataProvider} from '../utils/contexts/ComponenDataContext'
import {useStore} from '../utils/contexts/StoreContext'
import {Wrapper} from '../utils/types'
import {Component} from './Component'

interface ComponentsProps {
  parent?: ComponentStore
  components: ComponentStore[]
  Wrapper?: Wrapper
}

//TODO passed component definition?
export const Components = observer(({parent, components, Wrapper}: ComponentsProps) => {
  const store = useStore()

  return <>
    {components.map(componentStore => (
      <ComponentDataProvider
        key={componentStore.key}
        value={{componentStore, parent, model: store.view.getModel(componentStore)}}
      >
        <Component Wrapper={Wrapper}/>
      </ComponentDataProvider>
    ))}
  </>
})
