import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import React from 'react'
import {useStore} from '../../../utils/contexts/StoreContext'
import {Editable} from '../../dnd'
import {FormViewer} from '../../form-viewer/FormViewer'
import {PanelContainer} from './Panel'

const _CentralPanel = () => {
  const store = useStore()
  store.Wrapper = store.isBuilderMode ? Editable : undefined

  return (
    <FormContainer>
      <FormViewer {...store.props}/>
    </FormContainer>
  )
}

export const CentralPanel = observer(_CentralPanel)

const FormContainer = styled(PanelContainer)`
  flex: 1;
  z-index: 1;
  flex-direction: column;
  width: initial;
  margin-inline: 15px;
  padding: 12px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: height .2s ease, width .2s ease, border-radius .2s ease;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 15%);
  background-color: white;
`
