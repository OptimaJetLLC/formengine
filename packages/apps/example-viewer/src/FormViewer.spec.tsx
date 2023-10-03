import {createView, FormViewer} from '@react-form-builder/core'
import {render} from '@testing-library/react'

describe(`Component ${FormViewer.name}`, function () {
  it('should render', function () {
    render(<FormViewer view={createView([])}/>)
  })
})
