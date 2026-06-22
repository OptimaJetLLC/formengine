import {FluentLocalizationEngine} from '@react-form-builder/core'
import {describe, expect, it} from 'vitest'
import {enUS, minimalFormData} from './fluent-localization-engine.test-helpers'

/**
 * Focused dot-placeholder smoke tests. Full coverage is in fluent-localization-engine.spec.ts.
 */
describe('FluentLocalizationEngine user-facing dots in placeholders', () => {
  const engine = new FluentLocalizationEngine('en-US')

  it('resolves {$user.name} from nested form data in testLocalization', () => {
    const result = engine.testLocalization(
      'Hello {$user.name}!',
      'test_msg',
      enUS,
      minimalFormData({user: {name: 'Ann'}}),
    )
    expect(result).toBe('Hello Ann!')
  })

  it('resolves {$a.b.c} from deeply nested form data', () => {
    const result = engine.testLocalization(
      'Value: {$a.b.c}',
      'test_msg_deep',
      enUS,
      minimalFormData({a: {b: {c: 'deep'}}}),
    )
    expect(result).toBe('Value: deep')
  })

  it('preserves literal dots in prose alongside nested placeholders', () => {
    const result = engine.testLocalization(
      'Ver 1.2 for {$user.name}',
      'test_msg_literal',
      enUS,
      minimalFormData({user: {name: 'Bob'}}),
    )
    expect(result).toBe('Ver 1.2 for Bob')
  })
})
