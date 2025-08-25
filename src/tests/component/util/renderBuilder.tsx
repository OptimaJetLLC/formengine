import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormViewerProps} from '@react-form-builder/core'
import {FormBuilder, FormBuilderProps} from '@react-form-builder/designer'
import {render} from '@testing-library/react'

type BuilderProps = Omit<FormBuilderProps, 'view'>

export const renderBuilder = async (form: object, props?: BuilderProps) => {
  const getForm = () => JSON.stringify(form)
  const viewerRef: FormViewerProps['viewerRef'] = {current: null}
  const builderRef: FormBuilderProps['builderRef'] = {current: null}

  const result = render(<FormBuilder view={builderViewWithCss} getForm={getForm}
                                     viewerRef={viewerRef} builderRef={builderRef} {...props}/>)
  const getFormData = () => viewerRef.current?.formData
  const getFormBuilder = () => builderRef.current

  return {getFormData, getFormBuilder, ...result}
}
