import {define, ErrorMessageProps, node, string} from '@react-form-builder/builder/view'
import {Form} from 'rsuite'

const RsErrorMessage = ({error, children}: ErrorMessageProps) => {
  if (!error) return <>{children}</>

  const className = error ? 'rs-form-control-wrapper' : undefined

  return <div className={className}>
    {children}
    <Form.ErrorMessage show={Boolean(error)}>
      {error}
    </Form.ErrorMessage>
  </div>
}

export const rsErrorMessage = define(RsErrorMessage)
  .type('RsErrorMessage')
  .props({
    error: string,
    children: node,
  })
