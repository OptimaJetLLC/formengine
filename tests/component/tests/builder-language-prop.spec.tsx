import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {useState} from 'react'
import {expect} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'

const form = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'rsButton1',
        type: 'RsButton',
        props: {},
        htmlAttributes: [{name: 'data-testid', value: 'test-button'}],
      },
    ],
  },
  localization: {},
  languages: [
    {
      code: 'en',
      dialect: 'US',
      name: 'English',
      description: 'American English',
      bidi: 'ltr',
    },
  ],
  defaultLanguage: 'en-US',
}

const getForm = () => JSON.stringify(form)

describe('FormBuilder builderLanguage prop', () => {
  const originalLsFlag = (globalThis as any).FORM_BUILDER_DESIGNER_DISABLE_LOCAL_STORAGE

  beforeAll(() => {
    ;(globalThis as any).FORM_BUILDER_DESIGNER_DISABLE_LOCAL_STORAGE = 'true'
  })

  afterAll(() => {
    if (originalLsFlag === undefined) {
      delete (globalThis as any).FORM_BUILDER_DESIGNER_DISABLE_LOCAL_STORAGE
    } else {
      ;(globalThis as any).FORM_BUILDER_DESIGNER_DISABLE_LOCAL_STORAGE = originalLsFlag
    }
  })

  it('marks the matching language item active for a valid builderLanguage', async () => {
    const {container, findByTestId} = await renderBuilder(form, {
      defaultBuilderLanguage: 'fr-FR',
    })

    expect(await findByTestId('test-button')).toBeInTheDocument()

    await waitFor(() => {
      const frItem = container.querySelector('li[data-event-key="fr-FR"]')
      expect(frItem).toHaveAttribute('aria-checked', 'true')
    })
  })

  it('falls back to default language in the menu when builderLanguage is unknown', async () => {
    const {container, findByTestId} = await renderBuilder(form, {
      defaultBuilderLanguage: 'xx-YY',
    })

    expect(await findByTestId('test-button')).toBeInTheDocument()

    await waitFor(() => {
      const enItem = container.querySelector('li[data-event-key="en-US"]')
      expect(enItem).toHaveAttribute('aria-checked', 'true')
    })
  })

  it('updates the active language item when builderLanguage changes', async () => {
    const ToggleTest = () => {
      const [lang, setLang] = useState<'fr-FR' | 'de-DE'>('fr-FR')
      return (
        <>
          <button data-testid="set-de" type="button" onClick={() => setLang('de-DE')}>
            use-de
          </button>
          <FormBuilder defaultBuilderLanguage={lang} getForm={getForm} view={builderViewWithCss} />
        </>
      )
    }

    const {container, findByTestId} = render(<ToggleTest />)

    expect(await findByTestId('test-button')).toBeInTheDocument()

    await waitFor(() => {
      expect(container.querySelector('li[data-event-key="fr-FR"]')).toHaveAttribute('aria-checked', 'true')
    })

    fireEvent.click(await findByTestId('set-de'))

    await waitFor(() => {
      expect(container.querySelector('li[data-event-key="de-DE"]')).toHaveAttribute('aria-checked', 'true')
    })
  })

  it('does not override builder chrome when only FormViewer language is set', async () => {
    const {container, findByTestId} = await renderBuilder(form, {
      defaultViewerLanguage: 'de-DE',
    })

    expect(await findByTestId('test-button')).toBeInTheDocument()

    await waitFor(() => {
      const enItem = container.querySelector('li[data-event-key="en-US"]')
      expect(enItem).toHaveAttribute('aria-checked', 'true')
    })
  })

  it('allows builder chrome and form preview languages to differ', async () => {
    const {container, findByTestId} = await renderBuilder(form, {
      defaultBuilderLanguage: 'fr-FR',
      defaultViewerLanguage: 'de-DE',
    })

    expect(await findByTestId('test-button')).toBeInTheDocument()

    await waitFor(() => {
      expect(container.querySelector('li[data-event-key="fr-FR"]')).toHaveAttribute('aria-checked', 'true')
    })
  })
})
