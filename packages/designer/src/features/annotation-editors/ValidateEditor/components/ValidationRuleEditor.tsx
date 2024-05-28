import styled from '@emotion/styled'
import {
  getValidatorPropertyBlockType,
  namedObserver,
  SchemaType,
  useComponentData,
  useStore,
  ValidationRuleSettings
} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {RemoveButton} from '../../../components/Buttons'
import {Columns, Rows} from '../../../components/Containers'
import {PropertyBlock} from '../../../ui/RightPanel/PropertiesEditor/components/Properties'
import {convertValidationRuleParametersToAnnotations} from '../../../validation/utils/parameterConverter'

/**
 * The properties of the React {@link ValidationRuleEditor} component.
 */
export interface ValidationRuleEditorProps {
  /**
   * The validation rule settings.
   */
  rule: ValidationRuleSettings
  /**
   * The callback function called when a rule is removed.
   */
  onRemove: () => void
}

const RawValidationRuleEditor = ({rule, onRemove}: ValidationRuleEditorProps) => {
  const {store, model} = useComponentData()
  const {t} = useTranslation()
  const schema = store.schema
  const viewerStore = useStore()

  const initValidatorArgs = useCallback(() => {
    rule.args ??= {}
    return rule.args
  }, [rule])

  const type = model.valueType
  if (!type || !schema) return null

  const getValidationRule = (type: SchemaType, ruleKey: string) => {
    const rulesByType = viewerStore.getValidationRules(type)
    if (!rule.type || rule.type === 'internal') return rulesByType.internal[ruleKey]
    if (rule.type === 'custom') return rulesByType.custom?.[ruleKey]
  }

  const ruleDefinition = getValidationRule(type, rule.key)
  if (!ruleDefinition) {
    console.warn(`Cannot find validation rule for type: '${type}' and key: '${rule.key}'`)
    return null
  }

  const annotations = convertValidationRuleParametersToAnnotations(ruleDefinition.params ?? [])

  return (
    <Rows>
      <Columns spaceBetween>
        <SRuleName>{t(`validation.rule.${rule.key}`, rule.key)}</SRuleName>
        <RemoveButton onClick={onRemove} hintPlacement={'autoHorizontal'}/>
      </Columns>
      <PropertyBlock annotations={annotations} propertyBlockType={getValidatorPropertyBlockType(rule.key)} context={rule.args ?? {}}
                     initContext={initValidatorArgs}/>
    </Rows>
  )
}

export const ValidationRuleEditor = namedObserver('ValidationRuleEditor', RawValidationRuleEditor)

const SRuleName = styled.span`
  font-size: medium;
`
