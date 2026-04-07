import cx from 'clsx'
import type {HTMLAttributes} from 'react'
import styles from './Labels.module.css'

/**
 * Centered label component.
 * @param props HTMLLabelElement properties.
 * @returns React component.
 */
export const CenteredLabel = (props: HTMLAttributes<HTMLLabelElement>) => (
  <label {...props} className={cx(styles.centeredLabel, props.className)}/>
)
