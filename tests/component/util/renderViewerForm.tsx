import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {render} from '@testing-library/react'

export const renderViewerForm = (view: FormViewerProps['view'], form: object | string, props?: Partial<FormViewerProps>) => {
  const getForm = () => {
    return typeof form === 'string' ? form : JSON.stringify(form)
  }

  const viewerRef: FormViewerProps['viewerRef'] = {current: null}

  const result = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} {...props} />)

  const formData = viewerRef.current?.formData
  if (!formData) {
    throw new Error('FormData is not defined')
  }

  return {formData, ...result}
}
