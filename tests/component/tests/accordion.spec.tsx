import {fireEvent, waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderForm} from '../util/renderForm'

const createAccordionForm = (accordion = true) => ({
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'accordion',
        type: 'RsAccordion',
        props: {
          accordion: {value: accordion},
          defaultActiveKey: {value: '1'},
        },
        children: [
          {
            key: 'panel1',
            type: 'RsAccordionPanel',
            props: {
              header: {value: 'Panel One'},
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
              header: {value: 'Panel Two'},
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
})

/**
 * Viewer interaction only: click-driven expand/collapse.
 * Builder/viewer prop wiring is covered in module accordion-mode.spec.tsx.
 */
describe('RsAccordion viewer interaction', () => {
  it('expands the clicked panel and collapses the previous one when accordion is enabled', async () => {
    const {findByText, getByText} = renderForm(createAccordionForm())

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

  it('allows collapsing the active panel by clicking its header again', async () => {
    const {findByText} = renderForm(createAccordionForm())

    expect(await findByText('Content One')).toBeVisible()

    const panelOneButton = document.querySelectorAll<HTMLButtonElement>('.rs-panel-btn')[0]
    fireEvent.click(panelOneButton)

    await waitFor(() => {
      expect(panelOneButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('keeps previously expanded panels open when accordion is disabled', async () => {
    const {findByText} = renderForm(createAccordionForm(false))

    expect(await findByText('Content One')).toBeVisible()

    const [panelOneButton, panelTwoButton] = document.querySelectorAll<HTMLButtonElement>('.rs-panel-btn')
    expect(panelOneButton).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(panelTwoButton)

    await waitFor(() => {
      expect(panelOneButton).toHaveAttribute('aria-expanded', 'true')
      expect(panelTwoButton).toHaveAttribute('aria-expanded', 'true')
    })
  })
})
