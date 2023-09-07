import styled from '@emotion/styled'
import {NamedActionDefinition, namedObserver, useStore} from '@react-form-builder/core'
import CopyIcon from '@rsuite/icons/Copy.js'
import EditIcon from '@rsuite/icons/Edit.js'
import type {IconProps} from '@rsuite/icons/lib/Icon'
import TrashIcon from '@rsuite/icons/Trash.js'
import type {ReactElement} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonToolbar, IconButton, List} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {Hinted} from '../../../annotation-editors/Hinted'

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
  const builderStore = useBuilderStore()
  const viewerStore = useStore()
  const {t} = useTranslation()

  const items = Object.entries(viewerStore.form.actions).map(([name, action]) => {
    const namedAction: NamedActionDefinition = {name, actionDefinition: action}
    return <List.Item key={name}>
      <ButtonToolbar>
        <SActionName>{name}</SActionName>
        <HintedIconButton hint={t('leftPanel.actions.edit')} icon={<EditIcon/>} onClick={() => builderStore.editCustomAction(namedAction)}/>
        <HintedIconButton hint={t('leftPanel.actions.clone')} icon={<CopyIcon/>} onClick={() => viewerStore.form.cloneAction(namedAction)}/>
        <HintedIconButton hint={t('leftPanel.actions.remove')} icon={<TrashIcon/>} onClick={() => viewerStore.form.removeAction(name)}/>
      </ButtonToolbar>
    </List.Item>
  })

  return <List>
    <List.Item>
      <Button block onClick={() => builderStore.addCustomAction()}>{t('actions.addCustomAction')}</Button>
    </List.Item>
    {items}
  </List>
})
