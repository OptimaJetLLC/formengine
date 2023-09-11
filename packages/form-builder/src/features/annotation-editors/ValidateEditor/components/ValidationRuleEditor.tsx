import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faTrash from '@fortawesome/free-regular-svg-icons/faTrashAlt.js'
import {
  namedObserver,
  SchemaType,
  useComponentData,
  useStore,
  ValidationRuleParameter,
  ValidationRuleSettings
} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import type {ComponentType} from 'react'
import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, Checkbox, IconButton, Input as RInput, InputNumber, Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../components/Icons'

interface RuleParamEditorProps<T> {
  value: T
  onChange: (value: T) => void
  ruleType: string
  ruleKey: string
}

const StringRuleParamEditor = ({value, onChange}: RuleParamEditorProps<string>) => {
  return <RInput value={value ?? ''} onChange={onChange}/>
}

const CodeRuleParamEditor = namedObserver('CodeRuleParamEditor', (props: RuleParamEditorProps<string>) => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()
  const componentData = useComponentData()
  const componentKey = `${componentData.key}[${props.ruleKey}][${props.ruleType}]`
  const functionSignature = `/**
 * @param {${props.ruleType}} value the validated value.
 * @return {boolean} the validation result.
 */
async (value) => {`

  const handleEdit = () => builderStore.editCustomValidationCode(componentKey, props.value, functionSignature, props.onChange)

  return <>
    <RInput value={props.value ?? ''} readOnly disabled/>
    <Button block style={{marginTop: 6}} onClick={handleEdit}>{t('validation.editCode')}</Button>
  </>
})

const BooleanRuleParamEditor = ({value, onChange}: RuleParamEditorProps<boolean>) => {
  const handleChange = (_: any, checked: boolean) => {
    onChange(checked)
  }
  return <Checkbox checked={value ?? false} onChange={handleChange}/>
}

const NumberRuleParamEditor = ({value, onChange}: RuleParamEditorProps<number>) => {
  return <InputNumber value={value} onChange={value => onChange(toNumber(value))}/>
}

const getInput = (type: string): ComponentType<RuleParamEditorProps<any>> => {
  switch (type) {
    case 'number':
      return NumberRuleParamEditor
    case 'boolean':
      return BooleanRuleParamEditor
    case 'code':
      return CodeRuleParamEditor
  }
  return StringRuleParamEditor
}

/**
 * Converts a value to a number. Returns 0 (zero) if the conversion failed.
 * @param value the value
 * @returns the result of conversion to a number.
 */
const toNumber = (value: any) => {
  if (typeof value === 'number') return value
  const result = Number(value)
  return Number.isNaN(result) ? 0 : result
}

const cast = (value: any, type: string) => {
  if (type === 'number') return toNumber(value)
  return value
}

/**
 * The properties of the React {@link ValidationRuleEditor} component.
 */
export interface ValidationRuleEditorProps {
  rule: ValidationRuleSettings
  onRemove: () => void
}

interface RuleParamsEditorProps {
  rule: ValidationRuleSettings
  params?: ValidationRuleParameter[]
}

const RuleParamsEditor = observer(({rule, params}: RuleParamsEditorProps) => {
  const ruleParams = useMemo(() => {
    const copy = [...(params ?? [])]
    const messageParam = copy.find(value => value.key === 'message')
    if (!messageParam) copy.push({key: 'message', type: 'string', required: false})
    return copy
  }, [params])

  const items = ruleParams.map(param => {
    const type = param.editorType ?? param.type
    const Input = getInput(type)

    return (
      <div key={param.key}>
        <label>{param.key}</label>
        <Input
          key={param.key}
          value={rule.args?.[param.key]}
          ruleType={param.type}
          ruleKey={param.key}
          onChange={value => {
            rule.args ??= {}
            rule.args[param.key] = cast(value, param.type)
          }}
        />
      </div>
    )
  })

  return <>{items}</>
})

export const ValidationRuleEditor = observer(({rule, onRemove}: ValidationRuleEditorProps) => {
  const {store, model} = useComponentData()
  const {t} = useTranslation()
  const schema = store.schema
  const viewerStore = useStore()

  const type = model.valueType
  if (!type || !schema) return null

  const getValidationRule = (type: SchemaType, ruleKey: string) => {
    const rulesByType = viewerStore.getValidationRules(type)
    if (!rule.type || rule.type === 'internal') return rulesByType.internal[ruleKey]
    if (rule.type === 'external') return rulesByType.external?.[ruleKey]
  }

  const ruleDefinition = getValidationRule(type, rule.key)
  if (!ruleDefinition) {
    console.warn(`Cannot find validation rule for type: '${type}' and key: '${rule.key}'`)
    return null
  }

  return (
    <div>
      <SRuleName>{t(`validation.rule.${rule.key}`, rule.key)}</SRuleName>
      <Whisper speaker={<Tooltip>{t('validation.removeRule')}</Tooltip>} placement={'bottom'}>
        <IconButton onClick={onRemove} icon={<FaIcon icon={faTrash as unknown as IconDefinition}/>}/>
      </Whisper>
      <RuleParamsEditor rule={rule} params={ruleDefinition.params}/>
    </div>
  )
})

const SRuleName = styled.span`
  font-size: medium;
  font-weight: bold;
`
