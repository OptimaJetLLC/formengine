import styled from '@emotion/styled'
import type {ParameterName, ParameterType} from '@react-form-builder/core'
import {toLabeledValues} from '@react-form-builder/core'
import {ArrowDownLine, ArrowUpLine, Close} from '@rsuite/icons'
import {useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import type {FormInstance} from 'rsuite'
import {Animation, Form, InputPicker, Schema} from 'rsuite'
import {Columns, Rows} from '../../../../../components/Containers'
import type {Parameter} from '../../ActionList/ActionItem/components/ArgumentList/ArgumentItem/Parameter'

const RemoveButton = styled(Close)`
  margin-top: 5px;
  cursor: pointer;
`

const SParamName = styled.span`
  cursor: pointer;
`

interface ParameterItemProps {
  value: Parameter
  onRemove: () => void
  onChange: (value: Parameter) => void
  parameters?: Parameter[]
}

const ArgumentTypes = toLabeledValues(['string', 'number', 'boolean'], false)

type FormModel = { name: ParameterName, type: ParameterType }

const validParamName = /^[A-Za-z_]+[A-Za-z0-9_]*$/
const isValidParamName = (name: string) => validParamName.test(name)

const ParamName = ({value, collapsed, onClick}: { value: Parameter, collapsed: boolean, onClick: () => void }) => {
  const [name, type] = value
  const ParamIcon = collapsed ? ArrowDownLine : ArrowUpLine
  return <SParamName onClick={onClick}><ParamIcon/> {name}: {type}</SParamName>
}

/**
 * The React form builder component that displays the action parameter.
 * @param props the React component properties.
 * @param props.value the parameter description.
 * @param props.onRemove the callback function called when data should be removed.
 * @param props.onChange the callback function called when data should be changed.
 * @param props.parameters the action parameters.
 * @returns the React element.
 */
export const ParameterItem = ({value, onRemove, onChange, parameters}: ParameterItemProps) => {
  const [paramName, paramType] = value
  const [collapsed, setCollapsed] = useState(true)
  const {t} = useTranslation()
  const [formState, setFormState] = useState<FormModel>({name: paramName, type: paramType})
  const formRef = useRef<FormInstance>(null)

  const isValid = (name: string) => name === paramName || !parameters?.find(([pName]) => pName === name)

  const isFormValid = (value: FormModel) => {
    return isValid(value.name) && isValidParamName(value.name)
  }

  const updateFormState = (value: FormModel) => {
    setFormState(value)
    if (isFormValid(value)) onChange([value.name, value.type])
  }

  const model = Schema.Model({
    name: Schema.Types.StringType()
      .isRequired(t('codeActionEditor.parameterNameIsRequired'))
      .addRule(isValid, t('codeActionEditor.parameterNameExists'))
      .addRule(isValidParamName, t('codeActionEditor.parameterNameIsNotValid'))
  })

  return <div>
    <Columns style={{justifyContent: 'space-between'}}>
      <ParamName value={[formState.name, formState.type]} collapsed={collapsed} onClick={() => setCollapsed(!collapsed)}/>
      <RemoveButton onClick={onRemove}/>
    </Columns>

    <Animation.Collapse in={!collapsed} unmountOnExit>
      <Rows gap={10}>
        <Form model={model} checkTrigger={'change'} formValue={formState} ref={formRef}
              onChange={data => updateFormState({name: data.name, type: data.type})}>
          <Form.Group>
            <Form.ControlLabel>{t('actions.name')}</Form.ControlLabel>
            <Form.Control name="name" style={{maxWidth: '100%'}}/>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>{t('actions.type')}</Form.ControlLabel>
            <Form.Control name="type" accepter={InputPicker} data={ArgumentTypes}
                          cleanable={false} creatable={false}/>
          </Form.Group>
        </Form>
      </Rows>
    </Animation.Collapse>
  </div>
}
