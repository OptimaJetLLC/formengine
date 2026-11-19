import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'
import {render} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

describe('FE-1740 AlwaysRejectFormStorage.ts:8 Uncaught (in promise) Error: Not implemented', () => {
  it('Should render a form without errors', async () => {
    const emptyForm = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'button',
            type: 'RsButton',
            htmlAttributes: [
              {
                name: 'data-testid',
                value: 'test-button',
              },
            ],
          },
        ],
      },
    }
    const getForm = () => JSON.stringify(emptyForm)

    localStorage.setItem('leftPanelActiveTab', 'forms')

    const {findByTestId} = render(<FormBuilder view={builderViewWithCss} getForm={getForm} />)

    expect(await findByTestId('test-button')).toBeInTheDocument()
  })
})
