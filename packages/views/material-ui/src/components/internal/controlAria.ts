import {isUndefined} from '@react-form-builder/core'
import {useMemo} from 'react'

/**
 * Accessible invalid state injected by the error wrapper.
 */
export interface ControlAriaProps {
  /**
   * Whether the control value is invalid.
   */
  'aria-invalid'?: boolean
  /**
   * The id of the element that describes the validation error.
   */
  'aria-errormessage'?: string
  /**
   * The id of the element that describes the control.
   */
  'aria-describedby'?: string
}

/**
 * Input slot props that expose the invalid state on the native input.
 */
export interface InvalidInputSlotProps {
  /**
   * Props forwarded to the native input.
   */
  input: ControlAriaProps
}

/**
 * Props with the accessible invalid state removed.
 */
type PropsWithoutControlAria<T> = Omit<T, keyof ControlAriaProps>

/**
 * Builds input slot props from the accessible invalid state and returns the other props.
 * @param props component props, including the aria attributes injected by the error wrapper.
 * @returns the input slot props, or undefined when no aria state is set, and the props without those aria attributes.
 */
export const useInvalidInputSlotProps = <T extends ControlAriaProps>(
  props: T
): [InvalidInputSlotProps | undefined, PropsWithoutControlAria<T>] => {
  const {'aria-invalid': ariaInvalid, 'aria-errormessage': ariaErrorMessage, 'aria-describedby': ariaDescribedBy, ...rest} = props

  const inputSlotProps = useMemo(() => {
    if (isUndefined(ariaInvalid) && isUndefined(ariaErrorMessage) && isUndefined(ariaDescribedBy)) {
      return undefined
    }

    return {
      input: {
        'aria-invalid': ariaInvalid,
        'aria-errormessage': ariaErrorMessage,
        'aria-describedby': ariaDescribedBy,
      },
    }
  }, [ariaDescribedBy, ariaErrorMessage, ariaInvalid])

  return [inputSlotProps, rest]
}
