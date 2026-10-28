import {FormHelperText} from '@mui/material'
import type {ErrorWrapperProps} from '@react-form-builder/core'
import {define, useAriaErrorMessage, useComponentData} from '@react-form-builder/core'
import type {ReactElement} from 'react'
import {Children, cloneElement, isValidElement} from 'react'
import {feedbackCategory} from './categories'

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
 * @returns the child with native error props or a fallback error message.
 */
export const MuiErrorWrapper = ({error, children, className}: ErrorWrapperProps) => {
  const aria = useAriaErrorMessage()
  const supportsNativeError = useWrappedComponentSupportsNativeError()
  const child = children != null ? Children.only(children) : null
  const childWithError =
    child != null && error && isValidElement(child) && supportsNativeError
      ? cloneElement(child as ReactElement<{error?: boolean; helperText?: string}>, {error: true, helperText: error})
      : child

  return (
    <>
      {childWithError}
      {error && !supportsNativeError && (
        <FormHelperText id={aria['aria-errormessage']} error className={className} role="alert">
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
