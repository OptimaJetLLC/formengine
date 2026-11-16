import {isLicenseDefined} from '@react-form-builder/tests-common/lib/is-license-defined'
import {describe, expect, it} from 'vitest'

describe('isLicenseDefined', () => {
  it('returns false for undefined, empty, and whitespace-only values', () => {
    expect(isLicenseDefined(undefined)).toBe(false)
    expect(isLicenseDefined('')).toBe(false)
    expect(isLicenseDefined('   ')).toBe(false)
  })

  it('returns true for a non-empty license key', () => {
    expect(isLicenseDefined('license-key')).toBe(true)
  })
})
