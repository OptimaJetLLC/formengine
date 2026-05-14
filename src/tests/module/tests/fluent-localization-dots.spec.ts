import {BiDi} from '../../../packages/core/src/features/localization/bidi'
import {FluentLocalizationEngine} from '../../../packages/core/src/features/localization/fluent/FluentLocalizationEngine'
import {Language} from '../../../packages/core/src/features/localization/language'
import type {IFormData} from '../../../packages/core/src/utils/IFormData'
import {describe, expect, it} from 'vitest'

const enUS = new Language('en', 'US', 'en-US', 'en-US', BiDi.LTR)

const minimalFormData = (data: Record<string, unknown>): IFormData =>
  ({
    data,
  }) as IFormData

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
