import {useColorMode} from '@docusaurus/theme-common'
import {FormViewer as Viewer, FormViewerProps} from '@react-form-builder/core'
import {createRoot} from 'react-dom/client'
import {CreateRootContextProvider, CustomProvider} from 'rsuite'

export const FormViewer = (props: FormViewerProps) => {
  const {colorMode} = useColorMode()

  return <CreateRootContextProvider value={createRoot}>
    <CustomProvider theme={colorMode}>
      <Viewer {...props} />
    </CustomProvider>
  </CreateRootContextProvider>
}
