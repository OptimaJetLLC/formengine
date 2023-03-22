import {ReactNode, useEffect} from 'react'
import {namedObserver} from '../../../utils'
import {useComponentData} from '../../../utils/contexts/ComponentDataContext'
import {useStore} from '../../../utils/contexts/StoreContext'

export interface ErroneousProps {
  children: ReactNode
}

export const Erroneous = namedObserver('Erroneous', ({children}: ErroneousProps) => {
  const store = useStore()
  const {field} = useComponentData()
  const Error = store.props.view.error.view

  useEffect(() => {
    if (field) field.error = undefined
  }, [])

  if (store.props.erroneous) return <>{children}</>

  return (
    <Error error={field?.error}>
      {children}
    </Error>
  )
})
