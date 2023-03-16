import CopyIcon from '@rsuite/icons/Copy'
import EditIcon from '@rsuite/icons/Edit'
import MoreIcon from '@rsuite/icons/More'
import PlusIcon from '@rsuite/icons/Plus'
import TrashIcon from '@rsuite/icons/Trash'
import {ActionData, CustomActionDefinition, useStore} from 'fb-core'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Dropdown, DropdownProps, IconButton} from 'rsuite'
import {useTranslationPart} from '../../../../../../localization/hooks'

interface CustomActionsProps {
  onOpen: (action?: CustomActionDefinition) => void
  onSelect: (action: ActionData) => void
}

export const CustomActions = observer(({onOpen, onSelect}: CustomActionsProps) => {
  const store = useStore()
  const actions = store.screen.props.actions
  const t = useTranslationPart('actions')
  return (
    <>
      <Dropdown.Menu title={t('custom')}>
        {actions?.value.map((action: CustomActionDefinition) => {
            const actionData: ActionData = {name: action.name, type: 'custom'}
            return (
              <Dropdown.Item key={action.name} style={{position: 'relative'}}>
                <span onClick={() => onSelect(actionData)}> {action.name} </span>
                <Dropdown
                  trigger="hover"
                  renderToggle={MenuButton}
                  style={{position: 'absolute', top: '0px', right: '0px'}}
                >
                  <Dropdown.Item children={t('edit')} icon={<EditIcon/>} onClick={() => onOpen(action)}/>
                  <Dropdown.Item children={t('duplicate')} icon={<CopyIcon/>} onClick={() => onOpen(toJS(action))}/>
                  <Dropdown.Item children={t('delete')} icon={<TrashIcon/>} onClick={() => {
                    const index = actions?.value.indexOf(action)
                    actions?.value.splice(index, 1)
                  }}/>
                </Dropdown>
              </Dropdown.Item>
            )
          }
        )}

        {actions && <Dropdown.Item disabled>
          <Divider style={{marginTop: 0, marginBottom: 0}}/>
        </Dropdown.Item>}

        <Dropdown.Item children={t('addCustomAction')} icon={<PlusIcon/>} onClick={onOpen as () => void}/>
      </Dropdown.Menu>
    </>
  )
})

const MenuButton: DropdownProps['renderToggle'] = (props, ref) => (
  <IconButton
    {...props} ref={ref}
    //style={{margin: '0', padding: 0}}
    appearance={'subtle'} icon={<MoreIcon/>}
  />
)
