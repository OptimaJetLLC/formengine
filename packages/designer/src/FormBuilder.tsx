import {FluentLocalizationEngine, isUndefined, namedObserver, SuppressResizeObserverErrors, useMobxConfig} from '@react-form-builder/core'
import cx from 'clsx'
import type {ComponentProps, ReactNode} from 'react'
import {Suspense, useEffect, useMemo} from 'react'
import {Loader} from 'rsuite'
import styles from './FormBuilder.module.css'
import type {FormBuilderProps} from './FormBuilderProps'
import {customizableObserver} from './features/customization/customizableObserver'
import {useHotkeys} from './features/hotkeys/useHotKeys'
import {useLicense} from './features/license/LicenseContext'
import {BottomPanel} from './features/ui/BottomPanel/BottomPanel'
import {BuilderProviders} from './features/ui/BuilderProviders'
import {CentralPanel} from './features/ui/CentralPanel'
import {ComponentsModal} from './features/ui/ComponentBar/ComponentsModal'
import {LeftPanel} from './features/ui/LeftPanel/LeftPanel'
import {PromptDialog} from './features/ui/PromptDialog'
import {RightPanel} from './features/ui/RightPanel/RightPanel'
import {useBuilderStore} from './utils/BuilderStoreContext'

const GlobalHotkeys = ({children}: {children: ReactNode}) => {
  const handleKeyDown = useHotkeys()

  // we need this effect to be inside Suspense
  useEffect(() => {
    globalThis.addEventListener('keydown', handleKeyDown)
    return () => globalThis.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return <div className={styles.container}>{children}</div>
}

const loaderFallbackElement = <Loader center content="loading" />

const RawFormBuilderView = (props: ComponentProps<'div'>) => {
  const builderStore = useBuilderStore()
  const {checkLicense} = useLicense()

  useEffect(() => {
    if (!isUndefined(builderStore.props.customization)) {
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
          <div {...props} className={cx(styles.content, props.className)}>
            <LeftPanel />
            <CentralPanel />
            <RightPanel />
            <ComponentsModal />
            <PromptDialog />
          </div>
          <BottomPanel />
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
const RawFormBuilder = (props: FormBuilderProps) => {
  useMobxConfig()

  const localizationEngine = useMemo(() => props.localizationEngine ?? new FluentLocalizationEngine(), [props.localizationEngine])
  const finalProps = useMemo(
    () => ({
      ...props,
      localizationEngine,
    }),
    [localizationEngine, props]
  )

  return (
    <BuilderProviders props={finalProps}>
      <FormBuilderView />
    </BuilderProviders>
  )
}

export const FormBuilder = namedObserver('FormBuilder', RawFormBuilder)
