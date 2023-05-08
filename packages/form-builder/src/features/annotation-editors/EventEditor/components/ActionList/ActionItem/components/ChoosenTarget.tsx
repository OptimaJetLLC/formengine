import {ArrowDownLine} from '@rsuite/icons'
import {ComponentData, useStore} from 'fb-core'
import {observer} from 'mobx-react'
import {Button, Dropdown, Popover, Whisper} from 'rsuite'
import {useGroups} from '../../../../hooks/useGroups'
import {useActionData} from '../contexts/ActionDataContext'

export const ChoosenTarget = observer(() => {
  const groups = useGroups()
  const data = useActionData()
  const store = useStore()

  const Menu = ({onClose, left, top, className}: any, ref: any) =>
    <Popover ref={ref} className={className} style={{left, top, marginLeft: -14}} full>
      <Dropdown.Menu>
        {
          Object.keys(groups).map((group) => (
            <div key={group} style={{padding: '0 15px', marginTop: 5}}>
              <h6>{group + 's'}</h6>
              {
                groups[group].map((node: ComponentData) => (
                  <Dropdown.Item
                    key={node.key}
                    children={node.key}
                    onSelect={() => {
                      onClose()
                      data.target = node.store.key
                    }}
                  />
                ))
              }
            </div>
          ))
        }
      </Dropdown.Menu>
    </Popover>

  return <Whisper placement="left" trigger="click" speaker={Menu}>
    <Button block appearance={'subtle'} style={{padding: '2px 10px'}}>

      <div style={{display: 'flex'}}>
        <p>For </p>
        <div style={{marginRight: 3}}>
          <b style={{
            color: 'var(--rs-text-link)',
            marginLeft: 5
          }}>
            {(data.target ? `${data.target}` : 'Target')}
          </b>
          <ArrowDownLine/>
        </div>

        <p style={{opacity: .8}}>{`${store.findComponent(data.target ?? '')?.type.toLowerCase() ?? ''} `}</p>
      </div>
    </Button>
  </Whisper>
})
