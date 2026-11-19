import {BuilderView, define, type PersistedForm} from '@react-form-builder/core'
import type {IFormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent, within} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'

/**
 * Avoid @monaco-editor/react async ready setState (act warnings).
 */
vi.mock('../../../packages/designer/src/features/components/CodeEditor/MonacoCodeEditor', () => ({
  MonacoCodeEditor: ({className}: {className?: string}) => <div className={['monaco-editor', className].filter(Boolean).join(' ')} />,
}))

const fieldKey = 'box'

const StyledBox = () => {
  return <div data-testid="styled-box" />
}

const styledBox = define(StyledBox, 'StyledBox').showInlineStylesEditor(true).build()

const view = new BuilderView([...allComponentsBuilder, styledBox])

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    htmlAttributes: [
      {
        name: 'data-testid',
        value: 'test-screen',
      },
    ],
    children: [
      {
        key: fieldKey,
        type: 'StyledBox',
        htmlAttributes: [
          {
            name: 'data-testid',
            value: 'styled-box',
          },
        ],
        css: {
          any: {
            string: 'color: red;',
            object: {width: '100%'},
          },
        },
        wrapperCss: {
          any: {
            string: 'background: blue;',
          },
        },
        style: {
          any: {
            string: 'font-size: 20px;',
          },
        },
        wrapperStyle: {
          any: {
            string: 'padding: 8px;',
          },
        },
      },
    ],
  },
}

const getComponentStore = (builder: IFormBuilder) => {
  const persistedForm: PersistedForm = JSON.parse(builder.formAsString)
  const componentStore = persistedForm.form.children?.find(child => child.key === fieldKey)
  if (!componentStore) throw new Error(`Unable to find ComponentStore with the key: '${fieldKey}'`)
  return componentStore
}

describe('Style and CSS editor reset buttons', () => {
  it('resets only the current CSS editor tab', async () => {
    const {findByTestId, getFormBuilder} = await renderBuilder(form, {view})

    fireEvent.click(await findByTestId('styled-box'))
    fireEvent.click(await findByTestId('Style_Tab'))

    const cssEditor = await findByTestId('css-editor')
    fireEvent.click(await findByTestId('css-editor-clean-button'))

    const builder = getFormBuilder()
    if (!builder) throw new Error('Unable to get IFormBuilder instance')

    let componentStore = getComponentStore(builder)
    expect(componentStore.css?.any?.string).toBeUndefined()
    expect(componentStore.css?.any?.object).toEqual({width: '100%'})
    expect(componentStore.wrapperCss?.any?.string).toBe('background: blue;')

    fireEvent.click(within(cssEditor).getByLabelText('Wrapper'))
    fireEvent.click(await findByTestId('css-editor-clean-button'))

    componentStore = getComponentStore(builder)
    expect(componentStore.wrapperCss).toBeUndefined()
    expect(componentStore.css?.any?.object).toEqual({width: '100%'})
  })

  it('resets only the current inline style editor tab', async () => {
    const {findByTestId, getFormBuilder} = await renderBuilder(form, {view})

    fireEvent.click(await findByTestId('styled-box'))
    fireEvent.click(await findByTestId('Style_Tab'))

    const styleEditor = await findByTestId('style-editor')
    fireEvent.click(await findByTestId('style-editor-clean-button'))

    const builder = getFormBuilder()
    if (!builder) throw new Error('Unable to get IFormBuilder instance')

    let componentStore = getComponentStore(builder)
    expect(componentStore.style).toBeUndefined()
    expect(componentStore.wrapperStyle?.any?.string).toBe('padding: 8px;')

    fireEvent.click(within(styleEditor).getByLabelText('Wrapper'))
    fireEvent.click(await findByTestId('style-editor-clean-button'))

    componentStore = getComponentStore(builder)
    expect(componentStore.style).toBeUndefined()
    expect(componentStore.wrapperStyle).toBeUndefined()
  })
})
