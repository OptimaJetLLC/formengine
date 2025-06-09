import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {BuilderModeProvider, FormViewer, useStore, useViewerProps} from '@react-form-builder/core'
import type {ComponentProps} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {customizable, customizableObserver} from '../customization'
import {EditableWrapper} from '../dnd'
import {ErrorFormWrapper} from './ErrorFormWrapper'
import {Header} from './Header/Header'
import {PanelContainer} from './Panel'

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 550px;
`

const SFormContainer = customizable('FormContainer', styled(PanelContainer)`
  flex: 1;
  z-index: 4;
  flex-direction: column;
  width: initial;
  margin-inline: 15px;
  overflow: auto;
  transition: max-width .2s ease, max-height .2s ease, border-radius .2s ease;

  &.withForm {
    padding: 12px;
    border: 2px solid var(--rs-gray-500);
    border-radius: 10px;
    box-shadow: 0 5px 20px 0 rgb(0 0 0 / 15%);
    background-color: #ffffffa1;

    .rs-theme-dark & {
      background-color: #414549;
    }
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
`)

const RawCentralPanel = (props: ComponentProps<typeof SContainer>) => {
  const builderStore = useBuilderStore()
  const {formLoadError} = useStore()
  const {viewMode, landscapeMode, builderMode} = builderStore
  const viewerProps = useViewerProps()
  const componentWrapper = builderMode === 'builder' ? EditableWrapper : undefined

  return (
    <SContainer {...props}>
      <Header/>
      <SFormContainer className={cx(viewMode, builderMode, {landscapeMode, withForm: !formLoadError})}>
        <BuilderModeProvider value={builderMode}>
          <ErrorFormWrapper>
            <FormViewer {...viewerProps} componentWrapper={componentWrapper} viewMode={viewMode}
                        formName={builderStore.activeFormName}/>
          </ErrorFormWrapper>
        </BuilderModeProvider>
      </SFormContainer>
    </SContainer>
  )
}


export const CentralPanel = customizableObserver('CentralPanel', RawCentralPanel)
