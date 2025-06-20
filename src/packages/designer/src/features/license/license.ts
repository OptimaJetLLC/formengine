/**
 * The basic restrictions.
 */
export type RestrictionsBase = {
  /**
   * The list of allowed domains.
   */
  domains?: string[]
  /**
   * The strict check flag.
   */
  StrictCheck: boolean
}

/**
 * License-restricted feature names.
 */
export type LicenseFeatureName =
// allowed count of viewer translations, -1 for unlimited
  'ftLocaleCount' |
// designer customization
  'ftDesignerCustomization' |
// templates
  'ftComponentTemplates' |
// repeater component
  'ftComponentRepeater' |
// table component
  'ftComponentTable' |
// signature component
  'ftComponentSignature' |
// qr-code component
  'ftComponentQrCode' |
// preset components
  'ftComponentPreset'

/**
 * Feature description metadata.
 */
export type LicenseFeatureDescriptionMeta = Record<string, any>

/**
 * Feature description.
 */
export type LicenseFeatureDescription = LicenseFeatureDescriptionMeta & {
  /**
   * Feature name.
   */
  name: LicenseFeatureName
  /**
   * Check function.
   */
  check?: (...args: any[]) => boolean
}

/**
 * Type of license check error.
 */
export enum LicenseError {
  DOMAIN = 'errDomain',
  END_DATE_STRICT = 'errEndDateStrict',
  END_DATE = 'errEndDate',
  NO_KEY = 'errNoKey',
  PREFIX_MISMATCH = 'errPrefixMismatch',
  BROKEN_KEY_SEPARATOR = 'errBrokenSeparatorKey',
  BROKEN_KEY_LICENSE_SEPARATOR = 'errBrokenLicenseSeparator',
  NOT_VERIFIED = 'errNotVerified',
  INVALID = 'errLicenseInvalid' // generic error
}

/**
 * Restriction list.
 */
export type Restrictions = RestrictionsBase & Partial<Record<LicenseFeatureName, boolean | number>>

/**
 * License data format.
 */
export type LicenseData = {
  /**
   * Human-readable company name.
   */
  companyName: string
  /**
   * List of restrictions.
   */
  restrictions: Restrictions
  /**
   * License end date.
   */
  licenseEndDate: string
  /**
   * License format version.
   */
  version: 'v1' | 'v2'
}

type LicenseErrorDescription = {
  name: LicenseError
}

/**
 * List of license usage violations.
 */
export type Violations = Partial<Record<LicenseFeatureName | LicenseError, LicenseFeatureDescription | LicenseErrorDescription>>
