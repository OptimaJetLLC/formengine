import {useComponentData} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {Input} from 'rsuite'
import {useTranslationPart} from '../../../localization/hooks'

export const ClassName = observer(() => {
  const {store} = useComponentData()
  const t = useTranslationPart('style')

  const handleChange = (value: string) => {
    store.css ??= {}
    store.css.className = value
  }

  return (
    <div>
      <label>{t('className')}</label>
      <Input value={store.css?.className ?? ''} onChange={handleChange} size={'xs'}/>
    </div>
  )
})
