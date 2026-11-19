import {render} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {Viewer} from '../../common/lib/viewer/Viewer'

describe('Component Viewer', function () {
  it('should render', async () => {
    const {container, findByTestId} = render(<Viewer />)

    // ensure that the form is rendered
    expect(await findByTestId('password')).toBeInTheDocument()
    expect(container.firstChild?.firstChild).toHaveClass('optimajet-formviewer')
  })
})
