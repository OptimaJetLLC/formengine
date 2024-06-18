import {ComponentProps, useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {EditButton, RemoveButton} from '../../../components/Buttons'
import {List, ListItem} from '../../../components/Containers'
import {customizableObserver} from '../../../customization'
import {useShowMessage} from '../../../toast/toast'

const RawFormList = (props: ComponentProps<typeof List>) => {
  const builderStore = useBuilderStore()
  const [formList, setFormList] = useState<string[]>([])
  const {t} = useTranslation()
  const showMessage = useShowMessage()

  const reloadForms = useCallback(() => {
    builderStore.getFormKeys().then(setFormList)
  }, [builderStore])

  const showPromptDialog = useCallback(() => {
    builderStore.showPromptModal({
      value: '',
      title: t('leftMenu.enterFormName'),
      placeholder: t('leftMenu.formNamePlaceholder'),
      onOk: value => {
        if (value) builderStore.createForm(value).then(reloadForms)
      }
    })
  }, [builderStore, reloadForms, t])

  useEffect(() => {
    reloadForms()
  }, [builderStore.lastSaveTime, reloadForms])

  const onError = useCallback((err: any) => {
    console.error(err)
    showMessage({type: 'error', message: err})
  }, [showMessage])

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

  return <List {...props}>
    <ListItem>
      <Button block onClick={showPromptDialog}>{t('formsList.addNewForm')}</Button>
    </ListItem>
    {items.length
      ? items
      : <ListItem>{t('formsList.noFormsInFormStorage')}</ListItem>
    }
  </List>
}

export const FormList = customizableObserver('Forms_Tab_Content', RawFormList)
