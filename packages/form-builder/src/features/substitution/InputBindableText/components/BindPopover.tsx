import * as faCode from '@fortawesome/free-solid-svg-icons/faCode'
import * as faLink from '@fortawesome/free-solid-svg-icons/faLink'
import CloseIcon from '@rsuite/icons/Close'
import {forwardRef, useState} from 'react'
import {Nav, Popover, SelectPicker, TreePicker} from 'rsuite'
import {ItemDataType} from 'rsuite/esm/@types/common'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {ComponentNode} from '../../../../utils/ComponentNode'
import {LabeledInput} from '../../../components/Containers'
import {NavIconItem} from '../../../components/NavIconItem'
import {CloseButton} from './CloseButton'

export const BindPopover = forwardRef<any, any>(({onClose, left, top, className, onSelect}: any, ref) => {
  const store = useBuilderStore()
  const [activeNode, setActiveNode] = useState<ComponentNode>()
  const [propertyName, setPropertyName] = useState<string>()

  const handlePropertySelect = (propertyName: string) => {
    setPropertyName(propertyName)
    onSelect({componentStore: activeNode?.data, propertyName})
    onClose()
  }

  return (
    <Popover ref={ref} className={className} style={{left, top, marginLeft: -217}} full>
      <Nav appearance="subtle" activeKey={'linkedProperty'} style={{marginBottom: 10}}>
        {NavIconItem('linkedProperty', '', faLink)}
        {NavIconItem('expression', '', faCode)}
      </Nav>

      <CloseButton icon={<CloseIcon/>} onClick={onClose} appearance={'primary'} size={'xs'} circle/>

      <div style={{padding: '0 15px 15px 15px'}}>
        <LabeledInput>
          <label>Component</label>
          <TreePicker
            defaultExpandAll={true}
            onSelect={(activeNode) => setActiveNode(activeNode as ComponentNode)}
            value={activeNode?.key}
            labelKey="key"
            valueKey="key"
            style={{maxHeight: 'inherit', height: 'inherit'}}
            data={store.tree.children as ItemDataType[]}
          />
        </LabeledInput>


        {activeNode && <LabeledInput>
          <label>Property</label>
          <SelectPicker
            data={activeNode.meta.properties.map(({key}) => ({value: key, label: key}))}
            value={propertyName}
            onSelect={handlePropertySelect}
          />
        </LabeledInput>}

      </div>
    </Popover>
  )
})
