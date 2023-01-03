import {define, node, string} from 'fb-core'
import {ReactNode} from 'react'
import {Form} from 'rsuite'

interface RsErrorMessageProps {
  error?: string
  children?: ReactNode
}

const RsErrorMessage = ({error, children}: RsErrorMessageProps) => {
  const className = error ? 'rs-form-control-wrapper' : undefined

  return <div className={className}>
    {children}
    <Form.ErrorMessage show={Boolean(error)}>
      {error}
    </Form.ErrorMessage>
  </div>
}

export const rsErrorMessage = define(RsErrorMessage)
  .props({
    error: string,
    children: node,
  })
