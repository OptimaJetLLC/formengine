import {viewWithCss} from '@react-form-builder/components-rsuite'
import {BuilderView, buildForm, ComponentStore, FormViewer, FormViewerProps, PersistedForm} from '@react-form-builder/core'
import {FormBuilderProps} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {expect} from 'vitest'
import {isBrowserMode} from '../config/isBrowserMode'
import {renderBuilder} from '../util/renderBuilder'
import {renderForm} from '../util/renderForm'
import oneWayRepeaterForm from './forms/one-way/one-way-repeater-form.json'
import oneWaySimpleForm from './forms/one-way/one-way-simple-form.json'
import '../config/toAllHaveInnerHtml'

const excludedComponentTypes = [
  // excluded components
  'ThrowErrorComponent',
  'RsErrorMessage',
  'RsModal',
  'AntModal',
  // excluded presets
  'Login and password',
  // excluded container components
  'RsContainer',
  'RsWizardStep',
]

const componentsInitialData: Record<string, FormViewerProps['initialData']> = {
  RsHeader: {
    none: '',
  },
  RsStaticContent: {
    none: '   ',
  },
}

const componentsToTest = allComponentsBuilder
  .filter(({model}) => excludedComponentTypes.indexOf(model.type) < 0)
  .sort((a, b) => a.model.type.localeCompare(b.model.type))

const generateVisibleTestData = (): Array<[string, FormViewerProps['initialData']]> => {
  return componentsToTest.map(({model}) => [model.type, componentsInitialData[model.type]])
}

describe('One-way data binding', () => {
  it('The data should be bound correctly', async () => {
    const expectedValue = '13:42'
    const initialData = {input: expectedValue}
    const {findByTestId} = renderForm(oneWaySimpleForm, {initialData})

    const testInput = await findByTestId('test-input')
    expect(testInput).toHaveValue(expectedValue)
    expect(await findByTestId('test-static-bound')).toContainHTML(expectedValue)
    expect(await findByTestId('test-static-unbound-no-data-key')).toContainHTML('no dataKey')
    expect(await findByTestId('test-static-unbound-binding-is-disabled')).toContainHTML('binding is disabled')

    const newValue = 'Galaxy'
    fireEvent.change(testInput, {target: {value: newValue}})
    expect(await findByTestId('test-static-bound')).toContainHTML(newValue)
    expect(await findByTestId('test-static-unbound-no-data-key')).toContainHTML('no dataKey')
    expect(await findByTestId('test-static-unbound-binding-is-disabled')).toContainHTML('binding is disabled')
  })

  it('The data should be bound correctly in the repeater', async () => {
    const initialData = {
      repeater: [
        {input: 'data 1', templateData: {input: 'template 1'}},
        {input: 'data 2', templateData: {input: 'template 2'}},
      ],
    }

    const getForm = (name?: string) => {
      if (!name) return JSON.stringify(oneWayRepeaterForm)
      return JSON.stringify(oneWaySimpleForm)
    }

    const {findAllByTestId} = render(<FormViewer view={viewWithCss} getForm={getForm} initialData={initialData} />)

    expect(await findAllByTestId('test-static-bound')).toAllHaveInnerHtml(['data 1', 'template 1', 'data 2', 'template 2'])

    expect(await findAllByTestId('test-static-unbound-no-data-key')).toAllHaveInnerHtml([
      'no dataKey',
      'no dataKey',
      'no dataKey',
      'no dataKey',
    ])

    expect(await findAllByTestId('test-static-unbound-binding-is-disabled')).toAllHaveInnerHtml([
      'binding is disabled',
      'binding is disabled',
      'binding is disabled',
      'binding is disabled',
    ])
  })

  if (isBrowserMode()) {
    it.each(generateVisibleTestData())(
      'The component "%s" without data should be visible in the desinger',
      async (type: string, initialData: FormViewerProps['initialData']) => {
        const persistedForm: PersistedForm = JSON.parse(buildForm().json())
        const store = new ComponentStore(type, type)
        store.dataKey = 'none'
        store.htmlAttributes = [{name: 'data-testid', value: type}]
        persistedForm.form.children = [store]

        const props: FormBuilderProps = {view: new BuilderView(allComponentsBuilder), initialData}
        const {findByTestId, container} = await renderBuilder(persistedForm, props)

        expect(await findByTestId(type)).toBeInTheDocument()

        const dndWrapper = container.querySelector(`.type-${type}`)
        if (!(dndWrapper instanceof HTMLElement)) {
          throw new Error(`Unable to find HTMLElement for a component with type: "${type}"`)
        }

        await waitFor(() => expect(typeof dndWrapper.offsetHeight).toEqual('number'))
        await waitFor(() => expect(dndWrapper.offsetHeight).toBeGreaterThan(16))
      }
    )
  }
})
