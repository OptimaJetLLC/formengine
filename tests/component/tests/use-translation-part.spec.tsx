import {renderHook} from '@testing-library/react'
import i18next from 'i18next'
import type {ReactNode} from 'react'
import {I18nextProvider, initReactI18next} from 'react-i18next'
import {beforeAll, describe, expect, it} from 'vitest'
import {useTranslationPart} from '../../../packages/designer/src/features/localization/hooks'

const i18n = i18next.createInstance()

beforeAll(async () => {
  await i18n.use(initReactI18next).init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          toolbar: {
            clone: 'Clone',
          },
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
    missingKeyNoValueFallbackToKey: false,
    react: {
      useSuspense: false,
    },
  })
})

const wrapper = ({children}: {children: ReactNode}) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>

describe('useTranslationPart', () => {
  it('returns the translation for an existing key under the path prefix', () => {
    const {result} = renderHook(() => useTranslationPart('toolbar'), {wrapper})
    expect(result.current('clone')).toBe('Clone')
  })

  it('returns an empty string for a missing key instead of the raw key path', () => {
    const {result} = renderHook(() => useTranslationPart('toolbar'), {wrapper})
    expect(result.current('doesNotExist')).toBe('')
    expect(i18n.t('toolbar.doesNotExist')).toBe('toolbar.doesNotExist')
  })
})
