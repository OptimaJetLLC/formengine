import styled from '@emotion/styled'
import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faSpellCheck from '@fortawesome/free-solid-svg-icons/faSpellCheck.js'
import {namedObserver, useStore} from '@react-form-builder/core'
import {useCallback} from 'react'
import {Button} from 'rsuite'
import {prepareForJson} from '../../../../utils/parseJson'
import {itemStyle} from '../../../components/Containers'
import {FaIcon} from '../../../components/Icons'
import {useTranslationPart} from '../../../localization/hooks'

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  gap: 5px;

  pre {
    white-space: pre-wrap;
    margin: 0;
    max-width: 100%;
    word-break: break-word;
    overflow: auto;
    ${itemStyle};
  }
`

const SToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 275px;
  padding-inline-end: 2px;
`

const buttonStyle = {
  display: 'flex',
  gap: 10
}

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

  return <>
    <SDiv>
      <h6>{t('data')}</h6>
      <SToolbar>
        <Button onClick={validate} size={'sm'} appearance={'ghost'} style={buttonStyle} data-testid={'viewer-validate-button'}>
          <FaIcon icon={faSpellCheck as unknown as IconDefinition}/>
          {t('validate')}
        </Button>
        <Button onClick={reset} size={'sm'} appearance={'ghost'} data-testid={'viewer-reset-button'}>{t('reset')}</Button>
        <Button onClick={clear} size={'sm'} appearance={'ghost'} data-testid={'viewer-clear-button'}>{t('clear')}</Button>
      </SToolbar>
      {prettyPrint(form.data, 'form-viewer-state-json-data')}
    </SDiv>
    <SDiv>
      <h6>{t('errors')}</h6>
      {prettyPrint(form.errors, 'form-viewer-state-json-errors')}
    </SDiv>
  </>
}
export const FormViewerState = namedObserver('FormState', RawFormViewerState)
