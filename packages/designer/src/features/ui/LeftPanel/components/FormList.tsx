import {ComponentProps, useCallback, useEffect, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {EditButton, RemoveButton} from '../../../components/Buttons'
import {List, ListItem} from '../../../components/Containers'
import {customizableObserver} from '../../../customization'
import {useShowMessage} from '../../../toast/toast'

function FormListItem({active, onLoadForm, onRemoveForm, name}: {
  active: boolean,
  name: string,
  onLoadForm: (name: string) => void,
  onRemoveForm: (name: string) => void
}) {
  const labelStyle = useMemo(() => ({color: active ? 'var(--rs-navs-selected)' : 'var(--rs-text-secondary)'}), [active])

  const handleLoad = useCallback(() => {
    onLoadForm(name)
  }, [name, onLoadForm])

  const handleRemove = useCallback(() => {
    onRemoveForm(name)
  }, [name, onRemoveForm])

  return <ListItem>
    <span style={labelStyle}>
      {name}
    </span>
    <ButtonGroup>
      <EditButton onClick={handleLoad}/>
      <RemoveButton onClick={handleRemove}/>
    </ButtonGroup>
  </ListItem>
}

const RawFormList = (props: ComponentProps<typeof List>) => {
  const builderStore = useBuilderStore()
  const [formList, setFormList] = useState<string[]>([])
  const {t} = useTranslation()
  const showMessage = useShowMessage()

  const onError = useCallback((err: any) => {
    console.error(err)
    showMessage({type: 'error', message: err})
  }, [showMessage])

  const reloadForms = useCallback(() => {
    builderStore.getFormKeys().then(setFormList)
  }, [builderStore])

  const loadForm = useCallback((name: string) => {
    builderStore.loadForm(name, reloadForms, onError)
  }, [builderStore, onError, reloadForms])

  const removeForm = useCallback((name: string) => {
    builderStore.removeForm(name, reloadForms)
  }, [builderStore, reloadForms])

  const handleAddForm = useCallback((name: string) => {
    if (name) {
      builderStore.createForm(name)
        .then(reloadForms)
        .then(() => builderStore.save())
        .then(() => loadForm(name))
    }
  }, [builderStore, loadForm, reloadForms])

  const validate = useCallback((value: string) => {
    if (formList.includes(value)) return t('formsList.formWithNameExists')
  }, [formList, t])

  const showPromptDialog = useCallback(() => {
    builderStore.showPromptModal({
      value: '',
      onOk: handleAddForm,
      title: t('leftMenu.enterFormName'),
      placeholder: t('leftMenu.formNamePlaceholder'),
      validate
    })
  }, [builderStore, handleAddForm, t, validate])

  useEffect(() => {
    reloadForms()
  }, [builderStore.lastSaveTime, reloadForms])

  return <List {...props}>
    <ListItem>
      <Button block onClick={showPromptDialog}>{t('formsList.addNewForm')}</Button>
    </ListItem>
    {formList.length
      ? formList.map((name, index) =>
        <FormListItem key={index} active={name === builderStore.formName} name={name} onLoadForm={loadForm} onRemoveForm={removeForm}/>)
      : <ListItem>{t('formsList.noFormsInFormStorage')}</ListItem>
    }
  </List>
}

export const FormList = customizableObserver('Forms_Tab_Content', RawFormList)
