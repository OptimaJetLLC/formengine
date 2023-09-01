import styled from '@emotion/styled'
import {CustomActionDefinition, namedObserver, useStore} from '@react-form-builder/core'
import CopyIcon from '@rsuite/icons/Copy.js'
import EditIcon from '@rsuite/icons/Edit.js'
import type {IconProps} from '@rsuite/icons/lib/Icon'
import TrashIcon from '@rsuite/icons/Trash.js'
import type {ReactElement} from 'react'
import {ButtonToolbar, IconButton, List} from 'rsuite'
import {Hinted} from '../../../annotation-editors/Hinted'
import {useTranslationPart} from '../../../localization/hooks'

const SActionName = styled.span`
  margin-right: 10px;
  margin-left: 10px;
`

interface HintedIconButtonProps {
  hint: string
  onClick: () => void
  icon: ReactElement<IconProps>
}

const HintedIconButton = ({hint, ...props}: HintedIconButtonProps) => {
  return <Hinted hint={hint}>
    <IconButton {...props} size="xs"/>
  </Hinted>
}

export const ActionList = namedObserver('ActionList', () => {
  const viewerStore = useStore()
  const t = useTranslationPart('leftPanel.actions')

  const formProps = viewerStore.form.componentTree.store.props

  const editAction = (action: CustomActionDefinition) => {
    // todo show CustomActionEditor FB-347
    console.log('edit', action)
  }

  const actions = (formProps.actions?.value ?? []) as CustomActionDefinition[]
  if (actions.length <= 0) return null

  const items = actions.map(action => {
    return <List.Item key={action.name}>
      <ButtonToolbar>
        <SActionName>{action.name}</SActionName>
        <HintedIconButton hint={t('edit')} icon={<EditIcon/>} onClick={() => editAction(action)}/>
        <HintedIconButton hint={t('clone')} icon={<CopyIcon/>} onClick={() => viewerStore.form.cloneAction(action)}/>
        <HintedIconButton hint={t('remove')} icon={<TrashIcon/>} onClick={() => viewerStore.form.removeAction(action)}/>
      </ButtonToolbar>
    </List.Item>
  })

  return <List>{items}</List>
})
