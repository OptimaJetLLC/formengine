import {namedObserver} from '@react-form-builder/core'
import {useEffect, useState} from 'react'
import {ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {EditButton, RemoveButton} from '../../../components/Buttons'
import {List, ListItem} from '../../../components/Containers'
import {useTranslationPart} from '../../../localization/hooks'
import {useShowMessage} from '../../../toast/toast'

export const FormList = namedObserver('FormList', () => {
  const builderStore = useBuilderStore()
  const [formList, setFormList] = useState<string[]>([])
  const t = useTranslationPart('leftMenu')
  const reloadForms = () => {
    builderStore.getFormKeys().then(setFormList)
  }
  const showMessage = useShowMessage()
  useEffect(() => {
    reloadForms()
  }, [builderStore.lastSaveTime])
  const onError = (err: any) => {
    console.error(err)
    showMessage({type: 'error', message: err})
  }

  if (formList.length <= 0) return <span>{t('noFormsInFormStorage')}</span>

  const items = formList.map((value, index) => {
    return <ListItem key={index}>
      <span style={{color: value === builderStore.formName ? 'var(--rs-navs-selected)' : 'var(--rs-text-secondary)'}}>
        {value}
      </span>
      <ButtonGroup>
        <EditButton onClick={() => builderStore.loadForm(value, reloadForms, onError)}/>
        <RemoveButton onClick={() => builderStore.removeForm(value, reloadForms)}/>
      </ButtonGroup>
    </ListItem>
  })

  return <List>{items}</List>
})
