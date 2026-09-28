import {builderViewWithCss, rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder, FormBuilderProps} from '@react-form-builder/designer'
import {fireEvent, render} from '@testing-library/react'
import {expect} from 'vitest'
import {switchToDesignerMode, switchToViewerMode} from './designerUtils'
import appForm from './forms/store-data-in-parent-form.json'
import appTemplateForm from './forms/store-data-in-parent-form-template.json'

const appGetForm = (name?: string) => {
  if (name === 'template') return JSON.stringify(appTemplateForm)
  return JSON.stringify(appForm)
}

const appData = {
  login: '1',
  password: 'ok',
  'Template:Test form 1': {login: 'tortuga', password: 'man!'},
}

const appView = builderViewWithCss.withTemplates(['template'])

const App = () => {
  return <FormBuilder view={appView} getForm={appGetForm} initialData={appData} />
}

const childForm = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'firstName',
        type: 'RsInput',
        props: {
          label: {
            value: 'First name',
          },
          value: {
            value: 'Paul',
          },
        },
      },
      {
        key: 'lastName',
        type: 'Slot',
        props: {},
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

const parentForm = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'templateChild1',
        type: 'Template:child',
        props: {},
        children: [
          {
            key: 'lastName',
            type: 'RsInput',
            props: {
              label: {
                value: 'Last name',
              },
              value: {
                value: 'Dyson',
              },
            },
            slot: 'lastName',
          },
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

describe(`storeDataInParentForm test`, function () {
  it('Data should be updated when `storeDataInParentForm` setting is changed', async () => {
    const {findByText, findByTestId} = render(<App />)

    fireEvent.click(await findByText('Preview'))

    expect(await findByTestId('template-login')).toHaveValue('1')
    expect(await findByTestId('template-password')).toHaveValue('ok')

    fireEvent.click(await findByText('Edit'))

    // select the component in the component tree
    fireEvent.click(await findByText('Tree'))
    fireEvent.click(await findByText('Template:Test form 1', {selector: 'div'}))

    // change the component property
    fireEvent.click(await findByText('Main'))
    fireEvent.click(await findByText('Store data in parent form'))

    fireEvent.click(await findByText('Preview'))

    expect(await findByTestId('template-login')).toHaveValue('tortuga')
    expect(await findByTestId('template-password')).toHaveValue('man!')
  })

  it('Toggling the storeDataInParentForm property should display the data correctly', async () => {
    const components = rSuiteComponents.map(definer => definer.build())
    const view = new BuilderView(components).withTemplates(['child'])

    const getForm = (name?: string) => {
      const form = name === 'child' ? childForm : parentForm
      return JSON.stringify(form)
    }

    const BuilderApp = (props: Partial<FormBuilderProps>) => {
      return <FormBuilder {...props} view={view} getForm={getForm} />
    }

    const viewerRef: FormBuilderProps['viewerRef'] = {current: null}
    const {findByText, findByDisplayValue} = render(<BuilderApp viewerRef={viewerRef} />)

    await switchToViewerMode(findByText)
    expect(viewerRef.current).not.toBeNull()

    expect(await findByDisplayValue('Dyson')).toBeInTheDocument()

    const firstData = JSON.stringify(viewerRef.current?.formData.data)
    const expectedFirstData = '{"firstName":"Paul","lastName":"Dyson"}'
    expect(firstData).toEqual(expectedFirstData)

    await switchToDesignerMode(findByText)

    // select the component in the component tree
    fireEvent.click(await findByText('Tree'))
    fireEvent.click(await findByText('templateChild1', {selector: 'div'}))

    // change the component property
    fireEvent.click(await findByText('Main'))
    fireEvent.click(await findByText('Store data in parent form'))
    await switchToViewerMode(findByText)

    const secondData = JSON.stringify(viewerRef.current?.formData.data)
    const expectedSecondData = '{"templateChild1":{"firstName":"Paul"},"lastName":"Dyson"}'
    expect(secondData).toEqual(expectedSecondData)

    await switchToDesignerMode(findByText)
    fireEvent.click(await findByText('Store data in parent form'))
    await switchToViewerMode(findByText)

    const thirdData = JSON.stringify(viewerRef.current?.formData.data)
    expect(thirdData).toEqual(expectedFirstData)
  })
})
