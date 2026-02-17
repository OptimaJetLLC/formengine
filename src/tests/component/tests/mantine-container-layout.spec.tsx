import {MantineBuilder} from '@react-form-builder/apps-common-designer'
import {view} from '@react-form-builder/components-mantine'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {render} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {togglePreview} from '../util/controls'
import {renderForm} from '../util/renderMantineForm'

const form = {
  version: '1',
  tooltipType: 'MtTooltip',
  modalType: 'MtDialog',
  errorType: 'MtErrorWrapper',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'mtTextInput1',
        type: 'MtTextInput',
        props: {},
        htmlAttributes: [
          {name: 'data-testid', value: 'mtTextInput1'},
        ],
      },
      {
        key: 'mtContainer1',
        type: 'MtContainer',
        props: {
          strategy: {
            value: 'grid',
          },
        },
        children: [
          {
            key: 'mtTextInput2',
            type: 'MtTextInput',
            props: {},
            htmlAttributes: [
              {name: 'data-testid', value: 'mtTextInput2'},
            ],
          },
          {
            key: 'mtTextInput3',
            type: 'MtTextInput',
            props: {},
            htmlAttributes: [
              {name: 'data-testid', value: 'mtTextInput3'},
            ],
          },
        ],
        css: {
          any: {
            object: {
              flexDirection: 'row',
            },
          },
        },
        htmlAttributes: [
          {name: 'data-testid', value: 'mtContainer1'},
        ],
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

const expectInputToFillParentWidth = (input: HTMLElement) => {
  const parent = input.parentElement as HTMLElement | null
  if (!parent) {
    throw new Error('Input parent element is not defined')
  }

  const inputWidth = input.getBoundingClientRect().width
  const parentWidth = parent.getBoundingClientRect().width
  const parentStyle = getComputedStyle(parent)
  const paddingLeft = parseFloat(parentStyle.paddingLeft || '0')
  const paddingRight = parseFloat(parentStyle.paddingRight || '0')
  const contentWidth = parentWidth - paddingLeft - paddingRight
  const delta = Math.abs(contentWidth - inputWidth)

  expect(delta).toBeLessThanOrEqual(contentWidth * 0.05)
}

describe('MtContainer layout with nested MtTextInput components', () => {

  it('should render nested text inputs that fill their container width in designer mode', async () => {
    const renderResult = render(
      <MantineBuilder
        getForm={getForm}
        licenseKey={generatedLicenseKey}
      />
    )

    const firstInput = await renderResult.findByTestId('mtTextInput2')
    const secondInput = await renderResult.findByTestId('mtTextInput3')

    expectInputToFillParentWidth(firstInput as HTMLElement)
    expectInputToFillParentWidth(secondInput as HTMLElement)
  })

  it('should render nested text inputs that fill their container width in viewer mode', async () => {
    const renderResult = render(
      <MantineBuilder
        getForm={getForm}
        licenseKey={generatedLicenseKey}
      />
    )

    await togglePreview(renderResult)

    const firstInput = await renderResult.findByTestId('mtTextInput2')
    const secondInput = await renderResult.findByTestId('mtTextInput3')

    expectInputToFillParentWidth(firstInput as HTMLElement)
    expectInputToFillParentWidth(secondInput as HTMLElement)
  })

  it('should render nested text inputs that fill their container width in standalone FormViewer', async () => {
    const {findByTestId} = renderForm(form, {view})

    const firstInput = await findByTestId('mtTextInput2')
    const secondInput = await findByTestId('mtTextInput3')

    expectInputToFillParentWidth(firstInput as HTMLElement)
    expectInputToFillParentWidth(secondInput as HTMLElement)
  })
})
