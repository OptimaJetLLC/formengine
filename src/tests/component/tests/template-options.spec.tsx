import {viewWithCss} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import childFormVersion1 from './forms/template-options/child-form-version-1.json'
import childFormVersion2 from './forms/template-options/child-form-version-2.json'
import rootForm from './forms/template-options/root-form.json'

describe('Template options test', () => {
  const getForm = (name?: string, options?: any) => {
    if (!name) return JSON.stringify(rootForm)
    if (name !== 'simple-form-1') throw new Error(`Unexpected form name: '${name}'`)
    if (options?.version === 1) return JSON.stringify(childFormVersion1)
    if (options?.version === 2) return JSON.stringify(childFormVersion2)
    throw new Error(`Unexpected form options: '${JSON.stringify(options)}'`)
  }

  it('Should show the correct template by version number', async () => {
    const {findByTestId} = render(<FormViewer getForm={getForm} view={viewWithCss}/>)
    expect(await findByTestId('header-version-1')).toBeInTheDocument()
    expect(await findByTestId('header-version-2')).toBeInTheDocument()
  })
})
