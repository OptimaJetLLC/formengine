import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {isDesignerLocalStorageEnabled} from '@react-form-builder/designer/src/utils/isDesignerLocalStorageEnabled'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {expect} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'

const view = new BuilderView(rSuiteComponents.map(c => c.build()))

const form = {
  'version': '1',
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'props': {},
    'children': [
      {
        'key': 'rsButton1',
        'type': 'RsButton',
        'props': {},
        'htmlAttributes': [
          {
            'name': 'data-testid',
            'value': 'test-button'
          }
        ]
      }
    ]
  },
  'localization': {},
  'languages': [
    {
      'code': 'en',
      'dialect': 'US',
      'name': 'English',
      'description': 'American English',
      'bidi': 'ltr'
    }
  ],
  'defaultLanguage': 'en-US'
}

const getForm = () => JSON.stringify(form)

const deDELang = {
  bidi: 'ltr',
  code: 'de',
  description: 'German',
  dialect: 'DE',
  name: 'Deutsch',
}

const enUSLang = {
  code: 'en',
  dialect: 'US',
  name: 'English',
  description: 'American English',
  bidi: 'ltr',
}


describe(`Changing the designer's language`, function () {
  it('Changing the designer\'s language should switch the interface language and component language', async () => {
    const {findByTestId, findAllByTestId, findByText, container} = render(<FormBuilder view={view} getForm={getForm}/>)

    // ok, the form is rendered
    expect(await findByTestId('test-button')).toBeInTheDocument()

    // select the component in the component tree
    fireEvent.click(await findByText('Tree'))
    fireEvent.click(await findByText('rsButton1', {selector: 'div'}))
    fireEvent.click(await findByText('Main'))

    const selectDescribe = await findAllByTestId('picker-describe')
    let selectLabelFound = false
    let foundItem: HTMLElement | undefined
    for (let i = 0; i < selectDescribe.length; i++) {
      if (selectDescribe[i].textContent?.includes('Select')) {
        selectLabelFound = true
        foundItem = selectDescribe[i]
        break
      }
    }

    // we need to find any Select element that does not have a value filled in, so there is a default placeholder
    expect(selectLabelFound).toBe(true)
    if (!foundItem) {
      throw new Error('Select label not found')
    }

    // let's change the language
    const deItem = container.querySelector('li[data-event-key="de-DE"]')
    if (!deItem) throw new Error('Language "de-DE" not found')
    fireEvent.click(deItem)

    // and now let's make sure that the placeholder has changed in the component
    const selector = foundItem.id
    await waitFor(() => expect(container.querySelector(`#${selector}`)).toHaveTextContent('Auswählen'))
  })

  it('Current language is set as active', async () => {
    const {findByTestId, container} = render(<FormBuilder view={view} getForm={getForm}/>)

    const htmlElement = container.parentElement?.parentElement
    const currentLang = htmlElement?.getAttribute('lang') ?? 'en-US'

    // ok, the form is rendered
    expect(await findByTestId('test-button')).toBeInTheDocument()

    const enItem = container.querySelector('li[data-event-key="en-US"]')
    if (!enItem) throw new Error('Language "en-US" not found')

    const deItem = container.querySelector('li[data-event-key="de-DE"]')
    if (!deItem) throw new Error('Language "de-DE" not found')

    const isEnglish = () => {
      if (!isDesignerLocalStorageEnabled()) return true
      return currentLang === 'en-US' || currentLang === 'en'
    }

    const currentLangItem = isEnglish() ? enItem : deItem
    const nextLangItem = isEnglish() ? deItem : enItem

    await waitFor(() => expect(currentLangItem).toHaveAttribute('aria-checked', 'true'))

    // let's change the language
    fireEvent.click(nextLangItem)

    // and make sure the current language is changed
    await waitFor(() => expect(currentLangItem).not.toHaveAttribute('aria-checked', 'true'))
    await waitFor(() => expect(nextLangItem).toHaveAttribute('aria-checked', 'true'))
  })

  it('Changing the designer\'s language should trigger onBuilderLanguageChange', async () => {
    const onBuilderLanguageChange = vi.fn()
    const {findByTestId, container} = await renderBuilder(form, {onBuilderLanguageChange})

    expect(await findByTestId('test-button')).toBeInTheDocument()

    const htmlElement = container.parentElement?.parentElement
    const currentLang = htmlElement?.getAttribute('lang') ?? 'en-US'

    const enItem = container.querySelector('li[data-event-key="en-US"]')
    if (!enItem) throw new Error('Language "en-US" not found')

    const deItem = container.querySelector('li[data-event-key="de-DE"]')
    if (!deItem) throw new Error('Language "de-DE" not found')

    const isEnglish = () => {
      if (!isDesignerLocalStorageEnabled()) return true
      return currentLang === 'en-US' || currentLang === 'en'
    }

    const nextLangItem = isEnglish() ? deItem : enItem
    const expectedLanguage = isEnglish() ? deDELang : enUSLang

    fireEvent.click(nextLangItem)

    await waitFor(() => {
      expect(onBuilderLanguageChange).toHaveBeenCalled()
    })
    const language = onBuilderLanguageChange.mock.calls[0][0]
    expect(language).toEqual(expectedLanguage)
  })

  it('Changing the forms\'s language should trigger onViewerLanguageChange', async () => {
    const onViewerLanguageChange = vi.fn()
    const {findByTestId} = await renderBuilder(form, {onViewerLanguageChange})

    const picker = await findByTestId('designer-form-language')
    fireEvent.click(picker)

    const popup = await findByTestId('picker-popup')
    const currentFormLanguage = popup.querySelector('div[role="option"][aria-selected="true"]')
    if (!currentFormLanguage) throw new Error('Current language is not found')

    const fullCode = currentFormLanguage.getAttribute('data-key')
    if (!fullCode) throw new Error('Cannot find current language code')

    const isEnglish = fullCode === 'en-US'
    const nextCode = isEnglish ? 'de-DE' : 'en-US'

    const nextLanguageItem = popup.querySelector(`div[data-key="${nextCode}"]`)
    if (!nextLanguageItem) throw new Error(`Language "${nextCode}" not found`)

    const expectedLanguage = isEnglish ? deDELang : enUSLang

    fireEvent.click(nextLanguageItem)

    await waitFor(() => {
      expect(onViewerLanguageChange).toHaveBeenCalled()
    })
    const language = onViewerLanguageChange.mock.calls[0][0]
    expect(language).toEqual(expectedLanguage)
  })
})
