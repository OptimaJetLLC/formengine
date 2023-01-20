import {define, ErrorMessageProps, node, string} from 'form-builder'
import {Form} from 'rsuite'

const RsErrorMessage = ({error, children}: ErrorMessageProps) => {
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
