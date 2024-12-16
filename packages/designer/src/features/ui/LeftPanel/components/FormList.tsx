import type {ComponentProps} from 'react'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {useCreateForm} from '../../../../utils/useCreateForm'
import {EditButton, RemoveButton} from '../../../components/Buttons'
import {List, ListItem} from '../../../components/Containers'
import {customizableObserver} from '../../../customization'
import {useShowMessage} from '../../../toast/toast'
import {SearchForm} from '../../ComponentBar/components/SearchForm'

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
  const [searchValue, setSearchValue] = useState<string>('')
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

  const showPromptDialog = useCreateForm(reloadForms)

  useEffect(() => {
    reloadForms()
  }, [builderStore.lastSaveTime, reloadForms])

  const filteredFormList = useMemo(
    () => formList.filter(name => name.toLowerCase().includes(searchValue.toLowerCase())),
    [formList, searchValue]
  )

  return <List {...props}>
    <SearchForm style={{maxWidth: 300}} onChange={setSearchValue}/>
    <ListItem>
      <Button block onClick={showPromptDialog}>{t('formsList.addNewForm')}</Button>
    </ListItem>
    {filteredFormList.length
      ? filteredFormList.map((name, index) =>
        <FormListItem key={index} active={name === builderStore.formName} name={name} onLoadForm={loadForm} onRemoveForm={removeForm}/>)
      : <ListItem>{t('formsList.noFormsInFormStorage')}</ListItem>
    }
  </List>
}

export const FormList = customizableObserver('Forms_Tab_Content', RawFormList)
