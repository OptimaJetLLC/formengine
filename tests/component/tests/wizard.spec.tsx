import {ComponentData, FormViewerProps} from '@react-form-builder/core'
import {act, fireEvent, waitFor} from '@testing-library/react'
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
  it('keeps step navigation mounted when a component key is renamed', async () => {
    const {findByText, getByText, formData} = renderForm(wizardForm)
    const label = await findByText('Step 1')
    const navigationItem = label.closest('.rs-steps-item')
    expect(navigationItem).toBeInTheDocument()
    const wizard = (formData as ComponentData).findByKey('wizard')!

    act(() => {
      wizard.children[0].store.key = 'renamedStep'
    })

    expect(getByText('Step 1')).toBe(label)
    expect(getByText('Step 1').closest('.rs-steps-item')).toBe(navigationItem)
  })

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
