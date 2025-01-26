import styled from '@emotion/styled'
import type {Annotation, SchemaType, ValidationRuleSettings} from '@react-form-builder/core'
import {getValidatorPropertyBlockType, namedObserver, useComponentData, useStore} from '@react-form-builder/core'
import {RemindFill} from '@rsuite/icons'
import type {ComponentProps} from 'react'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {RemoveButton} from '../../../components/Buttons'
import {Columns, Rows} from '../../../components/Containers'
import {useTranslationPart} from '../../../localization/hooks'
import {PropertyBlock} from '../../../ui/RightPanel/PropertiesEditor/components/Properties'
import {convertValidationRuleParametersToAnnotations} from '../../../validation/utils/parameterConverter'
import {HintedIconButton} from '../../Hinted'

const WarningButton = (props: ComponentProps<any>) => {
  const t = useTranslationPart('validation')
  const icon = <RemindFill color="#f5a623"/>

  return <HintedIconButton hint={t('ruleNotFound')} icon={icon}{...props}/>
}

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

  let annotations: Annotation[] | null = null

  const ruleDefinition = getValidationRule(type, rule.key)
  if (ruleDefinition) {
    annotations = convertValidationRuleParametersToAnnotations(ruleDefinition.params ?? [])
  }

  return (
    <Rows>
      <Columns spaceBetween>
        <div>
          {!annotations &&
            <WarningButton hintPlacement={'autoHorizontal'} disabled={true}/>
          }
          <SRuleName>{t(`validation.rule.${rule.key}`, rule.key)}</SRuleName>
        </div>
        <RemoveButton onClick={onRemove} hintPlacement={'autoHorizontal'}/>
      </Columns>
      {annotations &&
        <PropertyBlock annotations={annotations} propertyBlockType={getValidatorPropertyBlockType(rule.key)} context={rule.args ?? {}}
                       initContext={initValidatorArgs}/>
      }
    </Rows>
  )
}

export const ValidationRuleEditor = namedObserver('ValidationRuleEditor', RawValidationRuleEditor)

const SRuleName = styled.span`
  font-size: medium;
`
