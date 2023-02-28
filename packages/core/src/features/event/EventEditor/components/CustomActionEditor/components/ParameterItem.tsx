import styled from '@emotion/styled'
import {ArrowDownLine, ArrowUpLine, Close} from '@rsuite/icons'
import React, {Dispatch, useReducer} from 'react'
import {Animation, Input, InputPicker} from 'rsuite'
import {toLabeledValues} from '../../../../../annotation/utils/LabeledValue'
import {useTranslationPart} from '../../../../../localization/hooks'
import {Rows} from '../../../../../ui/Containers'
import {Parameter} from '../../../../types'
import {toParameterWithType} from '../../../../utils/toParameterWithType'
import {ParamAction} from '../types'

interface ParameterItemProps {
  index: number
  value: Parameter
  dispatch: Dispatch<ParamAction>
}

const ArgumentTypes = toLabeledValues(['string', 'number', 'boolean'], false)

export const ParameterItem = ({value, dispatch, index}: ParameterItemProps) => {
  const [name, type] = toParameterWithType(value)
  const [show, toggleShow] = useReducer(state => !state, false)
  const ExpandIcon = show ? ArrowUpLine : ArrowDownLine
  const t = useTranslationPart('actions')

  const handleChange = (value: Parameter) => dispatch({type: 'update', index, param: value})

  const handleRemove = () => dispatch({type: 'remove', index})

  return <>
    <Rows margin={1} style={{marginTop: 8, display: 'block'}}>
      <label onClick={toggleShow}><ExpandIcon/> {name} ({type})</label>
      <RemoveButton onClick={handleRemove}/>

      <Animation.Collapse in={show}>
        <div>
          <label>{t('name')}</label>
          <Input value={name} onChange={name => handleChange([name, type])}/>
          <label>{t('type')}</label>
          <InputPicker cleanable={false} data={ArgumentTypes} value={type} onChange={type => {
            if (type === 'string') {
              handleChange(name)
            } else {
              handleChange([name, type])
            }
          }}/>
        </div>

      </Animation.Collapse>
    </Rows>
  </>
}

const RemoveButton = styled(Close)`
  position: absolute;
  right: 0;
  margin-top: 5px;
  cursor: pointer;
`
