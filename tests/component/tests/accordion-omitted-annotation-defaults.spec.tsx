import {fireEvent, waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderForm} from '../util/renderForm'

const accordionWithoutPersistedPanelDefaults = {
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'accordion',
        type: 'RsAccordion',
        props: {
          accordion: {value: true},
          defaultActiveKey: {value: '1'},
        },
        children: [
          {
            key: 'panel1',
            type: 'RsAccordionPanel',
            props: {
              eventKey: {value: '1'},
            },
            children: [
              {
                key: 'label1',
                type: 'RsLabel',
                props: {
                  text: {value: 'Content One'},
                },
              },
            ],
          },
          {
            key: 'panel2',
            type: 'RsAccordionPanel',
            props: {
              eventKey: {value: '2'},
            },
            children: [
              {
                key: 'label2',
                type: 'RsLabel',
                props: {
                  text: {value: 'Content Two'},
                },
              },
            ],
          },
        ],
      },
    ],
  },
}

describe('RsAccordion when panel annotation defaults were not persisted', () => {
  it('still shows the annotation default header text in the viewer', async () => {
    const {findByText, findAllByText} = renderForm(accordionWithoutPersistedPanelDefaults)

    expect(await findByText('Content One')).toBeVisible()
    expect(await findAllByText('Panel')).toHaveLength(2)
  })

  it('still expands and collapses panels by eventKey', async () => {
    const {findByText, getByText} = renderForm(accordionWithoutPersistedPanelDefaults)

    expect(await findByText('Content One')).toBeVisible()

    const panelTwoButton = document.querySelectorAll<HTMLButtonElement>('.rs-panel-btn')[1]
    expect(panelTwoButton).toBeDefined()
    fireEvent.click(panelTwoButton)

    await waitFor(() => {
      expect(panelTwoButton).toHaveAttribute('aria-expanded', 'true')
      expect(getByText('Content Two')).toBeVisible()
    })

    const panelOneButton = document.querySelectorAll<HTMLButtonElement>('.rs-panel-btn')[0]
    expect(panelOneButton).toHaveAttribute('aria-expanded', 'false')
  })
})
