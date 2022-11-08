import {observer} from 'mobx-react'
import {useStore} from '../../../utils/contexts/StoreContext'
import {WrapperProps} from '../../../utils/types'
import {Field} from '../utils/Field'

export interface ErroneousProps extends WrapperProps {
  field: Field
}

export const Erroneous = observer(({View, viewProps, field}: ErroneousProps) => {
  const store = useStore()
  const Error = store.props.view.error.view

  if (store.props.erroneous) return <View {...viewProps}/>

  return (
    <Error error={field.error}>
      <View {...viewProps}/>
    </Error>
  )
})
