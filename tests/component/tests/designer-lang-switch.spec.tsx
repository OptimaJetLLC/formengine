import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {expect} from 'vitest'

const view = new BuilderView(rSuiteComponents.map(c => c.build()))

const getForm = () => {
  return JSON.stringify({
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
  })
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
})
