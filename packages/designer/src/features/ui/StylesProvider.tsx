import {namedObserver} from '@react-form-builder/core'
import cx from 'clsx'
import type {ComponentProps} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import styles from './StylesProvider.module.css'

const builderClassName = 'optimajet-formbuilder'

const RawStylesProvider = (props: ComponentProps<any>) => {
  const {theme} = useBuilderStore()
  return (
    <div className={cx(styles.root, builderClassName, theme)}>
      {props.children}
    </div>
  )
}

export const StylesProvider = namedObserver('StylesProvider', RawStylesProvider)
