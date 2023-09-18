import {namedObserver, useStore} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'

export const FormViewerState = namedObserver('FormState', () => {
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
})

const prettyPrint = (obj: Object) => {
  return <pre style={{whiteSpace: 'pre-wrap', marginTop: 5}}>{JSON.stringify(filterObj(obj), null, 2)}</pre>
}

const filterObj = (obj: Object) => {
  const filtered: any = {}
  Object.entries(obj).forEach(([key, value]) => {
    const typeIs = (valueType: string) => typeof value == valueType

    if (value instanceof Date) {
      filtered[key] = value.toISOString()
      return
    }

    if (typeIs('object')) {
      filtered[key] = filterObj(value)
      return
    }

    if (!(typeIs('string') || typeIs('number') || typeIs('boolean'))) {
      return
    }

    filtered[key] = value
  })

  return filtered
}
