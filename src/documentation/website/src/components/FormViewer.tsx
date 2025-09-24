import {useColorMode} from '@docusaurus/theme-common'
import {FormViewer as Viewer, FormViewerProps} from '@react-form-builder/core'
import {CustomProvider} from 'rsuite'

export const FormViewer = (props: FormViewerProps) => {
  const {colorMode} = useColorMode()

  return <CustomProvider theme={colorMode}>
    <Viewer {...props} />
  </CustomProvider>
}
