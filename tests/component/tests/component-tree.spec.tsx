import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, PersistedForm} from '@react-form-builder/core'
import {FormBuilder, FormBuilderProps} from '@react-form-builder/designer'
import {fireEvent, render, waitFor} from '@testing-library/react'

describe('ComponentTree tests', () => {
  it('Elements in component tree should not use component actions', async () => {
    const persistedForm: PersistedForm = {
      form: {
        key: 'Screen',
        type: 'Screen',
        props: {},
        children: [
          {
            key: 'rsDropdown1',
            type: 'RsDropdown',
            props: {},
            events: {
              onDidMount: [
                {
                  name: 'logOnDidMount',
                  type: 'custom'
                }
              ]
            },
            htmlAttributes: [
              {
                name: 'data-testid',
                value: 'test-dropdown'
              }
            ]
          }
        ]
      },
      localization: {},
      languages: [],
      defaultLanguage: '',
    }

    let onMountCount = 0

    const actions = {
      logOnDidMount: () => {
        onMountCount++
      }
    }

    const components = rSuiteComponents.map(d => d.build())
    const view = new BuilderView(components)
    const getForm = () => JSON.stringify(persistedForm)
    const customization: FormBuilderProps['customization'] = {
      Components_Tab_Content: {
        customRenderer: defaultElement => <div data-testid="test-components">
          {defaultElement}
        </div>
      },
      Tree_Tab_Content: {
        customRenderer: defaultElement => <div data-testid="test-tree">
          {defaultElement}
        </div>
      }
    }

    const {findByTestId, findByText} = render(<FormBuilder view={view} getForm={getForm} actions={actions}
                                                           customization={customization}/>)

    expect(await findByTestId('test-dropdown')).toBeInTheDocument()
    expect(onMountCount).toEqual(1)

    // switch to the Tree tab
    fireEvent.click(await findByText('Tree'))
    await waitFor(async () => expect(await findByTestId('test-tree')).toBeInTheDocument())
    expect(onMountCount).toEqual(1)

    // switch to the Components tab
    fireEvent.click(await findByText('Components'))
    await waitFor(async () => expect(await findByTestId('test-components')).toBeInTheDocument())
    expect(onMountCount).toEqual(1)
  })
})
