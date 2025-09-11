import styled from '@emotion/styled'
import type {ParameterName, ParameterType} from '@react-form-builder/core'
import {toLabeledValues} from '@react-form-builder/core'
import {ArrowDownLine, ArrowUpLine, Close} from '@rsuite/icons'
import type {ComponentProps} from 'react'
import {useCallback, useMemo, useRef, useState} from 'react'
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
  isParameterNameExists: (name: string) => boolean
}

const ArgumentTypes = toLabeledValues(['string', 'number', 'boolean', 'function'], false)

const columnsStyle = {justifyContent: 'space-between'} as const
const controlStyle = {maxWidth: '100%'} as const

type FormModel = { name: ParameterName, type: ParameterType }

const validParamName = /^[A-Za-z_]+[A-Za-z0-9_]*$/
const isValidParamName = (name: string) => validParamName.test(name)

const ParamName = ({value, collapsed, onClick}: { value: Parameter, collapsed: boolean, onClick: () => void }) => {
  const [name, type] = value
  const ParamIcon = collapsed ? ArrowDownLine : ArrowUpLine
  return <SParamName onClick={onClick}><ParamIcon/> {name}: {type}</SParamName>
}

const ValueTypeSelector = (props: ComponentProps<typeof InputPicker>) => {
  return <InputPicker {...props} placement={'autoVertical'}/>
}

/**
 * The React form builder component that displays the action parameter.
 * @param props the React component properties.
 * @param props.value the parameter description.
 * @param props.onRemove the callback function called when data should be removed.
 * @param props.onChange the callback function called when data should be changed.
 * @param props.isParameterNameExists the function to check if the parameter name already exists.
 * @returns the React element.
 */
export const ParameterItem = ({value, onRemove, onChange, isParameterNameExists}: ParameterItemProps) => {
  const [paramName, paramType] = value
  const [collapsed, setCollapsed] = useState(true)
  const {t} = useTranslation()
  const [formState, setFormState] = useState<FormModel>({name: paramName, type: paramType})
  const formRef = useRef<FormInstance>(null)

  const isValid = useCallback((name: string) => {
    return name === paramName || !isParameterNameExists(name)
  }, [paramName, isParameterNameExists])

  const isFormValid = useCallback((value: FormModel) => {
    return isValid(value.name) && isValidParamName(value.name)
  }, [isValid])

  const updateFormState = useCallback((value: FormModel) => {
    setFormState(value)
    if (isFormValid(value)) onChange([value.name, value.type])
  }, [onChange, isFormValid])

  const model = Schema.Model({
    name: Schema.Types.StringType()
      .isRequired(t('codeActionEditor.parameterNameIsRequired'))
      .addRule(isValid, t('codeActionEditor.parameterNameExists'))
      .addRule(isValidParamName, t('codeActionEditor.parameterNameIsNotValid'))
  })

  const paramValue = useMemo(() => [formState.name, formState.type] as Parameter, [formState.name, formState.type])
  const handleToggleCollapsed = useCallback(() => setCollapsed(!collapsed), [collapsed])

  const handleFormChange = useCallback((data: any) => {
    updateFormState({name: data.name, type: data.type})
  }, [updateFormState])

  return <div>
    <Columns style={columnsStyle}>
      <ParamName value={paramValue} collapsed={collapsed} onClick={handleToggleCollapsed}/>
      <RemoveButton onClick={onRemove}/>
    </Columns>

    <Animation.Collapse in={!collapsed} unmountOnExit>
      <Rows gap={10}>
        <Form model={model} checkTrigger={'change'} formValue={formState} ref={formRef}
              onChange={handleFormChange}>
          <Form.Group>
            <Form.ControlLabel>{t('actions.name')}</Form.ControlLabel>
            <Form.Control name="name" style={controlStyle}/>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>{t('actions.type')}</Form.ControlLabel>
            <Form.Control name="type" accepter={ValueTypeSelector} data={ArgumentTypes}
                          cleanable={false} creatable={false}/>
          </Form.Group>
        </Form>
      </Rows>
    </Animation.Collapse>
  </div>
}
