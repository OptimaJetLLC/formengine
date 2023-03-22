import styled from '@emotion/styled'
import {FormViewer, namedObserver, useStore} from 'fb-core'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {PanelContainer} from './Panel'

const resolutions = {
  'desktop': {},
  'mobile': {maxWidth: 400, maxHeight: 800},
  'tablet': {maxWidth: 800},
}

export const CentralPanel = namedObserver('CentralPanel', () => {
  const store = useStore()
  const {viewMode} = useBuilderStore()

  return (
    <FormContainer style={resolutions[viewMode]}>
      <FormViewer {...store.props} viewMode={viewMode}/>
    </FormContainer>
  )
})

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
