import {BuilderView, define} from '@react-form-builder/core'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {act, fireEvent} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'
import form from './forms/hide-tooltip-editor-form.json'

const HideTooltipComponent = (props: any) => {
  return <div {...props}></div>
}

const hideTooltipComponent = define(HideTooltipComponent, 'HideTooltipComponent').hideTooltipEditor().build()

describe('Hide tooltip editor test', () => {
  it('hideTooltipEditor should hide the tooltip editor in Designer', async () => {
    const view = new BuilderView([...allComponentsBuilder, hideTooltipComponent])

    const {findByTestId, queryByTestId} = await renderBuilder(form, {view})

    const button = await findByTestId('rsButton1')
    await act(async () => {
      fireEvent.click(button)
    })

    expect(await findByTestId('enable-tooltip-checkbox')).toBeInTheDocument()

    const testComponent = await findByTestId('hideTooltipComponent1')
    await act(async () => {
      fireEvent.click(testComponent)
    })

    expect(queryByTestId('enable-tooltip-checkbox')).not.toBeInTheDocument()
  })
})
