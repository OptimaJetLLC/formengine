import type {ErrorMessageLocalizer, IStore, SchemaResolver, Setter} from '@react-form-builder/core'
import {DataValidator, useComponentData} from '@react-form-builder/core'
import {useMemo} from 'react'

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
  const componentData = useComponentData()
  return useMemo(() => DataValidator.create(store, () => componentData.dataRoot, resolver, args, setter, localizer),
    [store, resolver, args, setter, localizer, componentData])
}
