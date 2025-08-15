import {formEngineRsuiteCssLoader, ltrCssLoader, RsLocalizationWrapper, rtlCssLoader,} from '@react-form-builder/components-rsuite'
import {BiDi, BuilderView} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {testLicense} from '@react-form-builder/tests-common/license/vaild'
import {fireEvent, render, RenderResult, waitFor, within} from '@testing-library/react'
import {expect} from 'vitest'
import {asyncAct} from './asyncAct'

const testForm = {
  'version': '1',
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'props': {},
    'children': [],
    'htmlAttributes': [
      {
        'name': 'data-testid',
        'value': 'mainScreen'
      }
    ],
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

const savedForm = {
  'version': '1',
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'props': {},
    'htmlAttributes': [
      {
        'name': 'data-testid',
        'value': 'mainScreen'
      }
    ],
    'children': [
      {
        'key': 'rsContainer1',
        'type': 'RsContainer',
        'props': {},
        'children': [
          {
            'key': 'rsContainer2',
            'type': 'RsContainer',
            'props': {},
            'children': [
              {
                'key': 'rsLabel1',
                'type': 'RsLabel',
                'props': {}
              }
            ]
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

const getForm = () => JSON.stringify(testForm)
const getSavedForm = () => JSON.stringify(savedForm)

const view = new BuilderView(allComponentsBuilder)
  .withTemplates(['agreement'])
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)

const TestApp = ({getForm}: { getForm: () => string }) => <FormBuilder view={view} getForm={getForm} formName={'foo'}
                                                                       licenseKey={testLicense}/>

const expandTreeNode = async (rendered: RenderResult, testId: string) => {
  const target = await rendered.findByTestId(testId)
  await waitFor(() => target.previousElementSibling !== null)

  await asyncAct(async () => {
    if (!target.previousElementSibling) throw new Error('Not Found: target.previousElementSibling')
    try {
      (target.previousElementSibling.children[0] as HTMLElement).click()
    } catch (e) {
      console.error(e)
    }
  })

  return target
}

describe('FE-1306: After container clone inner components should have unique key in the tree', function () {
  it('Labels should be unique after container clone, created from scratch', async () => {
    const app = render(<TestApp getForm={getForm}/>)
    const {container, findByText, findByTestId, findByRole} = app
    let addBtn, dialog, contBtn

    const treeBtn = await findByText('Tree')
    fireEvent.click(treeBtn)

    addBtn = await findByTestId('add-button')
    fireEvent.click(addBtn)

    dialog = await findByRole('dialog')
    contBtn = await within(dialog).findByText('Container')
    fireEvent.click(contBtn)

    addBtn = await findByTestId('add-button')
    fireEvent.click(addBtn)

    dialog = await findByRole('dialog')
    contBtn = await within(dialog).findByText('Container')
    fireEvent.click(contBtn)

    addBtn = await findByTestId('add-button')
    fireEvent.click(addBtn)

    dialog = await findByRole('dialog')
    contBtn = await within(dialog).findByText('Label')
    fireEvent.click(contBtn)

    const source = await findByTestId('rsContainer2')
    fireEvent.mouseOver(source)

    const cloneBtn = container.querySelector('svg[data-testid="tree-clone-button"]')
    if (!cloneBtn) throw new Error('Not Found: svg[data-testid="tree-clone-button"]')
    fireEvent.click(cloneBtn)

    const target = await expandTreeNode(app, 'rsContainer3')
    await waitFor(() => expect(target?.parentElement?.nextElementSibling).not.toBeNull())

    if (!target.parentElement?.nextElementSibling) throw new Error('Not Found: target.parentElement?.nextElementSibling')
    expect(target.parentElement.nextElementSibling.querySelector('label')).toHaveTextContent('rsLabel2')
  })

  it('Labels should be unique after container clone, preloaded form', async () => {
    const app = render(<TestApp getForm={getSavedForm}/>)
    const {container, findByText, findByTestId} = app

    const treeBtn = await findByText('Tree')
    fireEvent.click(treeBtn)

    await expandTreeNode(app, 'rsContainer1')
    await expandTreeNode(app, 'rsContainer2')

    const source = await findByTestId('rsContainer2')
    fireEvent.mouseOver(source)

    const cloneBtn = container.querySelector('svg[data-testid="tree-clone-button"]')
    if (!cloneBtn) throw new Error('Not Found: svg[data-testid="tree-clone-button"]')
    fireEvent.click(cloneBtn)

    const target = await expandTreeNode(app, 'rsContainer3')
    await waitFor(() => expect(target?.parentElement?.nextElementSibling).not.toBeNull())

    if (!target.parentElement?.nextElementSibling) throw new Error('Not Found: target.parentElement?.nextElementSibling')
    expect(target.parentElement.nextElementSibling.querySelector('label')).toHaveTextContent('rsLabel2')
  })
})
