import {MantineProvider} from '@mantine/core'
import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormViewerProps} from '@react-form-builder/core'
import {FormBuilder, FormBuilderProps} from '@react-form-builder/designer'
import {render} from '@testing-library/react'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

export const renderBuilder = async (form: object | string, props?: Partial<FormBuilderProps>) => {
  const getForm = () => {
    return typeof form === 'string' ? form : JSON.stringify(form)
  }

  const viewerRef: FormViewerProps['viewerRef'] = {current: null}
  const builderRef: FormBuilderProps['builderRef'] = {current: null}

  const result = render(
    <MantineProvider>
      <FormBuilder view={builderViewWithCss} getForm={getForm} viewerRef={viewerRef} builderRef={builderRef} {...props} />
    </MantineProvider>
  )
  const getFormData = () => viewerRef.current?.formData
  const getFormBuilder = () => builderRef.current

  return {getFormData, getFormBuilder, ...result}
}
