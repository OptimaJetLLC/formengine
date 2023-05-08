import {SchemaType, useComponentData} from 'fb-core'
import {Checkbox} from 'rsuite'
import {Nullable} from 'vitest'
import {useMeta} from '../../../utils/useMeta'
import {AddRuleButton} from './components/AddRuleButton'
import {SchemaRule} from './components/SchemaRule'

export const ValidateEditor = () => {
  const {store} = useComponentData()
  const meta = useMeta()
  const type = meta?.valuedAn?.schema?.type as Nullable<SchemaType>
  if (!type) return null

  return (
    <div>
      <h5>Validation schema:</h5>
      <Checkbox
        title="Use the schema for transform after input value"
        children="Auto transform"
        checked={store.schema?.autoTransform}
        onChange={(_, checked) => {
          store.schema ??= {type, rules: []}
          store.schema.autoTransform = checked
        }}
      />
      {
        store.schema?.rules.map(key => <SchemaRule key={key} ruleKey={key}/>)
      }
      <AddRuleButton/>
    </div>
  )
}
