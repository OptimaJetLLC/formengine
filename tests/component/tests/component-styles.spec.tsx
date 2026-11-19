import {createView, FormViewer, FormViewerProps} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {isBrowserMode} from '../config/isBrowserMode'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    css: {
      any: {
        string: 'background-color: rgba(0, 255, 255); min-width: 100px; min-height: 100px;',
      },
    },
    htmlAttributes: [
      {
        name: 'data-testid',
        value: 'screen',
      },
    ],
    events: {
      onDidMount: [
        {
          name: 'handleOnDidMount',
          type: 'custom',
        },
      ],
      onWillUnmount: [
        {
          name: 'handleOnWillUnmount',
          type: 'custom',
        },
      ],
    },
  },
}

describe('Component styles tests', () => {
  it('Styles should be defined in strict mode', async () => {
    if (!isBrowserMode()) {
      return
    }

    const view = createView([])
    const getForm = () => JSON.stringify(form)

    const events: string[] = []
    const actions: FormViewerProps['actions'] = {
      handleOnDidMount: e => {
        events.push('mount')
      },
      handleOnWillUnmount: e => {
        events.push('unmount')
      },
    }

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} actions={actions} />, {
      reactStrictMode: true,
    })

    expect(events).toStrictEqual(['mount', 'unmount', 'mount'])

    const screen = await findByTestId('screen')
    expect(screen).toBeInTheDocument()

    expect(document.adoptedStyleSheets.length).toEqual(1)

    const styles = window.getComputedStyle(screen)
    expect(styles.backgroundColor).toEqual('rgb(0, 255, 255)')
  })
})
