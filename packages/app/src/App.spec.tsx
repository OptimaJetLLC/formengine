import {render} from '@testing-library/react'
import App from './App'

describe(`Component: ${App.name}`, function () {

  it('should render', function () {
    render(<App/>)
  })
})
