import {namedObserver, SchemaType, useComponentData, useStore, ValidatorType} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'
import {Button, Dropdown} from 'rsuite'
import type {DropdownProps} from 'rsuite/esm/Dropdown/Dropdown'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'

const RawRulesList = ({type}: { type: SchemaType }) => {
  const {store} = useComponentData()
  const {t} = useTranslation()
  const viewerStore = useStore()

  const validationRules = viewerStore.getValidationRules(type)
  const onSelect = (key: string, type: ValidatorType) => {
    store.schema ??= {validations: []}
    // don't keep the default 'internal' type for JSON
    const validationRecord = type === 'internal' ? {key} : {key, type}
    store.schema.validations?.push(validationRecord)
  }
  const isNotApplied = (key: string, validatorType: ValidatorType) => {
    return !store.schema?.validations?.find(ruleSettings => {
      const sameType = validatorType === 'internal' && !ruleSettings.type || ruleSettings.type === validatorType
      return ruleSettings.key === key && sameType
    })
  }
  const toDropdownItem = (key: string, type: ValidatorType, name: string) => {
    return <Dropdown.Item key={key} children={name} eventKey={key} onSelect={key => onSelect(key, type)}/>
  }

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
  if (!type) return null

  const renderToggle: DropdownProps['renderToggle'] = (props, ref) => (
    <Button {...props} ref={ref} block>
      {t('validation.addRule')}
    </Button>
  )

  return (
    <Dropdown renderToggle={renderToggle}>
      <RulesList type={type}/>
    </Dropdown>
  )
}

export const AddRuleButton = namedObserver('AddRuleButton', RawAddRuleButton)
