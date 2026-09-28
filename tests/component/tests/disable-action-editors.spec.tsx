import {BuilderView, define} from '@react-form-builder/core'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent} from '@testing-library/react'
import {renderBuilder} from '../util/renderBuilder'
import form from './forms/disable-action-editors-form.json'

const ActionsDisabled = (props: any) => {
  return <div {...props} />
}

const actionsDisabled = define(ActionsDisabled, 'ActionsDisabled').hideActionEditors().build()

describe('DisableActionEditors feature test', () => {
  it('The editors on the Actions tab should be hidden.', async () => {
    const view = new BuilderView([...allComponentsBuilder, actionsDisabled])
    const {findByTestId, queryByTestId} = await renderBuilder(form, {view})

    const testInput = await findByTestId('testInput')
    fireEvent.click(testInput)

    fireEvent.click(await findByTestId('Actions_Tab'))
    expect(await findByTestId('onDidMount-add-button')).toBeInTheDocument()

    fireEvent.click(await findByTestId('actionsDisabled'))
    expect(queryByTestId('onDidMount-add-button')).not.toBeInTheDocument()
  })
})
