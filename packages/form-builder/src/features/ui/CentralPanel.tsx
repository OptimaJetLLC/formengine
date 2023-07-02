import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {FormViewer, namedObserver, useViewerProps} from '@react-form-builder/core'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {Editable} from '../dnd'
import {SlotWrapper} from '../dnd/components/SlotWrapper'
import {Header} from './Header/Header'
import {PanelContainer} from './Panel'

export const CentralPanel = namedObserver('CentralPanel', () => {
  const {viewMode, landscapeMode, builderMode} = useBuilderStore()
  const props = useViewerProps()
  const componentWrapper = builderMode === 'builder' ? Editable : undefined
  const slotWrapper = builderMode === 'builder' ? SlotWrapper : undefined

  return (
    <Container>
      <Header/>
      <FormContainer className={cx(viewMode, {landscapeMode})}>
        <FormViewer {...props} componentWrapper={componentWrapper} viewMode={viewMode} slotWrapper={slotWrapper}/>
      </FormContainer>
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`

const FormContainer = styled(PanelContainer)`
  flex: 1;
  z-index: 1;
  flex-direction: column;
  width: initial;
  margin-inline: 15px;
  margin-bottom: 15px;
  padding: 12px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: max-width .2s ease, max-height .2s ease, border-radius .2s ease;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 15%);

  background-color: #ffffffa1;

  .rs-theme-dark & {
    background-color: #414549;
  }


  &.mobile {
    width: 400px;
    max-height: 800px;
    align-self: center;

    &.landscapeMode {
      width: 800px;
      max-height: 400px;
    }
  }

  &.tablet {
    width: 800px;
    max-height: 1200px;
    align-self: center;

    &.landscapeMode {
      width: 1200px;
      max-height: 800px;
    }
  }
`
