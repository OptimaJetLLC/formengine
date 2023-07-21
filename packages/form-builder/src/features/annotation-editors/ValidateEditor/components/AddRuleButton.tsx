import {useComponentData, ValidationRules} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {Button, Dropdown} from 'rsuite'
import {useMeta} from '../../../../utils/useMeta'

export const AddRuleButton = observer(() => {
  const {store} = useComponentData()
  const {t} = useTranslation()
  const meta = useMeta()

  const type = meta?.valuedAn?.type
  if (!type) return null

  const rules = ValidationRules[type]

  return (
    <Dropdown
      style={{display: 'flex'}}
      renderToggle={(props: any, ref: any) => (
        <Button {...props} ref={ref} block>
          <h6> {t('validation.addRule')} </h6>
        </Button>
      )}
    >
      {
        Object.entries(rules)
          .filter(([key]) => !store.schema?.validations?.find(rule => rule.key === key))
          .map(([key]) => (
            <Dropdown.Item
              key={key}
              children={t(`validation.rule.${key}`)}
              eventKey={key}
              onSelect={(key) => {
                store.schema ??= {type, validations: []}
                store.schema.validations?.push({key})
              }}
            />
          ))
      }
    </Dropdown>
  )
})
