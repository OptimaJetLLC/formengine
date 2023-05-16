import {getSchemaRules, SchemaType, useComponentData} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useTranslation} from 'react-i18next'
import {Button, Dropdown} from 'rsuite'
import {Nullable} from 'vitest'
import {useMeta} from '../../../../utils/useMeta'

export const AddRuleButton = observer(() => {
  const {store} = useComponentData()
  const {t} = useTranslation()
  const meta = useMeta()

  const rules = getSchemaRules(meta?.valuedAn?.schema?.constructor)
  const type = meta?.valuedAn?.schema?.type as Nullable<SchemaType>
  if (!rules || !type) return null

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
        Object.entries(rules).map(([key, rule]) => (
          <Dropdown.Item
            key={rule.name}
            children={rule.name}
            eventKey={key}
            onSelect={(key) => {
              store.schema ??= {type, rules: []}
              store.schema.rules.push(key)
            }}
          />
        ))
      }
    </Dropdown>
  )
})
