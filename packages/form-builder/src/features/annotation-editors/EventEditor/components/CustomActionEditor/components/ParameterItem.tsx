import styled from '@emotion/styled'
import {Parameter, toParameterWithType} from '@react-form-builder/core'
import {ArrowDownLine, ArrowUpLine, Close} from '@rsuite/icons'
import {useState} from 'react'
import {Animation, Input, InputPicker} from 'rsuite'
import {toLabeledValues} from '../../../../../annotation/utils/LabeledValue'
import {Columns, Rows} from '../../../../../components/Containers'
import {useTranslationPart} from '../../../../../localization/hooks'

interface ParameterItemProps {
  value: Parameter
  onRemove: () => void
  onChange: (value: Parameter) => void
}

const ArgumentTypes = toLabeledValues(['string', 'number', 'boolean'], false)

/**
 * The React form builder component that displays the action parameter.
 * @param props the React component properties.
 * @param props.value the parameter description.
 * @param props.onRemove the callback function called when data should be removed.
 * @param props.onChange the callback function called when data should be changed.
 * @returns the React element.
 */
export const ParameterItem = ({value, onRemove, onChange}: ParameterItemProps) => {
  const [name, type] = toParameterWithType(value)
  const [collapsed, setCollapsed] = useState(true)
  const ExpandIcon = collapsed ? ArrowDownLine : ArrowUpLine
  const t = useTranslationPart('actions')

  return <div>
    <Columns style={{justifyContent: 'space-between'}}>
      <label onClick={() => setCollapsed(!collapsed)}><ExpandIcon/> {name} ({type})</label>
      <RemoveButton onClick={onRemove}/>
    </Columns>

    <Animation.Collapse in={!collapsed}>
      <div>
        <Rows>
          <div>
            <label>{t('name')}</label>
            <Input value={name} onChange={name => onChange([name, type])}/>
          </div>
          <div>
            <label>{t('type')}</label>
            <InputPicker cleanable={false} data={ArgumentTypes} value={type} onChange={type => {
              if (type === 'string') {
                onChange(name)
              } else {
                onChange([name, type])
              }
            }}/>
          </div>
        </Rows>
      </div>
    </Animation.Collapse>
  </div>
}

const RemoveButton = styled(Close)`
  margin-top: 5px;
  cursor: pointer;
`
