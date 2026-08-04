import type {Annotation, SchemaType, ValidationRuleSettings} from '@react-form-builder/core'
import {getValidatorPropertyBlockType, namedObserver, useComponentData, useStore} from '@react-form-builder/core'
import {RemindFill} from '@rsuite/icons'
import type {ComponentProps} from 'react'
import {useCallback, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {RemoveButton} from '../../../components/Buttons'
import {Columns, Rows} from '../../../components/Containers'
import {useTranslationPart} from '../../../localization/hooks'
import {PropertyBlock} from '../../../ui/RightPanel/PropertiesEditor/components/PropertyBlock'
import {convertValidationRuleParametersToAnnotations, validateWhen} from '../../../validation/utils/parameterConverter'
import {HintedIconButton} from '../../Hinted'
import styles from './ValidationRuleEditor.module.css'

const warningButtonIcon = <RemindFill color="#f5a623"/>

const WarningButton = (props: ComponentProps<any>) => {
  const t = useTranslationPart('validation')

  return <HintedIconButton hint={t('ruleNotFound')} icon={warningButtonIcon} {...props}/>
}

/**
 * The properties of the React {@link ValidationRuleEditor} component.
 */
interface ValidationRuleEditorProps {
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
  const {store, model, key} = useComponentData()
  const {t} = useTranslation()
  const schema = store.schema
  const viewerStore = useStore()
  const {localization} = viewerStore.form
  const propertyBlockType = useMemo(() => getValidatorPropertyBlockType(rule.key), [rule.key])

  const initValidatorArgs = useCallback(() => {
    rule.args ??= {}
    return rule.args
  }, [rule])

  const handleRemove = useCallback(() => {
    onRemove()
    localization.removeLocalizationForType(key, propertyBlockType)
  }, [key, localization, onRemove, propertyBlockType])

  const validateWhenAnnotations = useMemo(() => [validateWhen], [])
  const contextValue = useMemo(() => rule.args ?? {}, [rule.args])

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
    <Rows data-testid={`existing-rule-${rule.type ?? 'internal'}-${rule.key}`}>
      <Columns spaceBetween>
        <div>
          {!annotations &&
            <WarningButton hintPlacement={'autoHorizontal'} disabled={true}/>
          }
          <span className={styles.ruleName}>{t(`validation.rule.${rule.key}`, rule.key)}</span>
        </div>
        <RemoveButton onClick={handleRemove} hintPlacement={'autoHorizontal'} data-testid={`${propertyBlockType}-remove-button`}/>
      </Columns>
      {annotations &&
        <PropertyBlock annotations={annotations} propertyBlockType={propertyBlockType} context={contextValue}
                       initContext={initValidatorArgs}/>
      }
      <PropertyBlock annotations={validateWhenAnnotations} propertyBlockType={getValidatorPropertyBlockType('validateWhen')}
                     context={rule}/>
    </Rows>
  )
}

export const ValidationRuleEditor = namedObserver('ValidationRuleEditor', RawValidationRuleEditor)
