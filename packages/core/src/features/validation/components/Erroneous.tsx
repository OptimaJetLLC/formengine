import {isEmpty} from 'lodash-es'
import {DependencyList, useEffect} from 'react'
import {filter} from 'rxjs'
import {ComponentProperty} from '../../../stores/ComponentStore'
import {WrapperProps} from '../../../types'
import {namedObserver} from '../../../utils'
import {useComponentData} from '../../../utils/contexts/ComponentDataContext'
import {useStore} from '../../../utils/contexts/StoreContext'
import {ActionEventHandler} from '../../event'
import {useViewerProps} from '../../form-viewer/components/ViewerPropsContext'

const useEventListener = (sender: string, type: string, listener: ActionEventHandler, deps?: DependencyList) => {
  const {eventSubject} = useStore()
  useEffect(() => {
    const subscription = eventSubject
      .pipe(filter(e => e.type === type && e.sender.key === sender))
      .subscribe(listener)
    return () => subscription.unsubscribe()
  }, deps)
}

export const Erroneous = namedObserver('Erroneous', ({children}: WrapperProps) => {
  const data = useComponentData()
  const store = useStore()
  const props = useViewerProps()
  const Error = props.view.error.view
  const otherProps = getProps(store.form.componentTree.store.props.error?.value)

  useEffect(() => {
    if (data.field) data.field.error = undefined
  }, [])

  useEventListener(data.key, 'onChange', e => data.field?.setValue(e.value), [])
  useEventListener(data.key, 'onBlur', _ => data.field?.setTouched(), [])

  if (props.erroneous) return <>{children}</>

  return (
    <Error error={data.field?.error} {...otherProps}>
      {children}
    </Error>
  )
})

function getProps(object?: Record<string, ComponentProperty>) {
  if (isEmpty(object)) return
  return Object.entries(object).reduce((previousValue, [key, property]) => {
    previousValue[key] = property.value
    return previousValue
  }, {} as Record<string, any>)
}
