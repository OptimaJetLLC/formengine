import {observer} from 'mobx-react'
import {Button} from 'rsuite'
import {useActionData} from '../contexts/ActionDataContext'

export const ChoosenAction = observer(() => {
  const data = useActionData()

  return (
    //TODO Popover with action information
    //<Whisper placement="left" trigger="click" speaker={Menu}>
    <Button appearance={'subtle'} block style={{padding: '2px 10px'}}>

      <div style={{display: 'flex'}}>
        <p>do </p>
        <div>
          <b style={{
            color: 'violet',
            marginLeft: 8
          }}>
            {`${data.name || 'Action'}`}
          </b>
        </div>
      </div>
    </Button>
    //</Whisper>
  )
})
