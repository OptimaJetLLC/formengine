import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import {EditableAction, CustomValidationCode, EditableProperty} from '../../../stores/BuilderStore'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {CustomActionEditor} from '../../annotation-editors/EventEditor/components/CustomActionEditor'
import {ComputedPropertyEditor} from './ComputedPropertyEditor'
import {CustomValidationCodeEditor} from './CustomValidationCodeEditor'

export const BottomPanel = observer(() => {
  const {currentEditable} = useBuilderStore()

  let editor = null
  if (currentEditable instanceof EditableAction) {
    editor = <CustomActionEditor {...currentEditable}/>
  }

  if (currentEditable instanceof EditableProperty) {
    editor = <ComputedPropertyEditor property={currentEditable}/>
  }

  if (currentEditable instanceof CustomValidationCode) {
    editor = <CustomValidationCodeEditor {...currentEditable}/>
  }

  if (!editor) return null

  return <PanelContainer>{editor}</PanelContainer>
})

const PanelContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 380px;
  width: 100%;
  padding: 10px;
  gap: 10px;
  box-shadow: 0 -5px 20px 0 rgb(0 0 0 / 15%);
`
