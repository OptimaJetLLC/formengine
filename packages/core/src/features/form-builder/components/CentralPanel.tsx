import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import {useBuilderStore} from '../../../utils/contexts/BuilderStoreContext'
import {useStore} from '../../../utils/contexts/StoreContext'
import {FormViewer} from '../../form-viewer/FormViewer'
import {JsonView} from './JsonView'
import {PanelContainer} from './Panel'

const resolutions = {
  'desktop': {},
  'mobile': {maxWidth: 400},
  'tablet': {maxWidth: 800},
}

const _CentralPanel = () => {
  const store = useStore()
  const builderStore = useBuilderStore()
  const view = builderStore.builderMode === 'json' ? <JsonView/> : <FormViewer {...store.props}/>

  return (
    <FormContainer>
      <Viewport style={resolutions[builderStore.viewMode]}>
        {view}
      </Viewport>
    </FormContainer>
  )
}

export const CentralPanel = observer(_CentralPanel)

const Viewport = styled.div`
`

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
