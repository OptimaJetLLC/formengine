import {ComponentData, FormViewerProps} from '@react-form-builder/core'
import {fireEvent, waitFor} from '@testing-library/react'
import {renderForm} from '../util/renderRsuiteForm'

const wizardForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'wizard',
        type: 'RsWizard',
        dataKey: 'wizard',
        children: [
          {
            key: 'rsWizardStep1',
            type: 'RsWizardStep',
            props: {
              label: {
                value: 'Step 1',
              },
            },
          },
          {
            key: 'rsWizardStep2',
            type: 'RsWizardStep',
            props: {
              label: {
                value: 'Step 2',
              },
            },
          },
        ],
        events: {
          onNext: [
            {
              name: 'onButtonClick',
              type: 'custom',
            },
          ],
          onPrev: [
            {
              name: 'onButtonClick',
              type: 'custom',
            },
          ],
          onFinish: [
            {
              name: 'onButtonClick',
              type: 'custom',
            },
          ],
        },
      },
    ],
  },
}

describe('RsWizard tests', () => {
  it('Wizard buttons should provide an event and a container in button events', async () => {
    const elements: HTMLButtonElement[] = []

    const actions: FormViewerProps['actions'] = {
      onButtonClick: e => {
        const {args} = e
        elements.push(args[0].target)
      },
    }
    const {findByText, formData} = renderForm(wizardForm, {actions})

    fireEvent.click(await findByText('Next'))
    fireEvent.click(await findByText('Previous'))
    fireEvent.click(await findByText('Next'))
    fireEvent.click(await findByText('Finish'))

    await waitFor(() => {
      expect(elements).toHaveLength(4)
    })

    elements.forEach(element => {
      expect(element).toBeInstanceOf(HTMLButtonElement)
    })

    // FE-1562
    const wizardFieldItem = (formData as unknown as ComponentData).allComponentFields?.find(f => f.dataKey === 'wizard')
    expect(wizardFieldItem).toBeDefined()
    expect(typeof wizardFieldItem?.field?.value).toBe('number')
  })
})
