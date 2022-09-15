import {observer} from 'mobx-react'
import React from 'react'
import {FormViewer, FormViewerProps} from '../../../FormViewer'
import {useStore} from '../../../utils/contexts/StoreContext'

export interface FormPreviewProps extends FormViewerProps {
}

export const Preview = observer((props: FormPreviewProps) => {
  const store = useStore()
  store.selected = null

  return <FormViewer {...props}/>
})
