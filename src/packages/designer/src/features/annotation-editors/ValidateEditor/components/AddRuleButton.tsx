import type {SchemaType, ValidatorType} from '@react-form-builder/core'
import {namedObserver, useComponentData, useStore} from '@react-form-builder/core'
import type {Ref} from 'react'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, Dropdown} from 'rsuite'
import type {DropdownProps} from 'rsuite/esm/Dropdown/Dropdown'
import type {WithAsProps} from 'rsuite/esm/internals/types'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'

const RawRulesList = ({type}: { type: SchemaType }) => {
  const {store} = useComponentData()
  const {t} = useTranslation()
  const viewerStore = useStore()

  const validationRules = viewerStore.getValidationRules(type)

  const onSelect = useCallback((key: string, type: ValidatorType) => {
    store.schema ??= {validations: []}
    // don't keep the default 'internal' type for JSON
    const validationRecord = type === 'internal' ? {key} : {key, type}
    store.schema.validations?.push(validationRecord)
  }, [store])

  const isNotApplied = (key: string, validatorType: ValidatorType) => {
    return !store.schema?.validations?.find(ruleSettings => {
      const sameType = validatorType === 'internal' && !ruleSettings.type || ruleSettings.type === validatorType
      return ruleSettings.key === key && sameType
    })
  }

  const createSelectHandler = useCallback((key: string, type: ValidatorType) => () => {
    onSelect(key, type)
  }, [onSelect])

  const toDropdownItem = useCallback((key: string, type: ValidatorType, name: string) => (
    <Dropdown.Item key={key} eventKey={key} onSelect={createSelectHandler(key, type)}>
      {name}
    </Dropdown.Item>
  ), [createSelectHandler])

  const items = Object.entries(validationRules.internal)
    .filter(([key]) => isNotApplied(key, 'internal'))
    .map(([key]) => toDropdownItem(key, 'internal', t(`validation.rule.${key}`)))
  if (validationRules.custom) {
    const customItems = Object.entries(validationRules.custom)
      .filter(([key]) => isNotApplied(key, 'custom'))
      .map(([key]) => toDropdownItem(key, 'custom', t(`validation.rule.${key}`, key)))
    if (customItems.length) {
      items.push(<Dropdown.Separator key={'separator'}/>)
      items.push(...customItems)
    }
  }
  return <>{items}</>
}

const RulesList = namedObserver('RulesList', RawRulesList)

const RawAddRuleButton = () => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()
  const componentData = useComponentData()
  const meta = builderStore.getComponentMetadata(componentData.model.type)
  const type = meta?.valuedAn?.type

  const renderToggle: DropdownProps['renderToggle'] = useCallback((props: WithAsProps, ref: Ref<any>) => (
    <Button {...props} ref={ref} block>
      {t('validation.addRule')}
    </Button>
  ), [t])

  if (!type) return null

  return (
    <Dropdown renderToggle={renderToggle}>
      <RulesList type={type}/>
    </Dropdown>
  )
}

export const AddRuleButton = namedObserver('AddRuleButton', RawAddRuleButton)
