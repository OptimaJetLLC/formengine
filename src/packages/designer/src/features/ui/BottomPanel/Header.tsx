import cx from 'clsx'
import type {HTMLAttributes} from 'react'
import styles from './Header.module.css'

/**
 * Bottom panel header component.
 * @param props HTMLDivElement properties.
 * @param props.className css class name.
 * @returns React component.
 */
export const Header = ({className, ...props}: HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={cx(styles.header, className)}/>
)
