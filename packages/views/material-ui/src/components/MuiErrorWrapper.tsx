import {FormHelperText} from '@mui/material'
import type {ErrorWrapperProps} from '@react-form-builder/core'
import {define, isUndefined, useAriaErrorMessage, useComponentData} from '@react-form-builder/core'
import type {ReactElement} from 'react'
import {Children, cloneElement, isValidElement} from 'react'
import {feedbackCategory} from './categories'
import type {ControlAriaProps} from './internal/controlAria'

const useWrappedComponentSupportsNativeError = () => {
  const data = useComponentData()
  const defaultProps = data?.model?.defaultProps

  return Boolean(defaultProps && 'error' in defaultProps && 'helperText' in defaultProps)
}

/**
 * A wrapper component for displaying error messages in Material-UI forms.
 * @param props the properties for the ErrorWrapper component.
 * @param props.error the error text to display.
 * @param props.children the child elements to be rendered inside the error wrapper.
 * @param props.className the CSS class name for a fallback error message.
 * @returns the fragment with the child, native error props when supported, and a fallback message when not.
 */
export const MuiErrorWrapper = ({error, children, className}: ErrorWrapperProps) => {
  const aria = useAriaErrorMessage()
  const supportsNativeError = useWrappedComponentSupportsNativeError()
  const errorMessageId = aria['aria-errormessage']
  // eslint-disable-next-line @eslint-react/no-children-only -- Preserve the wrapper's single-control contract and validation of children.
  const child = children === null || isUndefined(children) ? null : Children.only(children)
  const childWithError =
    child !== null && error && isValidElement(child)
      ? // eslint-disable-next-line @eslint-react/no-clone-element -- Preserve native error display and ARIA injection into the supplied control.
        cloneElement(
          child as ReactElement<{error?: boolean; helperText?: string} & ControlAriaProps>,
          supportsNativeError
            ? {error: true, helperText: error}
            : {
                'aria-invalid': true,
                'aria-errormessage': errorMessageId,
                'aria-describedby': errorMessageId,
              }
        )
      : child

  return (
    <>
      {childWithError}
      {error && !supportsNativeError && (
        <FormHelperText id={errorMessageId} error className={className} role="alert">
          {error}
        </FormHelperText>
      )}
    </>
  )
}

export const muiErrorWrapper = define(MuiErrorWrapper, 'MuiErrorWrapper')
  .icon('ErrorMessage')
  .category(feedbackCategory)
  .componentRole('error-message')
  .hideFromComponentPalette()
