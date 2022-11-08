import {define, node, string} from 'fb-core'
import {ReactNode} from 'react'
import {Form} from 'rsuite'

interface ErrorMessageProps {
  error?: string
  children?: ReactNode
}

const ErrorMessage = ({error, children}: ErrorMessageProps) => {
  if (!error) return <div> {children} </div>

  return <div className={'rs-form-control-wrapper'}>
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
