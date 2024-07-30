import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import type {ComponentData} from '@react-form-builder/core'
import {FormViewer, useViewerProps} from '@react-form-builder/core'
import type {ComponentProps} from 'react'
import {useCallback} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {customizable, customizableObserver} from '../customization'
import {EditableWrapper, getBuilderChildren} from '../dnd'
import {Header} from './Header/Header'
import {PanelContainer} from './Panel'

const RawCentralPanel = (props: ComponentProps<typeof SContainer>) => {
  const builderStore = useBuilderStore()
  const {viewMode, landscapeMode, builderMode} = builderStore
  const viewerProps = useViewerProps()
  const componentWrapper = builderMode === 'builder' ? EditableWrapper : undefined
  const builderComputeChildren = useCallback((componentData: ComponentData, componentProps: Record<string, any>) => {
    return getBuilderChildren(builderStore, componentData, componentProps)
  }, [builderStore])
  const computeChildren = builderMode === 'builder' ? builderComputeChildren : undefined

  return (
    <SContainer {...props}>
      <Header/>
      <SFormContainer className={cx(viewMode, builderMode, {landscapeMode})}>
        <FormViewer {...viewerProps} componentWrapper={componentWrapper} viewMode={viewMode} computeChildren={computeChildren}
                    formName={builderStore.activeFormName}/>
      </SFormContainer>
    </SContainer>
  )
}

export const CentralPanel = customizableObserver('CentralPanel', RawCentralPanel)

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
  padding: 12px;
  overflow: auto;
  transition: max-width .2s ease, max-height .2s ease, border-radius .2s ease;
  border: 2px solid var(--rs-gray-500);
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
`)
