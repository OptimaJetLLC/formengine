import styled from '@emotion/styled'
import {namedObserver} from '@react-form-builder/core'
import EditIcon from '@rsuite/icons/Edit.js'
import TrashIcon from '@rsuite/icons/Trash.js'
import {useEffect, useState} from 'react'
import {ButtonToolbar, IconButton, List} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {useTranslationPart} from '../../../localization/hooks'
import {useShowMessage} from '../../../toast/toast'

const SFormName = styled.span`
  margin-right: 10px;
`

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
    return <List.Item key={index}>
      <ButtonToolbar>
        <SFormName style={{color: value === builderStore.formName ? 'var(--rs-navs-selected)' : 'var(--rs-text-secondary)'}}>
          {value}
        </SFormName>
        <IconButton icon={<EditIcon/>} onClick={() => builderStore.loadForm(value, reloadForms, onError)}/>
        <IconButton icon={<TrashIcon/>} onClick={() => builderStore.removeForm(value, reloadForms)}/>
      </ButtonToolbar>
    </List.Item>
  })

  return <List>{items}</List>
})
