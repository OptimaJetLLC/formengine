import {view} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'
import {fireEvent, render} from '@testing-library/react'
import {expect} from 'vitest'

const dataTestId = 'last-name-test-id'

const testForm = {
  version: '1',
  actions: {
    addRepeaterElement: {
      body: "    const data = e.data[args.name] ?? []\n    if (typeof args.max !== 'undefined') {\n        if (data.length >= args.max) return\n    }\n    data.push({})\n    e.data[args.name] = [...data]",
      params: {
        name: 'string',
        max: 'number',
      },
    },
    increment: {
      body: '    let value = e.data[args.item] + 1\n    value = value > args.max ? args.max : value\n    e.data[args.item] = value',
      params: {
        item: 'string',
        max: 'number',
      },
    },
    decrement: {
      body: '    let value = e.data[args.item] - 1\n    value = value < args.min ? args.min : value\n    e.data[args.item] = value',
      params: {
        item: 'string',
        min: 'number',
      },
    },
    removeChildAge: {
      body: '    const data = e.data.childrenAges ?? []\n    const length = e.data.childrenAges.length\n    if (length) {\n        e.data.childrenAges = data.toSpliced(length - 1)\n    }',
      params: {},
    },
    removeParentRepeaterItem: {
      body: '  const data = e.parentData[args.name]\n  e.parentData[args.name] = data.toSpliced(e.index, 1)',
      params: {
        name: 'string',
      },
    },
    removeRepeaterElement: {
      body: '  const data = e.data[args.name]\n  if (data.length <= args.min) return\n  e.data[args.name] = data.toSpliced(data.length - 1, 1)',
      params: {
        name: 'string',
        min: 'number',
      },
    },
  },
  tooltipType: 'RsTooltip',
  errorType: 'RsErrorMessage',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'header',
        type: 'RsHeader',
        props: {
          content: {
            value: 'Hotel booking',
          },
        },
      },
      {
        key: 'date',
        type: 'RsDatePicker',
        props: {
          editable: {
            value: false,
          },
          oneTap: {
            value: true,
          },
          label: {
            value: 'Date',
          },
        },
      },
      {
        key: 'rsContainer1',
        type: 'RsContainer',
        props: {},
        children: [
          {
            key: 'bookButton',
            type: 'RsButton',
            props: {
              children: {
                value: 'Button',
                computeType: 'localization',
              },
              appearance: {
                value: 'primary',
              },
              color: {
                value: 'green',
              },
            },
            events: {
              onClick: [
                {
                  name: 'addRepeaterElement',
                  type: 'code',
                  args: {
                    name: 'rooms',
                  },
                },
              ],
            },
          },
        ],
      },
      {
        key: 'rooms',
        type: 'Repeater',
        props: {
          value: {
            value: [],
          },
        },
        children: [
          {
            key: 'rsContainer7',
            type: 'RsContainer',
            props: {},
            css: {
              any: {
                object: {
                  flexDirection: 'row',
                },
              },
            },
            children: [
              {
                key: 'rsContainer6',
                type: 'RsContainer',
                props: {},
                children: [
                  {
                    key: 'roomType',
                    type: 'RsDropdown',
                    props: {
                      cleanable: {
                        value: false,
                      },
                      data: {
                        value: [
                          {
                            value: 'standart',
                            label: 'Standart',
                          },
                          {
                            value: 'luxe',
                            label: 'Luxe',
                          },
                        ],
                      },
                      label: {
                        value: 'Room',
                      },
                    },
                    schema: {
                      validations: [
                        {
                          key: 'required',
                        },
                      ],
                    },
                    wrapperCss: {
                      any: {
                        object: {},
                      },
                    },
                  },
                  {
                    key: 'removeRoomButton',
                    type: 'RsButton',
                    props: {
                      children: {
                        value: 'Remove room',
                        computeType: 'function',
                        fnSource: '    const index = (form.nearestIndex ?? 0) + 1\n    return `Remove room #${index}`',
                      },
                    },
                    events: {
                      onClick: [
                        {
                          name: 'removeParentRepeaterItem',
                          type: 'code',
                          args: {
                            name: 'rooms',
                          },
                        },
                      ],
                    },
                  },
                  {
                    key: 'rsStaticContent1',
                    type: 'RsStaticContent',
                    props: {
                      content: {
                        computeType: 'localization',
                      },
                    },
                  },
                ],
              },
              {
                key: 'rsContainer5',
                type: 'RsContainer',
                props: {},
                children: [
                  {
                    key: 'rsContainer2',
                    type: 'RsContainer',
                    props: {},
                    css: {
                      any: {
                        object: {
                          flexDirection: 'row',
                        },
                      },
                    },
                    children: [
                      {
                        key: 'minusAdultButton',
                        type: 'RsButton',
                        props: {
                          children: {
                            value: '-',
                          },
                        },
                        wrapperCss: {
                          any: {
                            object: {
                              marginTop: 'auto',
                            },
                          },
                        },
                        events: {
                          onClick: [
                            {
                              name: 'decrement',
                              type: 'code',
                              args: {
                                item: 'adults',
                                min: 1,
                              },
                            },
                            {
                              name: 'removeRepeaterElement',
                              type: 'code',
                              args: {
                                name: 'names',
                                min: 1,
                              },
                            },
                          ],
                        },
                      },
                      {
                        key: 'adults',
                        type: 'RsNumberFormat',
                        props: {
                          allowNegative: {
                            value: false,
                          },
                          label: {
                            value: 'Adults',
                          },
                          value: {
                            value: 1,
                          },
                          disabled: {
                            value: true,
                          },
                        },
                        schema: {
                          validations: [],
                        },
                        wrapperCss: {
                          any: {
                            object: {
                              marginTop: 'auto',
                            },
                          },
                        },
                        tooltipProps: {
                          text: {
                            computeType: 'function',
                            fnSource: '    const index = form.nearestIndex ?? 0\n    return `Adults in room #${index + 1}`',
                          },
                        },
                      },
                      {
                        key: 'plusAdultButton',
                        type: 'RsButton',
                        props: {
                          children: {
                            value: '+',
                          },
                        },
                        wrapperCss: {
                          any: {
                            object: {
                              marginTop: 'auto',
                            },
                          },
                        },
                        events: {
                          onClick: [
                            {
                              name: 'increment',
                              type: 'code',
                              args: {
                                item: 'adults',
                                max: 5,
                              },
                            },
                            {
                              name: 'addRepeaterElement',
                              type: 'code',
                              args: {
                                name: 'names',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    key: 'rsContainer4',
                    type: 'RsContainer',
                    props: {},
                    css: {
                      any: {
                        object: {
                          flexDirection: 'row',
                        },
                      },
                    },
                    children: [
                      {
                        key: 'minusChildButton',
                        type: 'RsButton',
                        props: {
                          children: {
                            value: '-',
                          },
                        },
                        wrapperCss: {
                          any: {
                            object: {
                              marginTop: 'auto',
                            },
                          },
                        },
                        events: {
                          onClick: [
                            {
                              name: 'decrement',
                              type: 'code',
                              args: {
                                item: 'children',
                                min: 0,
                              },
                            },
                            {
                              name: 'removeChildAge',
                              type: 'code',
                            },
                          ],
                        },
                      },
                      {
                        key: 'children',
                        type: 'RsNumberFormat',
                        props: {
                          allowNegative: {
                            value: false,
                          },
                          label: {
                            value: 'Children',
                          },
                          value: {
                            value: 0,
                          },
                          disabled: {
                            value: true,
                          },
                        },
                        schema: {
                          validations: [],
                        },
                      },
                      {
                        key: 'plusChildButton',
                        type: 'RsButton',
                        props: {
                          children: {
                            value: '+',
                          },
                        },
                        wrapperCss: {
                          any: {
                            object: {
                              marginTop: 'auto',
                            },
                          },
                        },
                        events: {
                          onClick: [
                            {
                              name: 'increment',
                              type: 'code',
                              args: {
                                item: 'children',
                                max: 7,
                              },
                            },
                            {
                              name: 'addRepeaterElement',
                              type: 'code',
                              args: {
                                name: 'childrenAges',
                                max: 7,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    key: 'rsContainer3',
                    type: 'RsContainer',
                    props: {},
                    css: {
                      any: {
                        object: {
                          flexDirection: 'column',
                        },
                      },
                    },
                    children: [
                      {
                        key: 'childrenAges',
                        type: 'Repeater',
                        props: {},
                        children: [
                          {
                            key: 'childAge',
                            type: 'RsDropdown',
                            props: {
                              data: {
                                value: [
                                  {
                                    value: 'none',
                                    label: 'Age needed',
                                  },
                                  {
                                    value: '0',
                                    label: '0 years old',
                                  },
                                  {
                                    value: '1',
                                    label: '1 year old',
                                  },
                                  {
                                    value: '2',
                                    label: '2 years old',
                                  },
                                  {
                                    value: '3',
                                    label: '3 years old',
                                  },
                                  {
                                    value: '4',
                                    label: '4 years old',
                                  },
                                  {
                                    value: '5',
                                    label: '5 years old',
                                  },
                                  {
                                    value: '6',
                                    label: '6 years old',
                                  },
                                  {
                                    value: '7',
                                    label: '7 years old',
                                  },
                                  {
                                    value: '8',
                                    label: '8 years old',
                                  },
                                  {
                                    value: '9',
                                    label: '9 years old',
                                  },
                                  {
                                    value: '10',
                                    label: '10 years old',
                                  },
                                  {
                                    value: '11',
                                    label: '11 years old',
                                  },
                                  {
                                    value: '12',
                                    label: '12 years old',
                                  },
                                  {
                                    value: '13',
                                    label: '13 years old',
                                  },
                                  {
                                    value: '14',
                                    label: '14 years old',
                                  },
                                  {
                                    value: '15',
                                    label: '15 years old',
                                  },
                                  {
                                    value: '16',
                                    label: '16 years old',
                                  },
                                  {
                                    value: '17',
                                    label: '17 years old',
                                  },
                                ],
                              },
                              cleanable: {
                                value: false,
                              },
                              value: {
                                value: 'none',
                              },
                              label: {
                                value: '',
                              },
                            },
                            schema: {
                              validations: [
                                {
                                  key: 'code',
                                  args: {
                                    code: "  return value !== 'none'",
                                  },
                                },
                              ],
                            },
                            css: {
                              any: {
                                string: '',
                              },
                            },
                            tooltipProps: {
                              text: {
                                computeType: 'function',
                                fnSource:
                                  "    const index = form.nearestIndex ?? 0\n    const date = form.rootData.date?.toISOString() ?? 'unknown'\n    const room = form.parentData?.roomType ?? 'unknown'\n    return `Child #${index + 1} in room ${room}, date: ${date}`",
                              },
                            },
                          },
                        ],
                        css: {
                          any: {
                            object: {},
                            string: '  flex-wrap: wrap;\n  border: 1px silver dashed;',
                          },
                        },
                        wrapperCss: {
                          any: {
                            object: {
                              flexDirection: 'row',
                            },
                          },
                        },
                      },
                    ],
                    wrapperCss: {
                      any: {
                        object: {
                          marginTop: 'auto',
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            key: 'names',
            type: 'Repeater',
            props: {
              value: {
                value: [{}],
              },
            },
            children: [
              {
                key: 'rsContainer9',
                type: 'RsContainer',
                props: {},
                css: {
                  any: {
                    object: {
                      flexDirection: 'row',
                    },
                    string: '  border: 1px orchid dashed;',
                  },
                },
                children: [
                  {
                    key: 'firstName',
                    type: 'RsInput',
                    props: {
                      label: {
                        value: 'First name',
                      },
                    },
                    schema: {
                      validations: [
                        {
                          key: 'required',
                        },
                      ],
                      autoValidate: false,
                    },
                  },
                  {
                    key: 'lastName',
                    type: 'RsInput',
                    props: {
                      label: {
                        value: 'Last name',
                      },
                    },
                    htmlAttributes: [
                      {
                        name: 'data-testid',
                        value: dataTestId,
                      },
                    ],
                    schema: {
                      validations: [
                        {
                          key: 'required',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
        css: {
          any: {
            object: {
              flexDirection: 'column',
            },
            string: '  border: 1px darkorange dashed;',
          },
        },
      },
      {
        key: 'validateButton',
        type: 'RsButton',
        props: {
          appearance: {
            value: 'primary',
          },
          children: {
            value: 'Validate',
          },
        },
        events: {
          onClick: [
            {
              name: 'validate',
              type: 'common',
            },
          ],
        },
      },
    ],
  },
  localization: {
    'en-US': {
      bookButton: {
        component: {
          children: ' Book a room',
        },
      },
      rsStaticContent1: {
        component: {
          content: 'Room {$roomType}',
        },
      },
    },
    'de-DE': {
      bookButton: {
        component: {
          children: ' Zimmer buchen',
        },
      },
      rsStaticContent1: {
        component: {
          content: 'Zimmer {$roomType}',
        },
      },
    },
  },
  languages: [
    {
      code: 'en',
      dialect: 'US',
      name: 'English',
      description: 'American English',
      bidi: 'ltr',
    },
    {
      code: 'de',
      dialect: 'DE',
      name: 'Deutsch',
      description: 'German',
      bidi: 'ltr',
    },
  ],
  defaultLanguage: 'en-US',
}

const TestApp = () => <FormViewer view={view} getForm={() => JSON.stringify(testForm)} />

describe('FE-1111: Cannot update a component (`RawFormViewerState`) while rendering a different component', function () {
  it('It should not write warning to console', async () => {
    const {findByText, findByTestId} = render(<TestApp />)

    const bookButton = await findByText('Book a room')
    fireEvent.click(bookButton)

    const lastNameInput = await findByTestId(dataTestId)
    fireEvent.change(lastNameInput, {target: {value: '1'}})
    expect(await findByTestId(dataTestId)).toHaveValue('1')

    // after this line, the warning should not be written to the console
    fireEvent.click(bookButton)

    expect(await findByText('Remove room #1')).toBeInTheDocument()
    expect(await findByText('Remove room #2')).toBeInTheDocument()
  })
})
