import {BuilderModeProvider, BuilderThemeProvider, FormViewer, useStore, useViewerProps} from '@react-form-builder/core'
import cx from 'clsx'
import type {ComponentProps} from 'react'
import {useMemo, useRef} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {customizable} from '../customization/customizable'
import {customizableObserver} from '../customization/customizableObserver'
import {CanvasAutoScrollOnDrag} from '../dnd/components/CanvasAutoScrollOnDrag'
import {EditableWrapper} from '../dnd/components/Editable/Editable'
import {TrialMessage} from '../license/TrialMessage'
import styles from './CentralPanel.module.css'
import {ErrorFormWrapper} from './ErrorFormWrapper'
import {usePrintWhenViewerReady} from './Header/components/printForm'
import {Header} from './Header/Header'
import {NonVisualBar} from './NonVisualBar/NonVisualBar'
import {PanelContainer} from './Panel'

const FormContainer = (props: ComponentProps<typeof PanelContainer>) => (
  <PanelContainer {...props} className={cx(styles.formContainer, props.className)} />
)

const SFormContainer = customizable('FormContainer', FormContainer)

const RawCentralPanel = (props: ComponentProps<'div'>) => {
  const builderStore = useBuilderStore()
  const {formLoadError} = useStore()
  const {viewMode, landscapeMode, builderMode, theme, formStorageEnabled} = builderStore
  const viewerProps = useViewerProps()
  const componentWrapper = builderMode === 'builder' ? EditableWrapper : undefined
  const containerRef = useRef<HTMLDivElement>(null)
  usePrintWhenViewerReady(builderMode)

  const getForm = useMemo(() => {
    if (formStorageEnabled) {
      return builderStore.getStoredFormJson.bind(builderStore)
    }
    return viewerProps.getForm
  }, [builderStore, formStorageEnabled, viewerProps.getForm])

  return (
    <div {...props} ref={containerRef} className={cx(styles.container, props.className)}>
      {builderMode === 'builder' && <CanvasAutoScrollOnDrag containerRef={containerRef} />}
      <Header />
      <BuilderModeProvider value={builderMode}>
        <BuilderThemeProvider value={theme}>
          <SFormContainer className={cx(viewMode, builderMode, {landscapeMode, withForm: !formLoadError})}>
            <TrialMessage />
            <ErrorFormWrapper>
              <FormViewer
                {...viewerProps}
                componentWrapper={componentWrapper}
                viewMode={viewMode}
                formName={builderStore.activeFormName}
                getForm={getForm}
              />
            </ErrorFormWrapper>
            {builderMode === 'builder' && <NonVisualBar />}
          </SFormContainer>
        </BuilderThemeProvider>
      </BuilderModeProvider>
    </div>
  )
}

export const CentralPanel = customizableObserver('CentralPanel', RawCentralPanel)
