import cx from 'clsx'
import type {ButtonHTMLAttributes} from 'react'
import styles from './Button.module.css'

/**
 * Button component.
 * @param props component props.
 * @returns React component.
 */
export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const {className, ...rest} = props
  return <button  {...rest} className={cx('rs-btn', 'rs-btn-primary', styles.button, className)}/>
}
