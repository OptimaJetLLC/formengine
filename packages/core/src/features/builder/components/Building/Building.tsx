import {observer} from 'mobx-react'
import React from 'react'
import {Editable} from '../../../dnd'
import {FormViewer, FormViewerProps} from '../../../viewer/FormViewer'

export interface FormBuilderProps extends FormViewerProps {
}

const Building = observer((props: FormBuilderProps) => {
  return <FormViewer {...props} Wrapper={Editable}/>
})

export {Building}
