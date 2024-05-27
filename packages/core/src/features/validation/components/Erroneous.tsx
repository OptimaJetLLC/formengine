import {createElement, useCallback, useEffect, useRef} from 'react'
import {filter} from 'rxjs'
import {WrapperProps} from '../../../types'
import {namedObserver} from '../../../utils'
import {useComponentData} from '../../../utils/contexts/ComponentDataContext'
import {useStore} from '../../../utils/contexts/StoreContext'
import {useErrorModel} from '../../../utils/useErrorModel'
import {ComponentLocalizer, useWrapperState} from '../../../utils/useWrapperState'
import {ActionEventHandler} from '../../event'
import {useViewerProps} from '../../form-viewer/components/ViewerPropsContext'

const useEventListener = (sender: string, type: string, listener: ActionEventHandler) => {
  const {eventSubject} = useStore()
  const listenerRef = useRef(listener)

  listenerRef.current = listener

  useEffect(() => {
    const subscription = eventSubject
      .pipe(filter(e => e.type === type && e.sender.key === sender))
      .subscribe(e => {
        listenerRef.current(e)
      })
    return () => subscription.unsubscribe()
  }, [eventSubject, sender, type])
}

const _Erroneous = ({children}: WrapperProps) => {
  const wrappedComponentData = useComponentData()
  const viewerStore = useStore()
  const props = useViewerProps()
  const errorDefinition = useErrorModel()

  const localizer = useCallback<ComponentLocalizer>(() => ({}), [])
  const componentState = useWrapperState(wrappedComponentData.key, errorDefinition, viewerStore.form.errorProps, localizer)

  useEventListener(wrappedComponentData.key, 'onChange', e => wrappedComponentData.field?.setValue(e.value))
  useEventListener(wrappedComponentData.key, 'onBlur', _ => wrappedComponentData.field?.setTouched())

  if (props.erroneous) return <>{children}</>

  const errorProps = {...componentState.get, error: wrappedComponentData.field?.error}
  return createElement(errorDefinition.component, errorProps, children)
}

export const Erroneous = namedObserver('Erroneous', _Erroneous)
