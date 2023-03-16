import {render} from '@testing-library/react'
import {createView, FormViewer} from 'fb-core'

describe(`Component ${FormViewer.name}`, function () {
  it('should render', function () {
    render(<FormViewer view={createView()}/>)
  })
})
