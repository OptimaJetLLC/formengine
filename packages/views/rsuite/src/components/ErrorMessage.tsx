import {define, node, string} from 'fb-core'
import {ReactNode} from 'react'
import {Form} from 'rsuite'

interface ErrorMessageProps {
  error?: string
  children?: ReactNode
}

const ErrorMessage = ({error, children}: ErrorMessageProps) => {
  const className = error ? 'rs-form-control-wrapper' : undefined

  return <div className={className}>
    {children}
    <Form.ErrorMessage show={Boolean(error)}>
      {error}
    </Form.ErrorMessage>
  </div>
}

export const errorMessage = define(ErrorMessage)
  .props({
    error: string,
    children: node,
  })
