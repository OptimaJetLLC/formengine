import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder, FormBuilderProps} from '@react-form-builder/designer'
import {fireEvent, render} from '@testing-library/react'
import {expect} from 'vitest'
import App from '../../common/lib/designer/App'

const childForm = {
  'version': '1',
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'props': {},
    'children': [
      {
        'key': 'firstName',
        'type': 'RsInput',
        'props': {
          'label': {
            'value': 'First name'
          },
          'value': {
            'value': 'Paul'
          }
        }
      },
      {
        'key': 'lastName',
        'type': 'Slot',
        'props': {}
      }
    ]
  },
  'localization': {},
  'languages': [
    {
      'code': 'en',
      'dialect': 'US',
      'name': 'English',
      'description': 'American English',
      'bidi': 'ltr'
    }
  ],
  'defaultLanguage': 'en-US'
}

const parentForm = {
  'version': '1',
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'props': {},
    'children': [
      {
        'key': 'templateChild1',
        'type': 'Template:child',
        'props': {},
        'children': [
          {
            'key': 'lastName',
            'type': 'RsInput',
            'props': {
              'label': {
                'value': 'Last name'
              },
              'value': {
                'value': 'Dyson'
              }
            },
            'slot': 'lastName'
          }
        ]
      }
    ]
  },
  'localization': {},
  'languages': [
    {
      'code': 'en',
      'dialect': 'US',
      'name': 'English',
      'description': 'American English',
      'bidi': 'ltr'
    }
  ],
  'defaultLanguage': 'en-US'
}

describe(`storeDataInParentForm test`, function () {
  it('Data should be updated when `storeDataInParentForm` setting is changed', async () => {
    const {findByText, getByTestId} = render(<App/>)

    fireEvent.click(await findByText('Preview'))

    expect(getByTestId('template-login')).toHaveValue('1')
    expect(getByTestId('template-password')).toHaveValue('ok')

    fireEvent.click(await findByText('Edit'))

    // select the component in the component tree
    fireEvent.click(await findByText('Tree'))
    fireEvent.click(await findByText('Template:Test form 1', {selector: 'div'}))

    // change the component property
    fireEvent.click(await findByText('Main'))
    fireEvent.click(await findByText('Store data in parent form'))

    fireEvent.click(await findByText('Preview'))

    expect(getByTestId('template-login')).toHaveValue('tortuga')
    expect(getByTestId('template-password')).toHaveValue('man!')
  }, 50000)

  it('Toggling the storeDataInParentForm property should display the data correctly', async () => {
    const components = rSuiteComponents.map(definer => definer.build())
    const view = new BuilderView(components).withTemplates(['child'])

    const getForm = (name?: string) => {
      const form = name === 'child' ? childForm : parentForm
      return JSON.stringify(form)
    }

    const BuilderApp = (props: Partial<FormBuilderProps>) => {
      return <FormBuilder {...props} view={view} getForm={getForm}/>
    }

    const viewerRef: FormBuilderProps['viewerRef'] = {current: null}
    const {findByText, findByDisplayValue} = render(<BuilderApp viewerRef={viewerRef}/>)

    fireEvent.click(await findByText('Preview'))
    expect(viewerRef.current).not.toBeNull()

    expect(await findByDisplayValue('Dyson')).toBeInTheDocument()

    const firstData = JSON.stringify(viewerRef.current?.formData.data)
    const expectedFirstData = '{"firstName":"Paul","lastName":"Dyson"}'
    expect(firstData).toEqual(expectedFirstData)

    fireEvent.click(await findByText('Edit'))

    // select the component in the component tree
    fireEvent.click(await findByText('Tree'))
    fireEvent.click(await findByText('templateChild1', {selector: 'div'}))

    // change the component property
    fireEvent.click(await findByText('Main'))
    fireEvent.click(await findByText('Store data in parent form'))
    fireEvent.click(await findByText('Preview'))

    const secondData = JSON.stringify(viewerRef.current?.formData.data)
    const expectedSecondData = '{"templateChild1":{"firstName":"Paul"},"lastName":"Dyson"}'
    expect(secondData).toEqual(expectedSecondData)

    fireEvent.click(await findByText('Edit'))
    fireEvent.click(await findByText('Store data in parent form'))
    fireEvent.click(await findByText('Preview'))

    const thirdData = JSON.stringify(viewerRef.current?.formData.data)
    expect(thirdData).toEqual(expectedFirstData)
  })
})
