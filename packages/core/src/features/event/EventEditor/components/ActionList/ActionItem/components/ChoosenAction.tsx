import {ArrowDownLine} from '@rsuite/icons'
import {observer} from 'mobx-react'
import {Button, Dropdown, Nav, Popover, Whisper} from 'rsuite'
import {ComponentStore} from '../../../../../../../stores/ComponentStore'
import {useStore} from '../../../../../../../utils/contexts/StoreContext'
import {Node} from '../../../../../../../utils/Node'
import {NavIconItem} from '../../../../../../ui/NavIconItem'
import {useGroups} from '../../../../hooks/useGroups'
import {useActionData} from '../contexts/ActionDataContext'

export const ChoosenAction = observer(() => {
  const store = useStore()
  const data = useActionData()
  const groups = useGroups()

  const TargetActionsList: any = (target: ComponentStore) => {
    const model = store.props.view.getModel(target)
    return <Dropdown.Menu> {
      model?.actions?.map((action) =>
        <Dropdown.Item
          key={action.name}
          onSelect={() => {
            data.action = action
          }}
          children={action.name}
        />
      )}
    </Dropdown.Menu>
  }


  const FullActionsList: any = () =>
    Object.keys(groups).map((group, i) => (
      <Dropdown.Menu
        key={(group + i)}
        title={group}
        children={
          groups[group].map((node: Node) => (
            <Dropdown.Menu
              key={node.key}
              title={node.key}
              children={
                node.model?.actions?.map((action) =>
                  <Dropdown.Item
                    key={action.name}
                    onSelect={() => {
                      data.action = action
                    }}
                    children={action.name}
                  />
                )
              }
            />
          ))
        }
      />
    ))

  const Menu = ({onClose, left, top, className}: any, ref: any) => (
    <Popover ref={ref} className={className} style={{left, top, marginLeft: -14}} full>
      <Nav appearance="subtle" activeKey={'withTarget'} style={{marginBottom: 10}}>
        {NavIconItem('withTarget')}
        {NavIconItem('withoutTarget')}
      </Nav>
      {
        data.target
          ? TargetActionsList(data.target)
          : FullActionsList()
      }
    </Popover>
  )

  return (
    <Whisper placement="left" trigger="click" speaker={Menu}>
      <Button appearance={'subtle'} block style={{padding: '2px 10px'}}>

        <div style={{display: 'flex'}}>
          <p>do </p>
          <div>
            <b style={{
              color: 'blueviolet',
              marginLeft: 8
            }}>
              {`${data.action?.name || 'Action'}`}
            </b>
            <ArrowDownLine/>
          </div>
        </div>
      </Button>
    </Whisper>)
})
