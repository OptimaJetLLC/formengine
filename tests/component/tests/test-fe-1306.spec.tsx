import {ltrCssLoader, RsLocalizationWrapper, rSuiteComponentsDescriptions, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {BiDi, BuilderView} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {testLicense} from '@react-form-builder/tests-common/test-licenses'
import {fireEvent, RenderResult, render, waitFor, within} from '@testing-library/react'
import {expect} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'

const testForm = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [],
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

const savedForm = {
  version: '1',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    htmlAttributes: [
      {
        name: 'data-testid',
        value: 'mainScreen',
      },
    ],
    children: [
      {
        key: 'rsContainer1',
        type: 'RsContainer',
        props: {},
        children: [
          {
            key: 'rsContainer2',
            type: 'RsContainer',
            props: {},
            children: [
              {
                key: 'rsLabel1',
                type: 'RsLabel',
                props: {},
              },
            ],
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

const getForm = () => JSON.stringify(testForm)
const getSavedForm = () => JSON.stringify(savedForm)

const view = new BuilderView(allComponentsBuilder)
  .withTemplates(['agreement'])
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withComponentLibraryDescription(rSuiteComponentsDescriptions)

const TestApp = ({getForm}: {getForm: () => string}) => (
  <FormBuilder view={view} getForm={getForm} formName={'foo'} licenseKey={testLicense} />
)

const expandTreeNode = async (rendered: RenderResult, testId: string) => {
  const target = await rendered.findByTestId(testId)
  await waitFor(() => target.previousElementSibling !== null)

  await asyncAct(async () => {
    if (!target.previousElementSibling) throw new Error('Not Found: target.previousElementSibling')
    try {
      ;(target.previousElementSibling.children[0] as HTMLElement).click()
    } catch (e) {
      console.error(e)
    }
  })

  return target
}

const cloneFromTreeToolbar = async (nodeKey: string) => {
  const source = await waitFor(() => {
    const node = document.querySelector(`[data-testid="${nodeKey}"]`)
    if (!(node instanceof HTMLElement)) throw new Error(`Not Found: ${nodeKey}`)
    return node
  })
  fireEvent.click(source)
  const cloneBtn = await waitFor(() => {
    const button = document.querySelector('[data-testid="tree-clone-button"]')
    if (!(button instanceof Element)) throw new Error('Not Found: tree-clone-button')
    return button
  })
  fireEvent.click(cloneBtn)
}

describe('FE-1306: After container clone inner components should have unique key in the tree', function () {
  it('Labels should be unique after container clone, created from scratch', async () => {
    const app = render(<TestApp getForm={getForm} />)
    const {findByText, findByTestId, findByRole} = app

    const treeBtn = await findByText('Tree')
    fireEvent.click(treeBtn)

    let addBtn = await findByTestId('add-button')
    fireEvent.click(addBtn)

    let dialog = await findByRole('dialog')
    let contBtn = await within(dialog).findByText('Container')
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

    await cloneFromTreeToolbar('rsContainer2')

    await waitFor(async () => expect(await findByTestId('rsContainer3-editable-wrapper')).toBeInTheDocument())
    await waitFor(async () => expect(await findByTestId('rsLabel2-editable-wrapper')).toBeInTheDocument())
  })

  it('Labels should be unique after container clone, preloaded form', async () => {
    const app = render(<TestApp getForm={getSavedForm} />)
    const {findByText, findByTestId} = app

    const treeBtn = await findByText('Tree')
    fireEvent.click(treeBtn)

    await expandTreeNode(app, 'rsContainer1')
    await expandTreeNode(app, 'rsContainer2')

    await cloneFromTreeToolbar('rsContainer2')

    await waitFor(async () => expect(await findByTestId('rsContainer3-editable-wrapper')).toBeInTheDocument())
    await waitFor(async () => expect(await findByTestId('rsLabel2-editable-wrapper')).toBeInTheDocument())
  })
})
