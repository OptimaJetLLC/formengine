import type {PersistedForm} from '@react-form-builder/core'
import {describe, expect, it} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'
import {parseForm} from '../util/parseForm'
import {renderBuilder} from '../util/renderBuilder'
import {switchToViewerMode} from './designerUtils'
import formEnDe from './forms/localization-empty-en-de.json'
import singleLangForm from './forms/localization-single-lang-form.json'
import {getBuilderFormLocalization} from './localizationTestUtils'

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

describe('designer localization persistence and viewer resolution', () => {
  it('removes the entry for the selected language from persisted localization when the value is cleared on save', async () => {
    const {getFormBuilder, findByTestId} = await renderBuilder(formEnDe)
    await findByTestId(textareaTestId)
    const getFormJson = () => parseForm(getFormBuilder()?.formAsString)
    const persisted = formEnDe as unknown as PersistedForm
    expect(getFormJson()?.localization).toStrictEqual(persisted.localization)

    const localization = getBuilderFormLocalization<FormLocalization>(getFormBuilder)
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

  it('persists non-empty strings including leading and trailing spaces', async () => {
    const {getFormBuilder, findByTestId} = await renderBuilder(formEnDe)
    await findByTestId(textareaTestId)
    const localization = getBuilderFormLocalization<FormLocalization>(getFormBuilder)
    await asyncAct(async () => {
      localization.setLocalization('en-US', 'locText', 'placeholder', 'component', '  hello  ')
    })
    const parsed = parseForm(getFormBuilder()?.formAsString)
    expect(parsed?.localization?.['en-US']?.locText?.component?.placeholder).toBe('  hello  ')
  })

  it('hasLocalization is false after the last language entry for the property is removed', async () => {
    const {getFormBuilder, findByTestId} = await renderBuilder(formEnDe)
    await findByTestId(textareaTestId)
    const localization = getBuilderFormLocalization<FormLocalization>(getFormBuilder)
    await asyncAct(async () => {
      localization.setLocalization('en-US', 'locText', 'placeholder', 'component', '')
      localization.setLocalization('de-DE', 'locText', 'placeholder', 'component', '')
    })
    expect(localization.hasLocalization('locText', 'placeholder', 'component')).toBe(false)
  })

  it('keeps computeType as localization when localization values are fully cleared', async () => {
    const {getFormBuilder, findByTestId} = await renderBuilder(formEnDe)
    await findByTestId(textareaTestId)
    const localization = getBuilderFormLocalization<FormLocalization>(getFormBuilder)

    await asyncAct(async () => {
      localization.setLocalization('en-US', 'locText', 'placeholder', 'component', '')
      localization.setLocalization('de-DE', 'locText', 'placeholder', 'component', '')
    })

    const parsed = parseForm(getFormBuilder()?.formAsString)
    const placeholder = parsed?.form?.children?.[0]?.props?.placeholder
    expect(placeholder?.computeType).toBe('localization')
    expect(parsed?.localization).toBeUndefined()
  })

  it('clears persisted localization when the only configured language is emptied', async () => {
    const {getFormBuilder, findByTestId} = await renderBuilder(singleLangForm)
    await findByTestId('localization-single-lang-textarea')
    const localization = getBuilderFormLocalization<FormLocalization>(getFormBuilder)
    await asyncAct(async () => {
      localization.setLocalization('en-US', 'locTextSingle', 'placeholder', 'component', '')
    })
    expect(parseForm(getFormBuilder()?.formAsString)?.localization).toBeUndefined()
    expect(localization.hasLocalization('locTextSingle', 'placeholder', 'component')).toBe(false)
  })

  it('applies updated localization in preview mode and persists it in form json', async () => {
    const {getFormBuilder, findByTestId, findByText} = await renderBuilder(formEnDe)
    await findByTestId(textareaTestId)
    const localization = getBuilderFormLocalization<FormLocalization>(getFormBuilder)

    await asyncAct(async () => {
      localization.setLocalization('en-US', 'locText', 'placeholder', 'component', 'Preview placeholder')
    })

    await switchToViewerMode(findByText)
    const textarea = await findByTestId(textareaTestId)
    expect(textarea).toHaveAttribute('placeholder', 'Preview placeholder')

    const parsed = parseForm(getFormBuilder()?.formAsString)
    expect(parsed?.localization?.['en-US']?.locText?.component?.placeholder).toBe('Preview placeholder')
  })

  it('persists whitespace-only in JSON and re-resolves via fluent in preview (fallback after trim)', async () => {
    const {getFormBuilder, findByTestId, findByText} = await renderBuilder(formEnDe)
    await findByTestId(textareaTestId)
    const localization = getBuilderFormLocalization<FormLocalization>(getFormBuilder)

    await switchToViewerMode(findByText)
    const textareaBefore = await findByTestId(textareaTestId)
    expect(textareaBefore).toHaveAttribute('placeholder', 'Localized placeholder')

    await asyncAct(async () => {
      localization.setLocalization('en-US', 'locText', 'placeholder', 'component', '   ')
    })

    const textareaAfter = await findByTestId(textareaTestId)
    expect(textareaAfter).toHaveAttribute('placeholder', 'RsTextArea')

    const parsed = parseForm(getFormBuilder()?.formAsString)
    expect(parsed?.localization?.['en-US']?.locText?.component?.placeholder).toBe('   ')
  })
})
