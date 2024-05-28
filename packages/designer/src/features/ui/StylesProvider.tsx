import {namedObserver} from '@react-form-builder/core'
import {ComponentProps} from 'react'

const builderClassName = 'optimajet-formbuilder'

const RawStylesProvider = (props: ComponentProps<any>) => {
  return <div className={builderClassName}>
    {props.children}
  </div>
}

export const StylesProvider = namedObserver('StylesProvider', RawStylesProvider)
