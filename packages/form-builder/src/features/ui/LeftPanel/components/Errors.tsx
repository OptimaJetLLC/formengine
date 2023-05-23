import {useStore} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {Rows} from '../../../components/Containers'

const Errors = observer((props: any) => {
  const store = useStore()
  const {t} = useTranslation()
  const {errors, data} = store.form

  return (<Rows {...props} gap={10}>
      <div>
        <h6>{t('errorsPanel.data')}</h6>
        {prettyPrint(data)}
      </div>
      <div>
        <h6>{t('errorsPanel.errors')}</h6>
        {prettyPrint(errors)}
      </div>
    </Rows>
  )
})

const prettyPrint = (obj: Object) => {
  return <pre style={{whiteSpace: 'pre-wrap', marginTop: 5}}>{JSON.stringify(filterObj(obj), null, 2)}</pre>
}

const filterObj = (obj: Object) => {
  const filtered: any = {}
  Object.entries(obj).forEach(([key, value]) => {
    const typeIs = (valueType: string) => typeof value == valueType

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

export {Errors}
