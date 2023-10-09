import {DataValidator, ErrorMessageLocalizer, IStore, SchemaResolver, Setter, useDestroy} from '@react-form-builder/core'
import {useEffect, useMemo, useRef} from 'react'

/**
 * Creates a DataValidator, recreates the DataValidator if necessary.
 * Correctly disposes the DataValidator if the React component has been unmounted.
 * @param store the form viewer settings
 * @param resolver the validation function factory.
 * @param args the validation function factory arguments.
 * @param setter the callback function called to set a validation error.
 * @param localizer the function that localizes validation error messages.
 * @returns the DataValidator instance.
 */
export function useDataValidator<T>(store: IStore, resolver: SchemaResolver<T>, args: T,
                                    setter: Setter<string | undefined>, localizer?: ErrorMessageLocalizer) {
  const dataValidator = useMemo(() => DataValidator.create(store, resolver, args, setter, localizer),
    [store, resolver, args, setter, localizer])
  const dataValidatorRef = useRef(dataValidator)

  useEffect(() => {
    if (dataValidatorRef.current !== dataValidator) {
      dataValidatorRef.current.dispose()
      dataValidatorRef.current = dataValidator
    }
  }, [dataValidator, dataValidatorRef.current])

  useDestroy(() => dataValidator.dispose())

  return dataValidator
}
