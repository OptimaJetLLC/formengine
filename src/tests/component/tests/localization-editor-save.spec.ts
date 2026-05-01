import {describe, expect, it} from 'vitest'
import {isWhitespaceOnlyLocalizationValue} from '../../../packages/designer/src/features/localization/LocalizationEditor'

describe('Localization editor save behavior', () => {
  it('detects whitespace-only values as bypass candidates', () => {
    expect(isWhitespaceOnlyLocalizationValue('   ')).toBe(true)
    expect(isWhitespaceOnlyLocalizationValue('\t \n')).toBe(true)
  })

  it('does not detect empty or non-whitespace values as bypass candidates', () => {
    expect(isWhitespaceOnlyLocalizationValue('')).toBe(false)
    expect(isWhitespaceOnlyLocalizationValue('abc')).toBe(false)
    expect(isWhitespaceOnlyLocalizationValue('  abc')).toBe(false)
  })
})
