import {view} from '@react-form-builder/components-rsuite'
import {FormViewer, FormViewerProps} from '@react-form-builder/core'
import {render} from '@testing-library/react'

type ViewerProps = Omit<FormViewerProps, 'view'>

export const renderForm = (form: object, props?: ViewerProps) => {
  const getForm = () => JSON.stringify(form)
  const viewerRef: FormViewerProps['viewerRef'] = {current: null}

  const result = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} {...props}/>)

  const formData = viewerRef.current?.formData
  if (!formData) {
    throw new Error('FormData is not defined')
  }

  return {formData, ...result}
}
