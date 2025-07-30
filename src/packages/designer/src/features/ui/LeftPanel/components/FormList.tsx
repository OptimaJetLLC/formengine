import type {ComponentProps} from 'react'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {useCreateForm} from '../../../../utils/useCreateForm'
import {EditButton, RemoveButton} from '../../../components/Buttons'
import {List, ListItem, Rows} from '../../../components/Containers'
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
      <EditButton onClick={handleLoad} data-testid={`form-list-open-item-${name}`}/>
      <RemoveButton onClick={handleRemove}/>
    </ButtonGroup>
  </ListItem>
}

const searchStyle = {
  maxWidth: 300
}

const containerStyle = {
  height: '100%'
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

  const filteredFormList = useMemo(() => {
    const result = [...formList]
    if (!result.includes(builderStore.formName)) result.push(builderStore.formName)

    if (!searchValue) return result

    return result.filter(name => name.toLowerCase().includes(searchValue.toLowerCase()))
  }, [formList, searchValue, builderStore.formName])

  return <Rows style={containerStyle} gap={10}>
    <SearchForm style={searchStyle} onChange={setSearchValue}/>
    <Button block onClick={showPromptDialog}>{t('formsList.addNewForm')}</Button>
    <List {...props}>
      {filteredFormList.length
        ? filteredFormList.map((name, index) =>
          <FormListItem key={index} active={name === builderStore.formName} name={name} onLoadForm={loadForm} onRemoveForm={removeForm}/>)
        : <ListItem>{t('formsList.noFormsInFormStorage')}</ListItem>
      }
    </List>
  </Rows>
}

export const FormList = customizableObserver('Forms_Tab_Content', RawFormList)
