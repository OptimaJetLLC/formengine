import {css, cx} from '@emotion/css'
import {ReactNode} from 'react'
import {Model} from '../../define'

export interface ErrorWrapperProps {
  error?: string
  children?: ReactNode
  className?: string
}

const ErrorMessageStyle = css`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
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
      {error && <div className={cx(className, ErrorMessageStyle)}>
        {error}
      </div>}
    </>
  )
}

export const errorMessageModel = new Model(DefaultErrorMessage)
