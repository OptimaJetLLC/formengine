import {fireEvent} from '@testing-library/react'
import {openToolbarActions} from '../util/openToolbarActions'
import {renderBuilder} from '../util/renderBuilder'
import form from './forms/fe-1570-form.json'

describe('FE-1570 Check the render method of `RawActionList`', () => {
  it('There should be no error messages when cloning a component with actions.', async () => {
    const {container, findAllByTestId, findByTestId} = await renderBuilder(form)

    fireEvent.click(await findByTestId('Actions_Tab'))

    expect(await findByTestId('testInput')).toBeInTheDocument()

    const componentWrapper = container.querySelector('.type-RsInput')
    if (!(componentWrapper instanceof HTMLElement)) {
      throw new Error('Cannot find wrapper HTMLElement')
    }

    fireEvent.click(componentWrapper)
    await openToolbarActions()
    fireEvent.click(await findByTestId('tree-clone-button'))

    const components = await findAllByTestId('testInput')
    expect(components).toHaveLength(2)
  })
})
