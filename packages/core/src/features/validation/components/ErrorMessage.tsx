import {css} from '@emotion/css'
import {ReactNode} from 'react'
import {Model} from '../../define'

export interface ErrorMessageProps {
  error?: string
  children?: ReactNode
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

const ErrorMessage = ({children, error}: ErrorMessageProps) => {
  const className = error ? ErrorMessageStyle : undefined

  return (
    <>
      {children}
      <div className={className}>
        {error}
      </div>
    </>
  )
}

export const errorMessageModel = new Model(ErrorMessage)
