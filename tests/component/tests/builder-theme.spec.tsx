import {BuilderView, define, useBuilderTheme, View} from '@react-form-builder/core'
import type {ComponentProps} from 'react'
import {describe, expect, it} from 'vitest'
import {toggleTheme} from '../util/controls'
import {renderBuilder} from '../util/renderBuilder'
import {renderForm} from '../util/renderForm'
import form from './forms/builder-theme.json'

const testId = 'test-theme-component'

const TestThemeComponent = (props: ComponentProps<any>) => {
  const theme = useBuilderTheme()
  return (
    <div {...props} data-testid={testId}>
      {theme}
    </div>
  )
}

const testThemeComponent = define(TestThemeComponent, 'TestThemeComponent')
const builderView = new BuilderView([testThemeComponent.build()])
const view = new View([testThemeComponent.build().model])

describe('useBuilderTheme hook', () => {
  it('should respond to theme changes in FormBuilder', async () => {
    const {findByTestId, container} = await renderBuilder(form, {view: builderView, theme: 'light'})
    const themeComponent = await findByTestId(testId)

    // the theme is set in the browser and can be light or dark
    const currentTheme = themeComponent.textContent ?? ''
    expect(currentTheme).oneOf(['dark', 'light'])

    await toggleTheme(container)
    expect(themeComponent).not.toHaveTextContent(currentTheme)
    const expectedTheme = currentTheme === 'light' ? 'dark' : 'light'
    expect(themeComponent).toHaveTextContent(expectedTheme)
  })

  it('should return default value in FormViewer', async () => {
    const {findByTestId} = renderForm(form, {view})
    const themeComponent = await findByTestId(testId)

    expect(themeComponent).toHaveTextContent('light')
  })
})
