import {cx} from '@emotion/css'
import {define, ErrorWrapperProps, string} from '@react-form-builder/builder/view'
import {Form} from 'rsuite'
import {TypeAttributes} from 'rsuite/esm/@types/common'
import {placement} from '../commonProperties'

interface RsErrorMessageProps extends ErrorWrapperProps {
  placement?: TypeAttributes.Placement8
}

const RsErrorMessage = ({error, children, placement, className}: RsErrorMessageProps) => {
  const divClassName = error ? 'rs-form-control-wrapper' : undefined

  return <div className={cx(className, divClassName)}>
    {children}
    <Form.ErrorMessage show={Boolean(error)} placement={placement}>
      {error}
    </Form.ErrorMessage>
  </div>
}

export const rsErrorMessage = define(RsErrorMessage)
  .type('RsErrorMessage')
  .name('Error message')
  .props({
    placement: placement.default('bottomStart'),
    className: string,
  })
