import {BuilderModeProvider, BuilderThemeProvider, FormViewer, useStore, useViewerProps} from '@react-form-builder/core'
import cx from 'clsx'
import type {ComponentProps} from 'react'
import {useMemo} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {customizable} from '../customization/customizable'
import {customizableObserver} from '../customization/customizableObserver'
import {EditableWrapper} from '../dnd/components/Editable/Editable'
import {TrialMessage} from '../license/TrialMessage'
import styles from './CentralPanel.module.css'
import {ErrorFormWrapper} from './ErrorFormWrapper'
import {Header} from './Header/Header'
import {PanelContainer} from './Panel'

const FormContainer = (props: ComponentProps<typeof PanelContainer>) => (
  <PanelContainer {...props} className={cx(styles.formContainer, props.className)}/>
)

const SFormContainer = customizable('FormContainer', FormContainer)

const RawCentralPanel = (props: ComponentProps<'div'>) => {
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
    <div {...props} className={cx(styles.container, props.className)}>
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
    </div>
  )
}

export const CentralPanel = customizableObserver('CentralPanel', RawCentralPanel)
