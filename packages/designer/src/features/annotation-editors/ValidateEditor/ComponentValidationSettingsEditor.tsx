import type {ValidationRuleSettings} from '@react-form-builder/core'
import {boolean, namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {List, ListItem, Rows} from '../../components/Containers'
import {PropertyEditorWrapper} from '../../components/PropertyEditorWrapper/PropertyEditorWrapper'
import type {AnnotationEditorProps} from '../AnnotationEditorProps'
import {AddRuleButton} from './components/AddRuleButton'
import {ValidationRuleEditor} from './components/ValidationRuleEditor'
import styles from './ComponentValidationSettingsEditor.module.css'

interface RuleItemProps {
  rule: ValidationRuleSettings
  index: number
  onRemove: (index: number) => void
}

const RawRuleItem = ({rule, index, onRemove}: RuleItemProps) => {
  const handleRemove = useCallback(() => {
    onRemove(index)
  }, [index, onRemove])

  return <ListItem>
    <ValidationRuleEditor rule={rule} onRemove={handleRemove}/>
  </ListItem>
}

const RuleItem = namedObserver('RuleItem', RawRuleItem)

interface RulesListProps {
  validations?: ValidationRuleSettings[]
  onRemove: (index: number) => void
}

const RawRulesList = ({validations, onRemove}: RulesListProps) => {
  if (!validations) return null

  return <List>
    {validations.map((rule, index) => {
      return <RuleItem key={`${rule.key}-${rule.type ?? 'internal'}`}
                       rule={rule}
                       index={index}
                       onRemove={onRemove}/>
    })}
  </List>
}

const RulesList = namedObserver('RulesList', RawRulesList)

const autoValidate = boolean
  .setup({annotationType: 'Module', calculable: false})
  .hinted('Validate automatically by input change')
  .default(true)
  .build('autoValidate')

/**
 * The React form builder component that displays the validation settings for the component value.
 * @param props the React component properties.
 * @returns the React element.
 */
const RawComponentValidationSettingsEditor = (props: AnnotationEditorProps) => {
  const {store, model} = props.componentData
  const type = model.valueType
  const schema = store.schema ?? {}
  const {validations} = schema
  const handleRemove = useCallback((index: number) => validations?.splice(index, 1), [validations])

  const initValidationContext = useCallback(() => {
    store.schema ??= {}
    store.schema.validations ??= []
    return store.schema
  }, [store])

  if (!type || model.dataBindingType !== 'twoWay') return null

  return (
    <Rows>
      <div className={styles.wrapper}>
        <PropertyEditorWrapper annotation={autoValidate} context={schema}
                               initContext={initValidationContext}/>
      </div>
      <AddRuleButton/>
      <RulesList validations={validations} onRemove={handleRemove}/>
    </Rows>
  )
}

export const ComponentValidationSettingsEditor = namedObserver('ComponentValidationSettingsEditor', RawComponentValidationSettingsEditor)
