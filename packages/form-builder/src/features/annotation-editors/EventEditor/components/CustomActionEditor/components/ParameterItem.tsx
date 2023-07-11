import styled from '@emotion/styled'
import {Parameter, toParameterWithType} from '@react-form-builder/core'
import {ArrowDownLine, ArrowUpLine, Close} from '@rsuite/icons'
import React, {Dispatch, useReducer} from 'react'
import {Animation, Input, InputPicker} from 'rsuite'
import {toLabeledValues} from '../../../../../annotation/utils/LabeledValue'
import {Columns, Rows} from '../../../../../components/Containers'
import {useTranslationPart} from '../../../../../localization/hooks'
import {ParamAction} from '../types'

interface ParameterItemProps {
  index: number
  value: Parameter
  dispatch: Dispatch<ParamAction>
}

const ArgumentTypes = toLabeledValues(['string', 'number', 'boolean'], false)

/**
 * The React form builder component that displays the action parameter.
 * @param props the React component properties.
 * @param props.value the parameter description.
 * @param props.dispatch the dispatcher for functions that work with the action parameter.
 * @param props.index the index of the parameter in the parameter array.
 * @returns the React element.
 */
export const ParameterItem = ({value, dispatch, index}: ParameterItemProps) => {
  const [name, type] = toParameterWithType(value)
  const [show, toggleShow] = useReducer(state => !state, false)
  const ExpandIcon = show ? ArrowUpLine : ArrowDownLine
  const t = useTranslationPart('actions')

  const handleChange = (value: Parameter) => dispatch({type: 'update', index, param: value})

  const handleRemove = () => dispatch({type: 'remove', index})

  return <div>
    <Columns style={{justifyContent: 'space-between'}}>
      <label onClick={toggleShow}><ExpandIcon/> {name} ({type})</label>
      <RemoveButton onClick={handleRemove}/>
    </Columns>

    <Animation.Collapse in={show}>
      <div>
        <Rows>
          <div>
            <label>{t('name')}</label>
            <Input value={name} onChange={name => handleChange([name, type])}/>
          </div>
          <div>
            <label>{t('type')}</label>
            <InputPicker cleanable={false} data={ArgumentTypes} value={type} onChange={type => {
              if (type === 'string') {
                handleChange(name)
              } else {
                handleChange([name, type])
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
