import * as faCode from '@fortawesome/free-solid-svg-icons/faCode.js'
import * as faLink from '@fortawesome/free-solid-svg-icons/faLink.js'
import {ComponentData} from '@react-form-builder/core'
import CloseIcon from '@rsuite/icons/Close.js'
import {forwardRef, useState} from 'react'
import {Nav, Popover, SelectPicker, TreePicker} from 'rsuite'
import {useMeta} from '../../../../utils/useMeta'
import {LabeledInput} from '../../../components/Containers'
import {NavIconItem} from '../../../components/NavIconItem'
import {CloseButton} from './CloseButton'

export const BindPopover = forwardRef<any, any>(({onClose, left, top, className, onSelect}: any, ref) => {
  const [activeNode, setActiveNode] = useState<ComponentData>()
  const [propertyName, setPropertyName] = useState<string>()
  const meta = useMeta()

  const handlePropertySelect = (propertyName: string) => {
    setPropertyName(propertyName)
    onSelect({componentStore: activeNode?.store, propertyName})
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
            onSelect={(activeNode) => setActiveNode(activeNode as ComponentData)}
            value={activeNode?.key}
            labelKey="key"
            valueKey="key"
            style={{maxHeight: 'inherit', height: 'inherit'}}
            data={[]}
          />
        </LabeledInput>


        {activeNode && <LabeledInput>
          <label>Property</label>
          <SelectPicker
            data={meta.properties.map(({key}) => ({value: key, label: key}))}
            value={propertyName}
            onSelect={handlePropertySelect}
          />
        </LabeledInput>}

      </div>
    </Popover>
  )
})
