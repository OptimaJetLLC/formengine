import {createNonNullableContext} from '@react-form-builder/core'
import type {LicenseFeatureDescription, Violations} from './license'

/**
 * License check context.
 */
export type LicenseContext = {
  /**
   * Indicates whether the license key is valid (excluding feature checks).
   */
  valid: boolean,
  /**
   * Array of violation messages.
   */
  missing: Violations,
  /**
   * Function to check license restriction.
   */
  checkLicense: (features: Array<LicenseFeatureDescription>, ...args: any) => void,
}

export const [
  useLicense,
  LicenseProvider
] = createNonNullableContext<LicenseContext>('LicenseContext')
