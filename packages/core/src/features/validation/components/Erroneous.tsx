import {observer} from 'mobx-react'
import {ReactNode, useEffect} from 'react'
import {useComponentData} from '../../../utils/contexts/ComponenDataContext'
import {useStore} from '../../../utils/contexts/StoreContext'

export interface ErroneousProps {
  children: ReactNode
}

export const Erroneous = observer(({children}: ErroneousProps) => {
  const store = useStore()
  const {field} = useComponentData()
  const Error = store.props.view.error.view

  useEffect(() => {
    if (field) field.error = undefined
  }, [store.isBuilderMode])

  if (store.props.erroneous) return <>{children}</>

  return (
    <Error error={field?.error}>
      {children}
    </Error>
  )
})
