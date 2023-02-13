import ExportIcon from '@rsuite/icons/Export'
import {observer} from 'mobx-react'
import {Dropdown} from 'rsuite'

export const Export = observer(() => {
  return <Dropdown title={<div><ExportIcon/> Export</div>}>
    <Dropdown.Item>// TODO</Dropdown.Item>
  </Dropdown>
})
