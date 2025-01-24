import {render} from '@testing-library/react'
import {expect} from 'vitest'
import {Viewer} from '../../common/lib/viewer/Viewer'

// @ts-ignore it must have displayName
describe(`Component ${Viewer.displayName}`, function () {
  it('should render', () => {
    const viewer = render(<Viewer/>)

    expect(viewer.container?.firstChild).toHaveClass('optimajet-formviewer')
  })
})
