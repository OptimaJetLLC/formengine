import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {FormViewer, namedObserver, useViewerProps} from 'fb-core'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {Editable} from '../dnd'
import {SlotWrapper} from '../dnd/components/SlotWrapper'
import {PanelContainer} from './Panel'

export const CentralPanel = namedObserver('CentralPanel', () => {
  const {viewMode, landscapeMode, builderMode} = useBuilderStore()
  const props = useViewerProps()
  const componentWrapper = builderMode === 'builder' ? Editable : undefined
  const slotWrapper = builderMode === 'builder' ? SlotWrapper : undefined

  return (
    <FormContainer className={cx(viewMode, {landscapeMode})}>
      <FormViewer {...props} componentWrapper={componentWrapper} viewMode={viewMode} slotWrapper={slotWrapper}/>
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
  transition: max-width .2s ease, max-height .2s ease, border-radius .2s ease;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 15%);
  background-color: white;

  &.mobile {
    max-width: 400px;
    max-height: 800px;

    &.landscapeMode {
      max-width: 800px;
      max-height: 400px;
    }
  }

  &.tablet {
    max-width: 800px;
    max-height: 1200px;

    &.landscapeMode {
      max-width: 1200px;
      max-height: 800px;
    }
  }
`
