import type {FormViewerValidationRules, SchemaType, ValidationRuleSettings, ValidatorType} from '@react-form-builder/core'
import {ComponentStore, namedObserver, useComponentData, useStore} from '@react-form-builder/core'
import type {Ref} from 'react'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, Dropdown} from 'rsuite'
import type {DropdownProps} from 'rsuite/esm/Dropdown/Dropdown'
import type {WithAsProps} from 'rsuite/esm/internals/types'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'

type AvailableRule = {
  key: string
  type: ValidatorType
}

function getAvailableRules(
  validationRules: FormViewerValidationRules,
  validations: ValidationRuleSettings[] | undefined,
): AvailableRule[] {
  const isNotApplied = (key: string, validatorType: ValidatorType) => {
    return !validations?.find(ruleSettings => {
      const sameType = validatorType === 'internal' && !ruleSettings.type || ruleSettings.type === validatorType
      return ruleSettings.key === key && sameType
    })
  }

  const result: AvailableRule[] = []

  for (const [key] of Object.entries(validationRules.internal)) {
    if (isNotApplied(key, 'internal')) {
      result.push({key, type: 'internal'})
    }
  }

  if (validationRules.custom) {
    for (const [key] of Object.entries(validationRules.custom)) {
      if (isNotApplied(key, 'custom')) {
        result.push({key, type: 'custom'})
      }
    }
  }

  return result
}

const RawRulesList = ({type}: { type: SchemaType }) => {
  const {store} = useComponentData()
  const {t} = useTranslation()
  const viewerStore = useStore()

  const validationRules = viewerStore.getValidationRules(type)

  const availableRules = getAvailableRules(validationRules, store.schema?.validations)

  const onSelect = useCallback((key: string, type: ValidatorType) => ComponentStore.addValidationRule(store, key, type), [store])

  const createSelectHandler = useCallback((key: string, type: ValidatorType) => () => {
    onSelect(key, type)
  }, [onSelect])

  const toDropdownItem = useCallback((key: string, type: ValidatorType, name: string) => (
    <Dropdown.Item key={key} eventKey={key} onSelect={createSelectHandler(key, type)}>
      {name}
    </Dropdown.Item>
  ), [createSelectHandler])

  if (!availableRules.length) return null

  const items = availableRules
    .filter(r => r.type === 'internal')
    .map(({key}) => toDropdownItem(key, 'internal', t(`validation.rule.${key}`)))

  const customRules = availableRules
    .filter(r => r.type === 'custom')
    .map(({key}) => toDropdownItem(key, 'custom', t(`validation.rule.${key}`, key)))

  if (customRules.length && items.length) {
    items.push(<Dropdown.Separator key={'separator'}/>)
  }
  items.push(...customRules)

  return <>{items}</>
}

const RulesList = namedObserver('RulesList', RawRulesList)

const RawAddRuleButton = () => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()
  const componentData = useComponentData()
  const meta = builderStore.getComponentMetadata(componentData.model.type)
  const type = meta?.valuedAn?.type
  const viewerStore = useStore()

  const renderToggle: DropdownProps['renderToggle'] = useCallback((props: WithAsProps, ref: Ref<any>) => (
    <Button {...props} ref={ref} block>
      {t('validation.addRule')}
    </Button>
  ), [t])

  if (!type) return null
  const validationRules = viewerStore.getValidationRules(type)
  const availableRules = getAvailableRules(validationRules, componentData.store.schema?.validations)
  const hasItems = !!availableRules.length

  return (
    <Dropdown renderToggle={renderToggle} disabled={!hasItems}>
      <RulesList type={type}/>
    </Dropdown>
  )
}

export const AddRuleButton = namedObserver('AddRuleButton', RawAddRuleButton)
