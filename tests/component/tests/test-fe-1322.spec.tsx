import {view} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import form from './forms/fe-1322-form.json'

describe('FE-1322 Not all keys are unique after form load', () => {
  it('Should change the component keys to the unique keys', async () => {
    const getForm = () => JSON.stringify(form)
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef}/>)

    expect(await findByTestId('rsInput1')).toHaveValue('three')

    const expected = {rsInput1: 'one', rsInput2: 'two', rsInput3: 'three'}
    expect(viewerRef.current?.formData?.data).toStrictEqual(expected)
  })
})
