import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {Components} from './components/Components'
import {ActionDefinition} from './features/event/types'
import {EventBus} from './features/event/utils/EventBus'
import {ObservableFormik} from './features/validation/components/ObserableFormik'
import {ComponentStore} from './stores/ComponentStore'
import {useStore} from './utils/contexts/StoreContext'
import {View} from './features/define/utils/View'
import {Wrapper} from './utils/types'

export interface FormViewerProps {
  event?: (bus: EventBus) => void,
  getForm?: (() => ComponentStore),
  Wrapper?: Wrapper
  view: View
  actions?: ActionDefinition[]
}

export const FormViewer = observer((props: FormViewerProps) => {
  const {getForm, Wrapper, view, event, actions} = props
  const store = useStore()
  //const store = useMemo(() => new Store(view), [])

  useEffect(() => {
    if (actions) {
      store.actions.push(...actions)
    }

    event?.(store.eventBus)
  }, [])

  useEffect(() => {
    if (store.screen.children?.length) return

    if (getForm) {
      store.screen = getForm()
    }
  }, [getForm])

  return (
    //<StoreProvider view={rsuite}>
    <ObservableFormik>
      <Components components={[store.screen]} Wrapper={Wrapper}/>
    </ObservableFormik>
    //</StoreProvider>
  )
})


