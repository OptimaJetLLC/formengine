import {namedObserver} from '@react-form-builder/core'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {EditButton, RemoveButton} from '../../../components/Buttons'
import {List, ListItem} from '../../../components/Containers'
import {useShowMessage} from '../../../toast/toast'

export const FormList = namedObserver('FormList', () => {
  const builderStore = useBuilderStore()
  const [formList, setFormList] = useState<string[]>([])
  const {t} = useTranslation()
  const reloadForms = () => {
    builderStore.getFormKeys().then(setFormList)
  }
  const showPromptDialog = () => {
    builderStore.showPromptModal({
      value: '',
      title: t('leftMenu.enterFormName'),
      placeholder: t('leftMenu.formNamePlaceholder'),
      onOk: value => {
        if (value) builderStore.createForm(value).then(reloadForms)
      }
    })
  }
  const showMessage = useShowMessage()
  useEffect(() => {
    reloadForms()
  }, [builderStore.lastSaveTime])
  const onError = (err: any) => {
    console.error(err)
    showMessage({type: 'error', message: err})
  }

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

  return <List>
    <ListItem>
      <Button block onClick={showPromptDialog}>{t('formsList.addNewForm')}</Button>
    </ListItem>
    {items.length
      ? items
      : <ListItem>{t('formsList.noFormsInFormStorage')}</ListItem>
    }
  </List>
})
