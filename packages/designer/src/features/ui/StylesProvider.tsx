import {namedObserver} from '@react-form-builder/core'
import {ComponentProps} from 'react'

const builderClassName = 'optimajet-formbuilder'

export const StylesProvider = namedObserver('StylesProvider', (props: ComponentProps<any>) => {
  return <div className={builderClassName}>
    {props.children}
  </div>
})
