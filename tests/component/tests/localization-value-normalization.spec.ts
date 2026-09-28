import {describe, expect, it} from 'vitest'
import {normalizeLocalizationValueForSave} from '../../../packages/designer/src/features/components/PropertyEditorWrapper/PropertyEditorWrapper'

describe('Localization value normalization for save', () => {
  it('removes leading spaces when value contains non-whitespace characters', () => {
    expect(normalizeLocalizationValueForSave('   hello')).toBe('hello')
    expect(normalizeLocalizationValueForSave('   hello  ')).toBe('hello  ')
  })

  it('preserves whitespace-only values as-is', () => {
    expect(normalizeLocalizationValueForSave('   ')).toBe('   ')
    expect(normalizeLocalizationValueForSave('\t \n')).toBe('\t \n')
  })

  it('keeps empty string unchanged', () => {
    expect(normalizeLocalizationValueForSave('')).toBe('')
  })
})
