import {buildForm} from '@react-form-builder/core'
import {ViewerLite} from '@react-form-builder/tests-common/lib/viewer/ViewerLite'
import {render} from '@testing-library/react'
import {expect} from 'vitest'
import {isBrowserMode} from '../config/isBrowserMode'
import {renderForm} from '../util/renderRsuiteForm'

const nestedForm = buildForm().component('header', 'RsHeader').prop('content', 'Nested header').json()

const rootForm = buildForm().component('embeddedForm', 'EmbeddedForm').prop('formName', 'nested-form').json()

const getForm = (name?: string) => {
  if (!name) return rootForm
  if (name === 'nested-form') return nestedForm
  throw new Error(`Unexpected form name \`${name}\``)
}

describe('ViewerWrapper root padding in nested forms', () => {
  it('should apply padding only to the root viewer', async () => {
    if (!isBrowserMode()) return

    const {getAllByTestId} = renderForm(rootForm, {getForm})

    const wrappers = getAllByTestId('viewer-wrapper')

    const wrapperWithPadding = wrappers.filter(element => {
      const style = window.getComputedStyle(element)
      return style.padding === '12px'
    })

    expect(wrapperWithPadding).toHaveLength(1)
  })

  it('should apply padding only to the root viewer wrapper - ViewerLite', async () => {
    if (!isBrowserMode()) return

    const {getAllByTestId} = render(<ViewerLite getForm={getForm} formName={'nested-form'} />)

    const wrappers = getAllByTestId('viewer-wrapper')
    const wrappersWithPadding = wrappers.filter(element => {
      const style = window.getComputedStyle(element)
      return style.padding === '12px'
    })

    expect(wrappersWithPadding).toHaveLength(1)
  })
})
