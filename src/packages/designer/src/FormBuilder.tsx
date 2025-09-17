import styled from '@emotion/styled'
import {namedObserver, SuppressResizeObserverErrors} from '@react-form-builder/core'
import type {ComponentProps, ReactNode} from 'react'
import {Suspense, useEffect} from 'react'
import {Loader} from 'rsuite'
import {customizableObserver} from './features/customization'
import {useHotkeys} from './features/hotkeys/useHotKeys'
import {useLicense} from './features/license/LicenseContext'
import {BottomPanel} from './features/ui/BottomPanel'
import {BuilderProviders} from './features/ui/BuilderProviders'
import {CentralPanel} from './features/ui/CentralPanel'
import {ComponentsModal} from './features/ui/ComponentBar/ComponentsModal'
import {LeftPanel} from './features/ui/LeftPanel'
import {PromptDialog} from './features/ui/PromptDialog'
import {RightPanel} from './features/ui/RightPanel'
import type {FormBuilderProps} from './FormBuilderProps'
import {useBuilderStore} from './utils/BuilderStoreContext'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background-color: white;

  .rs-theme-dark & {
    background-color: #303336;
  }
`

const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  min-height: 0;
  padding-bottom: 15px;
`

const GlobalHotkeys = ({children}: { children: ReactNode }) => {
  const handleKeyDown = useHotkeys()

  // we need this effect to be inside Suspense
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return <Container>{children}</Container>
}

const loaderFallbackElement = <Loader center content="loading"/>

const RawFormBuilderView = (props: ComponentProps<typeof Container>) => {
  const builderStore = useBuilderStore()
  const {checkLicense} = useLicense()

  useEffect(() => {
    if (typeof builderStore.props.customization !== 'undefined') {
      checkLicense([{name: 'ftDesignerCustomization'}])
    }
  }, [checkLicense, builderStore.props.customization])

  useEffect(() => {
    if (builderStore.hasPresetComponents) {
      checkLicense([{name: 'ftComponentPreset'}])
    }
  }, [checkLicense, builderStore.hasPresetComponents])

  return (
    <SuppressResizeObserverErrors>
      <Suspense fallback={loaderFallbackElement}>
        <GlobalHotkeys>
          <Content {...props}>
            <LeftPanel/>
            <CentralPanel/>
            <RightPanel/>
            <ComponentsModal/>
            <PromptDialog/>
          </Content>
          <BottomPanel/>
        </GlobalHotkeys>
      </Suspense>
    </SuppressResizeObserverErrors>
  )
}

const FormBuilderView = customizableObserver('MainContainer', RawFormBuilderView)

/**
 * The React component that displays the form builder.
 * @param props the React component properties.
 * @returns the React element.
 */
const RawFormBuilder = (props: FormBuilderProps) =>
  <BuilderProviders props={props}>
    <FormBuilderView/>
  </BuilderProviders>

export const FormBuilder = namedObserver('FormBuilder', RawFormBuilder)
