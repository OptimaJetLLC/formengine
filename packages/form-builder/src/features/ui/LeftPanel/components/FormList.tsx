import styled from '@emotion/styled'
import EditIcon from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {namedObserver} from 'fb-core'
import {useEffect, useState} from 'react'
import {ButtonToolbar, IconButton, List} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {useShowMessage} from '../../../toast/toast'

const SFormName = styled.span`
  margin-right: 10px;
`

export const FormList = namedObserver('FormList', () => {
  const store = useBuilderStore()
  const [formList, setFormList] = useState<string[]>([])
  const reloadForms = () => store.getFormList(setFormList)
  const showMessage = useShowMessage()
  useEffect(() => {
    reloadForms()
  }, [store.lastSaveTime])
  const onError = (err: any) => {
    console.error(err)
    showMessage({type: 'error', message: err})
  }

  if (formList.length <= 0) return null
  const items = formList.map((value, index) => {
    return <List.Item key={index}>
      <ButtonToolbar>
        <SFormName style={{color: value === store.formName ? 'var(--rs-navs-selected)' : 'black'}}>
          {value}
        </SFormName>
        <IconButton icon={<EditIcon/>} onClick={() => store.loadForm(value, reloadForms, onError)}/>
        <IconButton icon={<TrashIcon/>} onClick={() => store.removeForm(value, reloadForms)}/>
      </ButtonToolbar>
    </List.Item>
  })

  return <List>{items}</List>
})
