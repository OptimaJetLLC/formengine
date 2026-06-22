import {useColorMode} from '@docusaurus/theme-common'
import {BuilderThemeProvider, FormViewer as Viewer, FormViewerProps} from '@react-form-builder/core'
import {createRoot} from 'react-dom/client'
import {CreateRootContextProvider} from 'rsuite'

export const FormViewer = (props: FormViewerProps) => {
  const {colorMode} = useColorMode()

  return <CreateRootContextProvider value={createRoot}>
    <BuilderThemeProvider value={colorMode}>
      <Viewer {...props}/>
    </BuilderThemeProvider>
  </CreateRootContextProvider>
}
