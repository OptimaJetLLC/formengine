import {render} from '@testing-library/react'
import {expect} from 'vitest'
import {Viewer} from '../../common/lib/viewer/Viewer'

describe('Component Viewer', function () {
  it('should render', async () => {
    const {container, findByTestId} = render(<Viewer/>)

    // ensure that the form is rendered
    expect(await findByTestId('password')).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('optimajet-formviewer')
  })
})
