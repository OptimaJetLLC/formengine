import {css, cx} from '@emotion/css'
import {ReactNode} from 'react'
import {Model} from '../../define'

/**
 * Properties of the React component that wraps the form view component and displays validation errors.
 */
export interface ErrorWrapperProps {
  /**
   * The error text.
   */
  error?: string
  /**
   * The wrapped component.
   */
  children?: ReactNode
  /**
   * The CSS class name.
   */
  className?: string
}

const ErrorMessageStyle = css`
  font-size: 12px;
  color: var(--red-600);
  margin-top: 0.25rem;

  &:before {
    content: "❌ ";
    font-size: 10px;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`

const DefaultErrorMessage = ({children, error, className}: ErrorWrapperProps) => {
  return (
    <>
      {children}
      {error && <p className={cx(className, ErrorMessageStyle)} children={error}/>}
    </>
  )
}

export const errorMessageModel = new Model(DefaultErrorMessage)
