import {faSpellCheck} from '@fortawesome/free-solid-svg-icons'
import {namedObserver, useStore} from '@react-form-builder/core'
import {useCallback} from 'react'
import {Button} from 'rsuite'
import {prepareForJson} from '../../../../utils/parseJson'
import {FaIcon} from '../../../components/Icons'
import {useTranslationPart} from '../../../localization/hooks'
import styles from './FormViewerState.module.css'

const prettyPrint = (obj: any, dataTestId: string) => {
  const json = prepareForJson(obj, {previewNativeObjects: true})
  const jsonText = JSON.stringify(json, null, 2)
  return <pre data-testid={dataTestId}>{jsonText}</pre>
}

const RawFormViewerState = () => {
  const form = useStore().form.componentTree
  const t = useTranslationPart('errorsPanel')
  const validate = useCallback(() => {
    form.validate().catch(console.error)
  }, [form])
  const reset = useCallback(() => form.reset(), [form])
  const clear = useCallback(() => form.clear(), [form])

  return (
    <>
      <div className={styles.root}>
        <h6>{t('data')}</h6>
        <div className={styles.toolbar}>
          <Button onClick={validate} size="sm" appearance="ghost" className={styles.button} data-testid="viewer-validate-button">
            <FaIcon icon={faSpellCheck} />
            {t('validate')}
          </Button>
          <Button onClick={reset} size={'sm'} appearance={'ghost'} data-testid={'viewer-reset-button'}>
            {t('reset')}
          </Button>
          <Button onClick={clear} size={'sm'} appearance={'ghost'} data-testid={'viewer-clear-button'}>
            {t('clear')}
          </Button>
        </div>
        {prettyPrint(form.data, 'form-viewer-state-json-data')}
      </div>
      <div className={styles.root}>
        <h6>{t('errors')}</h6>
        {prettyPrint(form.errors, 'form-viewer-state-json-errors')}
      </div>
    </>
  )
}
export const FormViewerState = namedObserver('FormState', RawFormViewerState)
