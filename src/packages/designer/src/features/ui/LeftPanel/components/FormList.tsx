import cx from 'clsx'
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
import styles from './FormList.module.css'

function FormListItem({active, onLoadForm, onRemoveForm, name}: {
  active: boolean,
  name: string,
  onLoadForm: (name: string) => void,
  onRemoveForm: (name: string) => void
}) {
  const handleLoad = useCallback(() => {
    onLoadForm(name)
  }, [name, onLoadForm])

  const handleRemove = useCallback(() => {
    onRemoveForm(name)
  }, [name, onRemoveForm])

  return (
    <ListItem data-testid={`form-list-item-${name}`} data-active={active}>
      <span className={cx(active ? styles.activeForm : styles.inactiveForm)}>
        {name}
      </span>
      <ButtonGroup>
        <EditButton onClick={handleLoad} data-testid={`form-list-open-item-${name}`}/>
        <RemoveButton onClick={handleRemove}/>
      </ButtonGroup>
    </ListItem>
  )
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
  }, [builderStore.formListLastReloadTime, reloadForms])

  const filteredFormList = useMemo(
    () => formList.filter(name => name.toLowerCase().includes(searchValue.toLowerCase())),
    [formList, searchValue]
  )

  return <Rows className={styles.container}>
    <SearchForm onChange={setSearchValue} className={styles.search}/>
    <Button block onClick={showPromptDialog} data-testid={'add-new-form-button'}>{t('formsList.addNewForm')}</Button>
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
