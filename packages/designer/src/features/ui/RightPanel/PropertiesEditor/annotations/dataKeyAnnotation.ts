import {createAnnotation} from '@react-form-builder/core'

/**
 * The annotation for the 'dataKey' property of the component.
 */
export const dataKey = createAnnotation('dataKey').typed('string').calculable(false).build('dataKey')
