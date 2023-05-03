import {ReactNode, useEffect} from 'react'
import {namedObserver} from '../../../utils'
import {useComponentData} from '../../../utils/contexts/ComponentDataContext'
import {useViewerProps} from '../../form-viewer/components/ViewerPropsContext'

export interface ErroneousProps {
  children: ReactNode
}

export const Erroneous = namedObserver('Erroneous', ({children}: ErroneousProps) => {
  const {field} = useComponentData()
  const props = useViewerProps()
  const Error = props.view.error.view

  useEffect(() => {
    if (field) field.error = undefined
  }, [])

  if (props.erroneous) return <>{children}</>

  return (
    <Error error={field?.error}>
      {children}
    </Error>
  )
})
