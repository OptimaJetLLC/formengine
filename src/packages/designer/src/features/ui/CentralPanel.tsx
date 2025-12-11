import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {BuilderModeProvider, BuilderThemeProvider, FormViewer, useStore, useViewerProps} from '@react-form-builder/core'
import type {ComponentProps} from 'react'
import {useMemo} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {customizable, customizableObserver} from '../customization'
import {EditableWrapper} from '../dnd'
import {TrialMessage} from '../license/TrialMessage'
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
  gap: 0.5em;
  width: initial;
  margin-inline: 15px;
  overflow: auto;
  transition: max-width .2s ease, max-height .2s ease, border-radius .2s ease;

  &.withForm {
    padding: 0;
    border: 2px solid var(--rs-gray-500);
    border-radius: 10px;
    box-shadow: 0 5px 20px 0 rgb(0 0 0 / 15%);
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
  const {viewMode, landscapeMode, builderMode, theme, formStorageEnabled} = builderStore
  const viewerProps = useViewerProps()
  const componentWrapper = builderMode === 'builder' ? EditableWrapper : undefined

  const getForm = useMemo(() => {
    if (formStorageEnabled) {
      return builderStore.getStoredFormJson.bind(builderStore)
    }
    return viewerProps.getForm
  }, [builderStore, formStorageEnabled, viewerProps.getForm])

  return (
    <SContainer {...props}>
      <Header/>
      <BuilderModeProvider value={builderMode}>
        <BuilderThemeProvider value={theme}>
          <SFormContainer className={cx(viewMode, builderMode, {landscapeMode, withForm: !formLoadError})}>
            <TrialMessage/>
            <ErrorFormWrapper>
              <FormViewer {...viewerProps} componentWrapper={componentWrapper} viewMode={viewMode}
                          formName={builderStore.activeFormName} getForm={getForm}/>
            </ErrorFormWrapper>
          </SFormContainer>
        </BuilderThemeProvider>
      </BuilderModeProvider>
    </SContainer>
  )
}


export const CentralPanel = customizableObserver('CentralPanel', RawCentralPanel)
