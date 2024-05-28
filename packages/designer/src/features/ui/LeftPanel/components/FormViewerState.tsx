import {namedObserver, useStore} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'
import {prepareForJson} from '../../../../utils/parseJson'

const RawFormViewerState = () => {
  const store = useStore()
  const {t} = useTranslation()
  const errors = store.form.componentTree.errors
  const data = store.form.componentTree.data

  return <>
    <div>
      <h6>{t('errorsPanel.data')}</h6>
      {prettyPrint(data)}
    </div>
    <div>
      <h6>{t('errorsPanel.errors')}</h6>
      {prettyPrint(errors)}
    </div>
  </>
}

export const FormViewerState = namedObserver('FormState', RawFormViewerState)

const prettyPrint = (obj: Object) => {
  return <pre style={{whiteSpace: 'pre-wrap', marginTop: 5}}>{JSON.stringify(prepareForJson(obj), null, 2)}</pre>
}
