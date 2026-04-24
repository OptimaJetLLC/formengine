import type {PersistedForm} from '@react-form-builder/core'
import {describe, expect, it} from 'vitest'
import {parseForm} from '../util/parseForm'
import {renderBuilder} from '../util/renderBuilder'
import {asyncAct} from './asyncAct'
import formEnDe from './forms/localization-empty-en-de.json'
import singleLangForm from './forms/localization-single-lang-form.json'

const textareaTestId = 'localization-empty-save-textarea'

type FormLocalization = {
  setLocalization: (
    languageFullCode: string,
    componentKey: string,
    propertyName: string,
    type: string,
    value: string,
  ) => void
  hasLocalization: (componentKey: string, propertyName: string, type: string) => boolean
}

const getFormLocalization = (getFormBuilder: () => unknown): FormLocalization => {
  const builder = getFormBuilder() as { builderStore: { viewer: { form: { localization: FormLocalization } } } }
  return builder.builderStore.viewer.form.localization
}

describe('Localization empty value on save', () => {
  it('remove the entry for the selected language from persisted localization when the value is cleared on save', async () => {
    const {getFormBuilder, findByTestId} = await renderBuilder(formEnDe)
    await findByTestId(textareaTestId)
    const getFormJson = () => parseForm(getFormBuilder()?.formAsString)
    const persisted = formEnDe as unknown as PersistedForm
    expect(getFormJson()?.localization).toStrictEqual(persisted.localization)

    const localization = getFormLocalization(getFormBuilder)
    await asyncAct(async () => {
      localization.setLocalization('de-DE', 'locText', 'placeholder', 'component', '')
    })

    const enUs = persisted.localization?.['en-US']
    expect(enUs).toBeDefined()
    const expectedLocalization: PersistedForm['localization'] = {
      'en-US': enUs!,
    }

    expect(getFormJson()?.localization).toStrictEqual(expectedLocalization)
  })

  it('remove whitespace-only values and clears an empty language bucket', async () => {
    const {getFormBuilder, findByTestId} = await renderBuilder(formEnDe)
    await findByTestId(textareaTestId)
    const localization = getFormLocalization(getFormBuilder)
    await asyncAct(async () => {
      localization.setLocalization('en-US', 'locText', 'placeholder', 'component', '   ')
      localization.setLocalization('de-DE', 'locText', 'placeholder', 'component', '')
    })

    const parsed = parseForm(getFormBuilder()?.formAsString)
    expect(parsed?.localization).toBeUndefined()
  })

  it('persists non-empty strings including leading and trailing spaces', async () => {
    const {getFormBuilder, findByTestId} = await renderBuilder(formEnDe)
    await findByTestId(textareaTestId)
    const localization = getFormLocalization(getFormBuilder)
    await asyncAct(async () => {
      localization.setLocalization('en-US', 'locText', 'placeholder', 'component', '  hello  ')
    })
    const parsed = parseForm(getFormBuilder()?.formAsString)
    expect(parsed?.localization?.['en-US']?.locText?.component?.placeholder).toBe('  hello  ')
  })

  it('hasLocalization is false after the last language entry for the property is removed', async () => {
    const {getFormBuilder, findByTestId} = await renderBuilder(formEnDe)
    await findByTestId(textareaTestId)
    const localization = getFormLocalization(getFormBuilder)
    await asyncAct(async () => {
      localization.setLocalization('en-US', 'locText', 'placeholder', 'component', '')
      localization.setLocalization('de-DE', 'locText', 'placeholder', 'component', '')
    })
    expect(localization.hasLocalization('locText', 'placeholder', 'component')).toBe(false)
  })

  it('clears persisted localization when the only configured language is emptied', async () => {
    const {getFormBuilder, findByTestId} = await renderBuilder(singleLangForm)
    await findByTestId('localization-single-lang-textarea')
    const localization = getFormLocalization(getFormBuilder)
    await asyncAct(async () => {
      localization.setLocalization('en-US', 'locTextSingle', 'placeholder', 'component', '')
    })
    expect(parseForm(getFormBuilder()?.formAsString)?.localization).toBeUndefined()
    expect(localization.hasLocalization('locTextSingle', 'placeholder', 'component')).toBe(false)
  })
})
