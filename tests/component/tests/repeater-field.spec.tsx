import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BiDi, ComponentStore, createView, FormViewer, Language, PersistedForm, View} from '@react-form-builder/core'
import {fireEvent, render} from '@testing-library/react'
import {useCallback} from 'react'
import {expect} from 'vitest'
import {eachComponentStore} from './eachComponentStore'
import {testLicense} from './testLicense'
import '../config/toAllHaveLocaleTextContent'
import '../config/toAllHaveValues'
import '../config/toAllSelectsHaveValues'

const componentsMetadata = rSuiteComponents.map(definer => definer.build().model)
const componentsView = createView(componentsMetadata)

interface RepeaterFieldAppProps {
  view?: View
  initialData?: Record<string, unknown>
  modifyForm?: (form: PersistedForm) => void
}

const RepeaterFieldApp = ({view, initialData, modifyForm}: RepeaterFieldAppProps) => {
  const wrappedGetForm = useCallback(() => {
    const form = getForm()
    modifyForm?.(form)
    return JSON.stringify(form)
  }, [modifyForm])

  return <FormViewer
    initialData={initialData}
    licenseKey={testLicense}
    view={view ?? componentsView}
    getForm={wrappedGetForm}
  />
}

describe(`RepeaterField test`, function () {
  it('Only the field with the booking date input is available', async () => {
    const {findByTestId, queryByTestId} = render(<RepeaterFieldApp/>)
    expect(await findByTestId('bookingDate')).not.toHaveValue()
    expect(queryByTestId('roomType')).not.toBeInTheDocument()
  })

  it('Repeater should have a default value', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [{}]}
      })
    }

    const {findByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm}/>)
    expect(await findByTestId('firstName')).toHaveValue('')
    expect(await findByTestId('lastName')).toHaveValue('')
    expect(await findByTestId('adults')).toHaveValue('1')
    expect(await findByTestId('children')).toHaveValue('0')
  })

  it('Repeater should have an initial data value', async () => {
    const initialData = {
      date: new Date(),
      rooms: [{
        roomType: 'standard',
        adults: 2,
        children: 1,
        childrenAges: [{childAge: '3'}],
        names: [
          {firstName: 'James', lastName: 'Stark'},
          {firstName: 'Monica', lastName: 'Cassel'}
        ]
      }, {
        roomType: 'luxe',
        adults: 1,
        children: 2,
        childrenAges: [
          {childAge: '11'},
          {childAge: '1'}
        ],
        names: [{firstName: 'Mark', lastName: 'Ronson'}]
      }]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp initialData={initialData}/>)

    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['standard', 'luxe'])
    expect(await findAllByTestId('firstName')).toAllHaveValues(['James', 'Monica', 'Mark'])
    expect(await findAllByTestId('lastName')).toAllHaveValues(['Stark', 'Cassel', 'Ronson'])
    expect(await findAllByTestId('adults')).toAllHaveValues(['2', '1'])
    expect(await findAllByTestId('children')).toAllHaveValues(['1', '2'])
    await expect(await findAllByTestId('childAge')).toAllSelectsHaveValues(['3', '11', '1'])
  })

  it('Repeater should have a function value', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {
          value: [{}], computeType: 'function', fnSource: 'return [{\n' +
            '      roomType: "luxe",\n' +
            '      adults: 1,\n' +
            '      children: 2,\n' +
            '      childrenAges: [\n' +
            '        {childAge: "11"},\n' +
            '        {childAge: "1"}\n' +
            '      ],\n' +
            '      names: [{firstName: "Mark", lastName: "Ronson"}]\n' +
            '    }]'
        }
      })
    }

    const {findAllByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm}/>)

    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['luxe'])
    expect(await findAllByTestId('firstName')).toAllHaveValues(['Mark'])
    expect(await findAllByTestId('lastName')).toAllHaveValues(['Ronson'])
    expect(await findAllByTestId('adults')).toAllHaveValues(['1'])
    expect(await findAllByTestId('children')).toAllHaveValues(['2'])
    await expect(await findAllByTestId('childAge')).toAllSelectsHaveValues(['11', '1'])
  })

  it('Repeater should have a localization value', async () => {
    const initialData = {
      rooms: [{roomType: 'standard'}, {}, {roomType: 'luxe'}]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp initialData={initialData}/>)
    expect(await findAllByTestId('roomLabel')).toAllHaveLocaleTextContent(['Room standard', 'Room ', 'Room luxe'])
  })

  it('Repeater should have a [NOT LOCALIZED] value', async () => {
    const modifyForm = (form: PersistedForm) => {
      delete form.localization['en-US']['rsStaticContent1']
      delete form.localization['de-DE']['rsStaticContent1']
    }
    const initialData = {
      rooms: [{roomType: 'luxe'}]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findAllByTestId('roomLabel')).toAllHaveLocaleTextContent(['[NOT LOCALIZED]'])
  })

  it('Repeater should have a [NOT LOCALIZED] value (no default localization)', async () => {
    const modifyForm = (form: PersistedForm) => {
      delete form.localization['en-US']['rsStaticContent1']
    }
    const initialData = {
      rooms: [{roomType: 'luxe'}, {roomType: 'standard'}]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findAllByTestId('roomLabel')).toAllHaveLocaleTextContent(['[NOT LOCALIZED]', '[NOT LOCALIZED]'])
  })

  it('Repeater should have a [NOT LOCALIZED] value (de-DE default lang)', async () => {
    const modifyForm = (form: PersistedForm) => {
      form.languages = []
      delete form.localization['en-US']['rsStaticContent1']
      form.defaultLanguage = 'de-DE'
    }
    const initialData = {
      rooms: [{roomType: 'standard'}]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findAllByTestId('roomLabel')).toAllHaveLocaleTextContent(['[NOT LOCALIZED]'])
  })

  it('Repeater should have a localized value (de-DE default lang)', async () => {
    const modifyForm = (form: PersistedForm) => {
      form.languages = [new Language('de', 'DE', 'German', 'German', BiDi.LTR)]
      delete form.localization['en-US']['rsStaticContent1']
      form.defaultLanguage = 'de-DE'
    }
    const initialData = {
      rooms: [{roomType: 'standard'}]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findAllByTestId('roomLabel')).toAllHaveLocaleTextContent(['Zimmer standard'])
  })

  it('Repeater should have a function value from initialData', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [], computeType: 'function', fnSource: 'return [{}, {}]'}
      })
    }

    const {findByText} = render(<RepeaterFieldApp modifyForm={modifyForm}/>)
    expect(await findByText('Remove room #2')).toBeInTheDocument()
  })

  it('Repeater should have a function value from an updated initialData', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      const roomsData = new ComponentStore('roomsData', 'RsInput')
      form.children?.push(roomsData)
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {
          value: [],
          computeType: 'function',
          fnSource: 'return JSON.parse(form.data.roomsData ?? "[]")'
        }
      })
    }

    const initialData = {roomsData: '[{"roomType": "standard"}, {"roomType": "luxe"}]', rooms: []}
    const {findAllByTestId, findByText, rerender} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findByText('Remove room #2')).toBeInTheDocument()
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['standard', 'luxe'])

    const newData = {roomsData: '[{"roomType": "luxe"}, {"roomType": "standard"}, {"roomType": "standard"}]', rooms: []}
    rerender(<RepeaterFieldApp modifyForm={modifyForm} initialData={newData}/>)
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['luxe', 'standard', 'standard'])
  })

  it('Repeater should have an updated initialData', async () => {
    const initialData = {rooms: [{roomType: 'standard'}]}
    const {findAllByTestId, rerender} = render(<RepeaterFieldApp initialData={initialData}/>)
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['standard'])

    const newData = {rooms: [{roomType: 'luxe'}]}
    rerender(<RepeaterFieldApp initialData={newData}/>)
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['luxe'])
  })

  it('Repeater should have a default value after reset', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      const resetButton = new ComponentStore('reset', 'RsButton')
      resetButton.props.children = {value: 'Reset'}
      resetButton.events = {'onClick': [{'name': 'reset', 'type': 'common'}]}
      form.children?.push(resetButton)
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [{'roomType': 'luxe'}]}
      })
    }

    const initialData = {rooms: [{roomType: 'standard'}, {roomType: 'standard'}]}
    const {findAllByTestId, findByText} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['standard', 'standard'])

    const resetButton = await findByText('Reset')
    fireEvent.click(resetButton)

    // Repeater resets the values for all of its child components,
    // so that the value set as data for components at the level below is not applied
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues([''])
  })

  it('Repeater should have a default value after clear', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      const clearButton = new ComponentStore('clear', 'RsButton')
      clearButton.props.children = {value: 'Clear'}
      clearButton.events = {'onClick': [{'name': 'clear', 'type': 'common'}]}
      form.children?.push(clearButton)

      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [{'adults': '2'}, {'adults': '3'}]}
      })
    }

    const initialData = {rooms: [{adults: 5}]}
    const {findByTestId, findByText, queryByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findByTestId('adults')).toHaveValue('5')

    const clearButton = await findByText('Clear')
    fireEvent.click(clearButton)

    expect(queryByTestId('adults')).not.toBeInTheDocument()
  })

  it('The value entered should override the default value', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [{}]}
      })
    }

    const {findByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm}/>)
    const adults = await findByTestId('adults')
    expect(adults).toHaveValue('1')

    const addButton = await findByTestId('plusAdultButton')
    fireEvent.click(addButton)
    expect(adults).toHaveValue('2')
  })

  it('The value entered should override the computed value', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [{}], computeType: 'function', fnSource: 'return []'}
      })
    }

    const {queryByTestId, getByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm}/>)
    expect(queryByTestId('adults')).not.toBeInTheDocument()

    const bookButton = getByTestId('bookButton')
    fireEvent.click(bookButton)
    // // the computed value for the repeater works as initial data, so we can add a new room
    expect(queryByTestId('adults')).toBeInTheDocument()
  })
})

function getForm() {
  return JSON.parse(JSON.stringify({
    'version': '1',
    'actions': {
      'addRepeaterElement': {
        'body': '    const data = e.data[args.name] ?? []\n    if (typeof args.max !== \'undefined\') {\n        if (data.length >= args.max) return\n    }\n    data.push({})\n    e.data[args.name] = [...data]',
        'params': {
          'name': 'string',
          'max': 'number'
        }
      },
      'increment': {
        'body': '    let value = e.data[args.item] + 1\n    value = value > args.max ? args.max : value\n    e.data[args.item] = value',
        'params': {
          'item': 'string',
          'max': 'number'
        }
      },
      'decrement': {
        'body': '    let value = e.data[args.item] - 1\n    value = value < args.min ? args.min : value\n    e.data[args.item] = value',
        'params': {
          'item': 'string',
          'min': 'number'
        }
      },
      'removeChildAge': {
        'body': '    const data = e.data.childrenAges ?? []\n    const length = e.data.childrenAges.length\n    if (length) {\n        e.data.childrenAges = data.toSpliced(length - 1)\n    }',
        'params': {}
      },
      removeParentRepeaterItem: {
        'body': '  const data = e.parentData[args.name]\n  e.parentData[args.name] = data.toSpliced(e.index, 1)',
        'params': {
          'name': 'string'
        }
      },
      removeRepeaterElement: {
        'body': '  const data = e.data[args.name]\n  if (data.length <= args.min) return\n  e.data[args.name] = data.toSpliced(data.length - 1, 1)',
        'params': {
          'name': 'string',
          'min': 'number'
        }
      }
    },
    'tooltipType': 'RsTooltip',
    'errorType': 'RsErrorMessage',
    'form': {
      'key': 'Screen',
      'type': 'Screen',
      'props': {},
      'children': [
        {
          'key': 'header',
          'type': 'RsHeader',
          'props': {
            'content': {
              'value': 'Hotel booking'
            }
          }
        },
        {
          'key': 'date',
          'type': 'RsDatePicker',
          'props': {
            'editable': {
              'value': false
            },
            'oneTap': {
              'value': true
            },
            'label': {
              'value': 'Date'
            }
          },
          'htmlAttributes': [
            {
              'name': 'data-testid',
              'value': 'bookingDate'
            }
          ]
        },
        {
          'key': 'rsContainer1',
          'type': 'RsContainer',
          'props': {},
          'children': [
            {
              'key': 'bookButton',
              'type': 'RsButton',
              'props': {
                'children': {
                  'value': 'Button',
                  'computeType': 'localization'
                },
                'appearance': {
                  'value': 'primary'
                },
                'color': {
                  'value': 'green'
                }
              },
              'events': {
                'onClick': [
                  {
                    'name': 'addRepeaterElement',
                    'type': 'code',
                    'args': {
                      'name': 'rooms'
                    }
                  }
                ]
              },
              'htmlAttributes': [{
                'name': 'data-testid',
                'value': 'bookButton'
              }]
            }
          ]
        },
        {
          'key': 'rooms',
          'type': 'Repeater',
          'props': {},
          'children': [
            {
              'key': 'rsContainer7',
              'type': 'RsContainer',
              'props': {},
              'css': {
                'any': {
                  'object': {
                    'flexDirection': 'row'
                  }
                }
              },
              'children': [
                {
                  'key': 'rsContainer6',
                  'type': 'RsContainer',
                  'props': {},
                  'children': [
                    {
                      'key': 'roomType',
                      'type': 'RsDropdown',
                      'props': {
                        'cleanable': {
                          'value': false
                        },
                        'data': {
                          'value': [
                            {
                              'value': 'standard',
                              'label': 'Standard'
                            },
                            {
                              'value': 'luxe',
                              'label': 'Luxe'
                            }
                          ]
                        },
                        'label': {
                          'value': 'Room'
                        }
                      },
                      'schema': {
                        'validations': [
                          {
                            'key': 'required'
                          }
                        ]
                      },
                      'wrapperCss': {
                        'any': {
                          'object': {}
                        }
                      },
                      'htmlAttributes': [
                        {
                          'name': 'data-testid',
                          'value': 'roomType'
                        }
                      ]
                    },
                    {
                      'key': 'removeRoomButton',
                      'type': 'RsButton',
                      'props': {
                        'children': {
                          'value': 'Remove room',
                          'computeType': 'function',
                          'fnSource': '    const index = (form.index ?? 0) + 1\n    return `Remove room #${index}`'
                        }
                      },
                      'events': {
                        'onClick': [
                          {
                            'name': 'removeParentRepeaterItem',
                            'type': 'code',
                            'args': {
                              'name': 'rooms'
                            }
                          }
                        ]
                      }
                    },
                    {
                      'key': 'rsStaticContent1',
                      'type': 'RsStaticContent',
                      'props': {
                        'content': {
                          'computeType': 'localization'
                        }
                      },
                      'htmlAttributes': [{
                        'name': 'data-testid',
                        'value': 'roomLabel'
                      }]
                    }
                  ]
                },
                {
                  'key': 'rsContainer5',
                  'type': 'RsContainer',
                  'props': {},
                  'children': [
                    {
                      'key': 'rsContainer2',
                      'type': 'RsContainer',
                      'props': {},
                      'css': {
                        'any': {
                          'object': {
                            'flexDirection': 'row'
                          }
                        }
                      },
                      'children': [
                        {
                          'key': 'minusAdultButton',
                          'type': 'RsButton',
                          'props': {
                            'children': {
                              'value': '-'
                            }
                          },
                          'wrapperCss': {
                            'any': {
                              'object': {
                                'marginTop': 'auto'
                              }
                            }
                          },
                          'events': {
                            'onClick': [
                              {
                                'name': 'decrement',
                                'type': 'code',
                                'args': {
                                  'item': 'adults',
                                  'min': 1
                                }
                              },
                              {
                                'name': 'removeRepeaterElement',
                                'type': 'code',
                                'args': {
                                  'name': 'names',
                                  'min': 1
                                }
                              }
                            ]
                          }
                        },
                        {
                          'key': 'adults',
                          'type': 'RsNumberFormat',
                          'props': {
                            'allowNegative': {
                              'value': false
                            },
                            'label': {
                              'value': 'Adults'
                            },
                            'value': {
                              'value': 1
                            },
                            'disabled': {
                              'value': true
                            }
                          },
                          'schema': {
                            'validations': []
                          },
                          'wrapperCss': {
                            'any': {
                              'object': {
                                'marginTop': 'auto'
                              }
                            }
                          },
                          'tooltipProps': {
                            'text': {
                              'computeType': 'function',
                              'fnSource': '    const index = form.index ?? 0\n    return `Adults in room #${index + 1}`'
                            }
                          },
                          'htmlAttributes': [
                            {
                              'name': 'data-testid',
                              'value': 'adults'
                            }
                          ]
                        },
                        {
                          'key': 'plusAdultButton',
                          'type': 'RsButton',
                          'props': {
                            'children': {
                              'value': '+'
                            }
                          },
                          'wrapperCss': {
                            'any': {
                              'object': {
                                'marginTop': 'auto'
                              }
                            }
                          },
                          'events': {
                            'onClick': [
                              {
                                'name': 'increment',
                                'type': 'code',
                                'args': {
                                  'item': 'adults',
                                  'max': 5
                                }
                              },
                              {
                                'name': 'addRepeaterElement',
                                'type': 'code',
                                'args': {
                                  'name': 'names'
                                }
                              }
                            ]
                          },
                          'htmlAttributes': [{
                            'name': 'data-testid',
                            'value': 'plusAdultButton'
                          }]
                        }
                      ]
                    },
                    {
                      'key': 'rsContainer4',
                      'type': 'RsContainer',
                      'props': {},
                      'css': {
                        'any': {
                          'object': {
                            'flexDirection': 'row'
                          }
                        }
                      },
                      'children': [
                        {
                          'key': 'minusChildButton',
                          'type': 'RsButton',
                          'props': {
                            'children': {
                              'value': '-'
                            }
                          },
                          'wrapperCss': {
                            'any': {
                              'object': {
                                'marginTop': 'auto'
                              }
                            }
                          },
                          'events': {
                            'onClick': [
                              {
                                'name': 'decrement',
                                'type': 'code',
                                'args': {
                                  'item': 'children',
                                  'min': 0
                                }
                              },
                              {
                                'name': 'removeChildAge',
                                'type': 'code'
                              }
                            ]
                          }
                        },
                        {
                          'key': 'children',
                          'type': 'RsNumberFormat',
                          'props': {
                            'allowNegative': {
                              'value': false
                            },
                            'label': {
                              'value': 'Children'
                            },
                            'value': {
                              'value': 0
                            },
                            'disabled': {
                              'value': true
                            }
                          },
                          'schema': {
                            'validations': []
                          },
                          'htmlAttributes': [{
                            'name': 'data-testid',
                            'value': 'children'
                          }]
                        },
                        {
                          'key': 'plusChildButton',
                          'type': 'RsButton',
                          'props': {
                            'children': {
                              'value': '+'
                            }
                          },
                          'wrapperCss': {
                            'any': {
                              'object': {
                                'marginTop': 'auto'
                              }
                            }
                          },
                          'events': {
                            'onClick': [
                              {
                                'name': 'increment',
                                'type': 'code',
                                'args': {
                                  'item': 'children',
                                  'max': 7
                                }
                              },
                              {
                                'name': 'addRepeaterElement',
                                'type': 'code',
                                'args': {
                                  'name': 'childrenAges',
                                  'max': 7
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    {
                      'key': 'rsContainer3',
                      'type': 'RsContainer',
                      'props': {},
                      'css': {
                        'any': {
                          'object': {
                            'flexDirection': 'column'
                          }
                        }
                      },
                      'children': [
                        {
                          'key': 'childrenAges',
                          'type': 'Repeater',
                          'props': {},
                          'children': [
                            {
                              'key': 'childAge',
                              'type': 'RsDropdown',
                              'props': {
                                'data': {
                                  'value': [
                                    {
                                      'value': 'none',
                                      'label': 'Age needed'
                                    },
                                    {
                                      'value': '0',
                                      'label': '0 years old'
                                    },
                                    {
                                      'value': '1',
                                      'label': '1 year old'
                                    },
                                    {
                                      'value': '2',
                                      'label': '2 years old'
                                    },
                                    {
                                      'value': '3',
                                      'label': '3 years old'
                                    },
                                    {
                                      'value': '4',
                                      'label': '4 years old'
                                    },
                                    {
                                      'value': '5',
                                      'label': '5 years old'
                                    },
                                    {
                                      'value': '6',
                                      'label': '6 years old'
                                    },
                                    {
                                      'value': '7',
                                      'label': '7 years old'
                                    },
                                    {
                                      'value': '8',
                                      'label': '8 years old'
                                    },
                                    {
                                      'value': '9',
                                      'label': '9 years old'
                                    },
                                    {
                                      'value': '10',
                                      'label': '10 years old'
                                    },
                                    {
                                      'value': '11',
                                      'label': '11 years old'
                                    },
                                    {
                                      'value': '12',
                                      'label': '12 years old'
                                    },
                                    {
                                      'value': '13',
                                      'label': '13 years old'
                                    },
                                    {
                                      'value': '14',
                                      'label': '14 years old'
                                    },
                                    {
                                      'value': '15',
                                      'label': '15 years old'
                                    },
                                    {
                                      'value': '16',
                                      'label': '16 years old'
                                    },
                                    {
                                      'value': '17',
                                      'label': '17 years old'
                                    }
                                  ]
                                },
                                'cleanable': {
                                  'value': false
                                },
                                'value': {
                                  'value': 'none'
                                },
                                'label': {
                                  'value': ''
                                }
                              },
                              'schema': {
                                'validations': [
                                  {
                                    'key': 'code',
                                    'args': {
                                      'code': '  return value !== \'none\''
                                    }
                                  }
                                ]
                              },
                              'css': {
                                'any': {
                                  'string': ''
                                }
                              },
                              'tooltipProps': {
                                'text': {
                                  'computeType': 'function',
                                  'fnSource': '    const index = form.index ?? 0\n    const date = form.rootData.date?.toISOString() ?? \'unknown\'\n    const room = form.parentData?.roomType ?? \'unknown\'\n    return `Child #${index + 1} in room ${room}, date: ${date}`'
                                }
                              },
                              'htmlAttributes': [{
                                'name': 'data-testid',
                                'value': 'childAge'
                              }]
                            }
                          ],
                          'css': {
                            'any': {
                              'object': {},
                              'string': '  flex-wrap: wrap;\n  border: 1px silver dashed;'
                            }
                          },
                          'wrapperCss': {
                            'any': {
                              'object': {
                                'flexDirection': 'row'
                              }
                            }
                          }
                        }
                      ],
                      'wrapperCss': {
                        'any': {
                          'object': {
                            'marginTop': 'auto'
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            },
            {
              'key': 'names',
              'type': 'Repeater',
              'props': {
                'value': {
                  'value': [
                    {}
                  ]
                }
              },
              'children': [
                {
                  'key': 'rsContainer9',
                  'type': 'RsContainer',
                  'props': {},
                  'css': {
                    'any': {
                      'object': {
                        'flexDirection': 'row'
                      },
                      'string': '  border: 1px orchid dashed;'
                    }
                  },
                  'children': [
                    {
                      'key': 'firstName',
                      'type': 'RsInput',
                      'props': {
                        'label': {
                          'value': 'First name'
                        }
                      },
                      'schema': {
                        'validations': [
                          {
                            'key': 'required'
                          }
                        ],
                        'autoValidate': false
                      },
                      'htmlAttributes': [{
                        'name': 'data-testid',
                        'value': 'firstName'
                      }]
                    },
                    {
                      'key': 'lastName',
                      'type': 'RsInput',
                      'props': {
                        'label': {
                          'value': 'Last name'
                        }
                      },
                      'schema': {
                        'validations': [
                          {
                            'key': 'required'
                          }
                        ]
                      },
                      'htmlAttributes': [{
                        'name': 'data-testid',
                        'value': 'lastName'
                      }]
                    }
                  ]
                }
              ]
            }
          ],
          'css': {
            'any': {
              'object': {
                'flexDirection': 'column'
              },
              'string': '  border: 1px darkorange dashed;'
            }
          }
        },
        {
          'key': 'validateButton',
          'type': 'RsButton',
          'props': {
            'appearance': {
              'value': 'primary'
            },
            'children': {
              'value': 'Validate'
            }
          },
          'events': {
            'onClick': [
              {
                'name': 'validate',
                'type': 'common'
              }
            ]
          }
        }
      ]
    },
    'localization': {
      'en-US': {
        'bookButton': {
          'component': {
            'children': ' Book a room'
          }
        },
        'rsStaticContent1': {
          'component': {
            'content': 'Room {$roomType}'
          }
        }
      },
      'de-DE': {
        'bookButton': {
          'component': {
            'children': ' Zimmer buchen'
          }
        },
        'rsStaticContent1': {
          'component': {
            'content': 'Zimmer {$roomType}'
          }
        }
      }
    },
    'languages': [
      {
        'code': 'en',
        'dialect': 'US',
        'name': 'English',
        'description': 'American English',
        'bidi': 'ltr'
      },
      {
        'code': 'de',
        'dialect': 'DE',
        'name': 'Deutsch',
        'description': 'German',
        'bidi': 'ltr'
      }
    ],
    'defaultLanguage': 'en-US'
  })) satisfies PersistedForm
}
