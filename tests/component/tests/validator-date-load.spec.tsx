import {ltrCssLoader, RsLocalizationWrapper, rSuiteComponentsDescriptions, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {BiDi, BuilderView, type Validators} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {testLicense} from '@react-form-builder/tests-common/license/vaild'
import {fireEvent, RenderResult, render, within} from '@testing-library/react'
import format from 'date-fns/format'
import {expect} from 'vitest'

const testForm = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'rsCalendar1',
        type: 'RsCalendar',
        props: {},
        schema: {
          validations: [
            {
              key: 'min',
              args: {
                value: '2025-05-09T21:00:00.000Z',
              },
            },
            {
              key: 'max',
              args: {
                value: '2025-05-30T21:00:00.000Z',
              },
            },
            {
              key: 'testCustomDate',
              type: 'custom',
              args: {
                value: '2025-05-22T21:00:00.000Z',
                number: 10,
              },
            },
            {
              key: 'testCustomString',
              type: 'custom',
              args: {
                value: 'fdsfdsfds',
                number: 5,
              },
            },
          ],
        },
        htmlAttributes: [
          {
            name: 'data-testid',
            value: 'calendar',
          },
        ],
      },
      {
        key: 'rsDatePicker1',
        type: 'RsDatePicker',
        props: {},
        schema: {
          validations: [
            {
              key: 'min',
              args: {
                value: '2025-05-23T21:00:00.000Z',
              },
            },
            {
              key: 'max',
              args: {
                value: '2025-05-30T21:00:00.000Z',
              },
            },
            {
              key: 'testCustomDate',
              type: 'custom',
              args: {
                value: '2025-05-28T21:00:00.000Z',
                number: -5,
              },
            },
            {
              key: 'testCustomString',
              type: 'custom',
              args: {
                value: 'fdsfsdds',
                number: 15,
              },
            },
          ],
        },
        htmlAttributes: [
          {
            name: 'data-testid',
            value: 'datepicker',
          },
        ],
      },
    ],
    htmlAttributes: [
      {
        name: 'data-testid',
        value: 'mainScreen',
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

const getForm = () => JSON.stringify(testForm)

const defaultDate = '2025-06-12T21:00:00.000Z'

const formWithDateValidatorDefault = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'rsDatePickerWithDefault',
        type: 'RsDatePicker',
        schema: {
          validations: [
            {
              key: 'testCustomDateDefault',
              type: 'custom',
            },
          ],
        },
        htmlAttributes: [
          {
            name: 'data-testid',
            value: 'datepicker-with-default',
          },
        ],
      },
    ],
  },
}

const getFormWithDateValidatorDefault = () => JSON.stringify(formWithDateValidatorDefault)

const customValidators: Validators = {
  date: {
    testCustomDate: {
      params: [
        {key: 'value', type: 'date', required: false, default: undefined},
        {key: 'number', type: 'number', required: false, default: undefined},
      ],
      validate: (value, _, args) => {
        return true
      },
    },
    testCustomString: {
      params: [
        {key: 'value', type: 'string', required: false, default: undefined},
        {key: 'number', type: 'number', required: false, default: undefined},
      ],
      validate: (value, _, args) => {
        return true
      },
    },
  },
}

const view = new BuilderView(allComponentsBuilder)
  .withTemplates(['agreement'])
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withComponentLibraryDescription(rSuiteComponentsDescriptions)

const TestApp = () => <FormBuilder validators={customValidators} view={view} getForm={getForm} formName={'foo'} licenseKey={testLicense} />

const getValidatorInput = async (app: RenderResult, name: string, argName: string) => {
  const {findByText} = app

  const editor = (await findByText(name)).parentElement?.parentElement?.parentElement
  const target = (await within(editor as HTMLElement).findByText(argName)).parentElement?.parentElement
  const input = (target as HTMLElement).querySelector('.FE_PropertyInput input, textarea')

  return input as HTMLInputElement
}

const checkDateValueMatch = (dateStr: string, {placeholder, value}: HTMLInputElement) => {
  const date = format(new Date(dateStr), placeholder)

  return date === value
}

const checkInputValue = (targetValue: unknown, {value}: HTMLInputElement) => {
  return String(targetValue) === String(value)
}

describe('Date fields should be deserialized to date objects inside validations', function () {
  it('Editor should contain formated date values', async () => {
    const app = render(<TestApp />)
    const {findByText, findByTestId} = app

    const rulesBtn = await findByText('Rules')
    fireEvent.click(rulesBtn)

    const components = [await findByTestId('calendar'), await findByTestId('datepicker')]

    let cnt = 0
    for (const {
      schema: {validations},
    } of testForm.form.children) {
      fireEvent.click(components[cnt++])
      expect(checkDateValueMatch(validations[0].args.value, await getValidatorInput(app, 'Min', 'Value'))).toBeTruthy()
      expect(checkDateValueMatch(validations[1].args.value, await getValidatorInput(app, 'Max', 'Value'))).toBeTruthy()
      expect(checkDateValueMatch(validations[2].args.value, await getValidatorInput(app, 'testCustomDate', 'Value'))).toBeTruthy()
      expect(checkInputValue(validations[2].args.number, await getValidatorInput(app, 'testCustomDate', 'Number'))).toBeTruthy()
      expect(checkInputValue(validations[3].args.value, await getValidatorInput(app, 'testCustomString', 'Value'))).toBeTruthy()
      expect(checkInputValue(validations[3].args.number, await getValidatorInput(app, 'testCustomString', 'Number'))).toBeTruthy()
    }
  })

  it('Editor should format a string default of a date validator parameter', async () => {
    const customValidatorsWithDateDefault: Validators = {
      date: {
        testCustomDateDefault: {
          params: [{key: 'value', type: 'date', required: false, default: defaultDate}],
          validate: () => true,
        },
      },
    }

    const app = render(
      <FormBuilder
        validators={customValidatorsWithDateDefault}
        view={view}
        getForm={getFormWithDateValidatorDefault}
        formName={'foo'}
        licenseKey={testLicense}
      />
    )

    const {findByText, findByTestId} = app

    fireEvent.click(await findByText('Rules'))
    fireEvent.click(await findByTestId('datepicker-with-default'))

    const input = await getValidatorInput(app, 'testCustomDateDefault', 'Value')
    expect(checkDateValueMatch(defaultDate, input)).toBeTruthy()
  })
})
