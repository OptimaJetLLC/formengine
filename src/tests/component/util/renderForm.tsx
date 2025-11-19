import {createView, FormViewer, FormViewerProps} from '@react-form-builder/core'
import {allComponentsViewer} from '@react-form-builder/tests-common/lib/all-components'
import {render} from '@testing-library/react'

const view = createView(allComponentsViewer)

export const renderForm = (form: object | string, props?: Partial<FormViewerProps>) => {
  const getForm = () => {
    return typeof form === 'string' ? form : JSON.stringify(form)
  }

  const viewerRef: FormViewerProps['viewerRef'] = {current: null}

  const result = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} {...props}/>)

  const formData = viewerRef.current?.formData
  if (!formData) {
    throw new Error('FormData is not defined')
  }

  return {formData, ...result}
}
