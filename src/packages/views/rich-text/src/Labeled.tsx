import {namedObserver, useAriaAttributesIds, useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import type {ComponentProps} from 'react'
import {cloneElement} from 'react'
import styles from './Labeled.module.css'

interface LabeledProps extends ComponentProps<any> {
  label?: string
}

/**
 * The React component that adds a label to a child component.
 * @param props the React component properties.
 * @param props.label the component label.
 * @param props.children the children component.
 * @param props.className the CSS class name.
 * @returns the React element.
 */
const RawLabeled = ({label, children, className, ...props}: LabeledProps) => {
  const {id} = useComponentData()
  const aria = useAriaAttributesIds({labeled: !!label})

  return (
    <div {...props} className={cx(styles.container, className)} role="group">
      {label && <label id={aria['aria-labelledby']} htmlFor={id} className={styles.label}>{label}</label>}
      {cloneElement(children, {id, ...aria})}
    </div>
  )
}

export const Labeled = namedObserver('Labeled', RawLabeled)
