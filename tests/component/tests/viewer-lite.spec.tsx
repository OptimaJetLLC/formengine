import {render} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {ViewerLite} from '../../common/lib/viewer/ViewerLite'

describe('Component ViewerLite', function () {
  it('should render without localization', async () => {
    const {container, findByTestId, findByRole} = render(<ViewerLite />)

    expect(await findByTestId('password')).toBeInTheDocument()
    expect(container.firstChild?.firstChild).toHaveClass('optimajet-formviewer')

    const button = await findByRole('button', {name: /Login/i})
    expect(button).toBeInTheDocument()
  })

  it('should render with localizer', async () => {
    const {container, findByTestId, findByRole} = render(<ViewerLite withLocalizer />)

    expect(await findByTestId('password')).toBeInTheDocument()
    expect(container.firstChild?.firstChild).toHaveClass('optimajet-formviewer')

    const button = await findByRole('button', {name: /Submit/i})
    expect(button).toBeInTheDocument()
  })
})
