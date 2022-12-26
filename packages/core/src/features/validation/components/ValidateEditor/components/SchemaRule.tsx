import {observer} from 'mobx-react'
import {Input as RInput, InputNumber} from 'rsuite'
import {useComponentData} from '../../../../../utils/contexts/ComponenDataContext'
import {cast} from '../../../utils/cast'
import {getSchemaRules} from '../../../utils/getSchemaRules'

const getInput = (type: string) => {
  switch (type) {
    case 'string':
      return RInput
    case 'number':
      return InputNumber
  }
}

interface SchemaRuleProps {
  ruleKey: string
}

export const SchemaRule = observer(({ruleKey}: SchemaRuleProps) => {
  const {componentStore, model} = useComponentData()
  const schema = componentStore.schema
  const valuedAn = model.valuedAn
  const rule = getSchemaRules(valuedAn?.schema?.constructor)?.[ruleKey]
  if (!rule || !schema) return null

  return (
    <div key={ruleKey}>
      <h6>{rule.name}</h6>
      {rule.params.map((param, index) => {
        const Input = getInput(param.type)!

        return (
          <div key={param.name}>
            <label>{param.name}</label>
            <Input
              key={param.name}
              value={schema.data?.[ruleKey][index]}
              onChange={value => {
                schema.data ??= {[ruleKey]: []}
                schema.data[ruleKey][index] = cast(value, param.type)
              }}
            />
          </div>
        )
      })}
    </div>
  )
})
