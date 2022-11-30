import {observer} from 'mobx-react'
import {useComponentData} from '../../../../../utils/contexts/ComponenDataContext'
import {useTranslation} from 'react-i18next'
import {Button, Dropdown} from 'rsuite'
import {getSchemaRules} from '../../../utils/getSchemaRules'

export const AddRuleButton = observer(() => {
  const {componentStore, model} = useComponentData()

  const {t} = useTranslation()

  const valuedAn = model.properties.find((p) => p.valued) ?? model.properties.find((p) => p.name === 'value')
  const rules = getSchemaRules(valuedAn?.schema?.constructor)

  if (!rules) return null

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
              componentStore.schema ??= {rules: []}
              componentStore.schema.rules.push(key)
            }}
          />
        ))
      }
    </Dropdown>
  )
})
