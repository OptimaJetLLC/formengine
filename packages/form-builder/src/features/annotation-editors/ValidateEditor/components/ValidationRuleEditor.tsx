import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faTrash from '@fortawesome/free-regular-svg-icons/faTrashAlt.js'
import {useComponentData, ValidationRules, ValidationRuleSettings} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {IconButton, Input as RInput, InputNumber, Tooltip, Whisper} from 'rsuite'
import {FaIcon} from '../../../components/Icons'

const getInput = (type: string) => {
  switch (type) {
    case 'string':
      return RInput
    case 'number':
      return InputNumber
  }
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

export const ValidationRuleEditor = observer(({rule, onRemove}: ValidationRuleEditorProps) => {
  const {store, model} = useComponentData()
  const {t} = useTranslation()
  const schema = store.schema

  const type = model.valueType
  if (!type || !schema) return null

  const ruleDefinition = ValidationRules[type][rule.key]

  return (
    <div>
      <SRuleName>{t(`validation.rule.${rule.key}`)}</SRuleName>
      <Whisper speaker={<Tooltip>{t('validation.removeRule')}</Tooltip>} placement={'bottom'}>
        <IconButton onClick={onRemove} icon={<FaIcon icon={faTrash as unknown as IconDefinition}/>}/>
      </Whisper>
      {ruleDefinition.params.map(param => {
        const Input = getInput(param.type)!

        return (
          <div key={param.key}>
            <label>{param.key}</label>
            <Input
              key={param.key}
              value={rule.args?.[param.key]}
              onChange={value => {
                rule.args ??= {}
                rule.args[param.key] = cast(value, param.type)
              }}
            />
          </div>
        )
      })}
    </div>
  )
})

const SRuleName = styled.span`
  font-size: medium;
  font-weight: bold;
`
