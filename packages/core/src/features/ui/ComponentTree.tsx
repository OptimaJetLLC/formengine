import {observer} from 'mobx-react'
import {ComponentStore} from '../../stores/ComponentStore'
import {ComponentDataProvider} from '../../utils/contexts/ComponenDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {ComponentNode} from './ComponentNode'

interface ComponentsProps {
  parentStore?: ComponentStore
  data: ComponentStore[]
}

//TODO passed component definition?
export const ComponentTree = observer(({parentStore, data}: ComponentsProps) => {
  const store = useStore()

  return <>
    {data.map(componentStore => (
      <ComponentDataProvider
        key={componentStore.key}
        value={{componentStore, parentStore, model: store.props.view.getModel(componentStore)}}
      >
        <ComponentNode/>
      </ComponentDataProvider>
    ))}
  </>
})
