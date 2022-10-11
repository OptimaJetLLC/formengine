import {render} from '@testing-library/react'
import {View} from './features/define'
import {FormViewer} from './FormViewer'

describe(`Component ${FormViewer.name}`, function () {
  it.skip('should render', function () {
    render(<FormViewer view={new View()}/>)
  })
})
