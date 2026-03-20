import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {fireEvent} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderBuilder} from '../util/renderBuilder'
import form from './forms/designer-form.json'

describe('ComponentBar', () => {
  it('shows the toolbar not found message when the search filter matches no components', async () => {
    const {findByTestId, findByPlaceholderText, findByText} = await renderBuilder(form, {
      licenseKey: generatedLicenseKey,
    })

    fireEvent.click(await findByTestId('Components_Tab'))

    const search = await findByPlaceholderText('Search...')
    fireEvent.change(search, {target: {value: '__no_components_match_this_query__'}})

    expect(await findByText('Not found')).toBeInTheDocument()
  })
})
