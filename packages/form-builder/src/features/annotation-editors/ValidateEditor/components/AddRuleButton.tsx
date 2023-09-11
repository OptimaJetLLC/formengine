import {namedObserver, SchemaType, useComponentData, useStore, ValidatorType} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {Button, Dropdown} from 'rsuite'
import {useMeta} from '../../../../utils/useMeta'

const RulesList = namedObserver('RulesList', ({type}: { type: SchemaType }) => {
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
  if (validationRules.external) {
    // todo localize external validator name
    const externalItems = Object.entries(validationRules.external)
      .filter(([key]) => isNotApplied(key, 'external'))
      .map(([key]) => toDropdownItem(key, 'external', t(`validation.rule.${key}`, key)))
    if (externalItems.length) {
      items.push(<Dropdown.Separator key={'separator'}/>)
      items.push(...externalItems)
    }
  }
  return <>{items}</>
})

export const AddRuleButton = observer(() => {
  const {t} = useTranslation()
  const meta = useMeta()

  const type = meta?.valuedAn?.type
  if (!type) return null

  return (
    <Dropdown
      style={{display: 'flex', marginTop: 10}}
      renderToggle={(props: any, ref: any) => (
        <Button {...props} ref={ref} block>
          <h6> {t('validation.addRule')} </h6>
        </Button>
      )}
    >
      <RulesList type={type}/>
    </Dropdown>
  )
})
