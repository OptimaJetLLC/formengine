import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder, FormBuilderProps} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {render, waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

const view = new BuilderView(rSuiteComponents.map(c => c.build()))

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'rsButton1',
        type: 'RsButton',
        htmlAttributes: [
          {
            name: 'data-testid',
            value: 'test-button'
          }
        ]
      }
    ]
  }
}

const getForm = () => JSON.stringify(form)

describe('Language switch customization', () => {
  it('should apply customization to the entire language switch menu', async () => {
    const customization: FormBuilderProps['customization'] = {
      MainMenu_Item_LanguageSwitch: {
        className: 'custom-language-switch-menu'
      }
    }

    const {container, findByTestId} = render(
      <FormBuilder
        view={view}
        getForm={getForm}
        licenseKey={generatedLicenseKey}
        customization={customization}
      />
    )

    // Wait for the form to load
    await findByTestId('test-button')

    // The language switch menu should be in the document
    // Look for language items by data-event-key as in existing tests
    const enItem = container.querySelector('li[data-event-key="en-US"]')
    const deItem = container.querySelector('li[data-event-key="de-DE"]')

    // At least one language item should be present
    expect(enItem || deItem).toBeTruthy()

    // Check that the language switch wrapper has the custom class
    const languageSwitchWrapper = container.querySelector('.FE_MainMenu_Item_LanguageSwitch')
    expect(languageSwitchWrapper).toBeInTheDocument()
    expect(languageSwitchWrapper).toHaveClass('custom-language-switch-menu')
  })

  it('should customize individual language items', async () => {
    const customization: FormBuilderProps['customization'] = {
      MainMenu_Item_LanguageItem_en_US: {
        customRenderer: () => (
          <div data-testid="custom-english-item">
            🇺🇸 Custom English
          </div>
        )
      },
      MainMenu_Item_LanguageItem_de_DE: {
        customRenderer: () => (
          <div data-testid="custom-german-item">
            🇩🇪 Custom German
          </div>
        )
      }
    }

    const {findByTestId, queryByTestId} = render(
      <FormBuilder
        view={view}
        getForm={getForm}
        licenseKey={generatedLicenseKey}
        customization={customization}
      />
    )

    await findByTestId('test-button')

    // Language items should be rendered with custom content
    await waitFor(() => {
      expect(queryByTestId('custom-english-item')).toBeInTheDocument()
      expect(queryByTestId('custom-german-item')).toBeInTheDocument()
    })
  })

  it('should apply className customization to language items', async () => {
    const customization: FormBuilderProps['customization'] = {
      MainMenu_Item_LanguageItem_en_US: {
        className: 'custom-english-item-class'
      },
      MainMenu_Item_LanguageItem_de_DE: {
        className: 'custom-german-item-class'
      }
    }

    const {container, findByTestId} = render(
      <FormBuilder
        view={view}
        getForm={getForm}
        licenseKey={generatedLicenseKey}
        customization={customization}
      />
    )

    await findByTestId('test-button')

    // Wait for language items to appear
    await waitFor(() => {
      const englishItem = container.querySelector('li[data-event-key="en-US"]')
      const germanItem = container.querySelector('li[data-event-key="de-DE"]')
      expect(englishItem).toBeInTheDocument()
      expect(germanItem).toBeInTheDocument()
    })

    // Check custom classes
    const englishItem = container.querySelector('.FE_MainMenu_Item_LanguageItem_en_US')
    const germanItem = container.querySelector('.FE_MainMenu_Item_LanguageItem_de_DE')

    expect(englishItem).toHaveClass('custom-english-item-class')
    expect(germanItem).toHaveClass('custom-german-item-class')
  })

  it('should hide entire language switch menu when configured', async () => {
    const customization: FormBuilderProps['customization'] = {
      MainMenu_Item_LanguageSwitch: {
        hidden: true
      }
    }

    const {container, findByTestId} = render(
      <FormBuilder
        view={view}
        getForm={getForm}
        licenseKey={generatedLicenseKey}
        customization={customization}
      />
    )

    await findByTestId('test-button')

    // Check that language items are not in the document
    const enItem = container.querySelector('li[data-event-key="en-US"]')
    const deItem = container.querySelector('li[data-event-key="de-DE"]')

    expect(enItem).not.toBeInTheDocument()
    expect(deItem).not.toBeInTheDocument()
  })
})
