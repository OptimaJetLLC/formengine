import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faTrash from '@fortawesome/free-regular-svg-icons/faTrashAlt.js'
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
import {IconButton, Tooltip, Whisper} from 'rsuite'
import {FaIcon} from '../../../components/Icons'
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

export const ValidationRuleEditor = namedObserver('ValidationRuleEditor', ({rule, onRemove}: ValidationRuleEditorProps) => {
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

  const initValidatorArgs = useCallback(() => {
    rule.args ??= {}
    return rule.args
  }, [rule])

  const annotations = convertValidationRuleParametersToAnnotations(ruleDefinition.params ?? [])

  return (
    <div>
      <SRuleName>{t(`validation.rule.${rule.key}`, rule.key)}</SRuleName>
      <Whisper speaker={<Tooltip>{t('validation.removeRule')}</Tooltip>} placement={'bottom'}>
        <IconButton onClick={onRemove} icon={<FaIcon icon={faTrash as unknown as IconDefinition}/>}/>
      </Whisper>
      <PropertyBlock annotations={annotations} propertyBlockType={getValidatorPropertyBlockType(rule.key)} context={rule.args ?? {}}
                     initContext={initValidatorArgs}/>
    </div>
  )
})

const SRuleName = styled.span`
  font-size: medium;
  font-weight: bold;
`
