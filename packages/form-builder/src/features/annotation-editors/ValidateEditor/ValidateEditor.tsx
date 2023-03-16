import {useComponentData} from 'fb-core'
import {Checkbox} from 'rsuite'
import {AddRuleButton} from './components/AddRuleButton'
import {SchemaRule} from './components/SchemaRule'

export const ValidateEditor = () => {
  const {componentStore} = useComponentData()
  return (
    <div>
      <h5>Validation schema:</h5>
      <Checkbox
        title="Use the schema for transform after input value"
        children="Auto transform"
        checked={componentStore.schema?.autoTransform}
        onChange={(_, checked) => {
          componentStore.schema ??= {rules: []}
          componentStore.schema.autoTransform = checked
        }}
      />
      {
        componentStore.schema?.rules.map(key => <SchemaRule key={key} ruleKey={key}/>)
      }
      <AddRuleButton/>
    </div>
  )
}
