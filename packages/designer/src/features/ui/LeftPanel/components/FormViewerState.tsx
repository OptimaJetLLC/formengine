import styled from '@emotion/styled'
import {namedObserver, useStore} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'
import {prepareForJson} from '../../../../utils/parseJson'

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;

  pre {
    white-space: pre-wrap;
    margin-top: 5px;
    max-width: 100%;
    word-break: break-word;
    overflow: auto;
  }
`

const prettyPrint = (obj: Object) => {
  return <pre>{JSON.stringify(prepareForJson(obj, {previewNativeObjects: true}), null, 2)}</pre>
}

const RawFormViewerState = () => {
  const store = useStore()
  const {t} = useTranslation()
  const errors = store.form.componentTree.errors
  const data = store.form.componentTree.data

  return <>
    <SDiv>
      <h6>{t('errorsPanel.data')}</h6>
      {prettyPrint(data)}
    </SDiv>
    <SDiv>
      <h6>{t('errorsPanel.errors')}</h6>
      {prettyPrint(errors)}
    </SDiv>
  </>
}
export const FormViewerState = namedObserver('FormState', RawFormViewerState)
