import styled from '@emotion/styled'
import {boolean, namedObserver, ValidationRuleSettings} from '@react-form-builder/core'
import {List, ListItem, Rows} from '../../components/Containers'
import {PropertyEditorWrapper} from '../../components/PropertyEditorWrapper'
import {AnnotationEditorProps} from '../AnnotationEditorProps'
import {AddRuleButton} from './components/AddRuleButton'
import {ValidationRuleEditor} from './components/ValidationRuleEditor'

const autoValidate = boolean
  .setup({annotationType: 'Module', calculable: false})
  .hinted('Validate automatically by input change')
  .default(true)
  .build('autoValidate')

/**
 * The React form builder component that displays the validation settings for the component value.
 * @returns the React element.
 */
export const ComponentValidationSettingsEditor = namedObserver('ComponentValidationSettingsEditor', (props: AnnotationEditorProps) => {
  const {store, model} = props.componentData
  const type = model.valueType
  const schema = store.schema ?? {validations: []}

  if (!type) return null

  return (
    <Rows>
      <SWrapper>
        <PropertyEditorWrapper annotation={autoValidate} context={schema}/>
      </SWrapper>
      <AddRuleButton/>
      <List>{renderRules(schema.validations)}</List>
    </Rows>
  )
})

const renderRules = (validations?: ValidationRuleSettings[]) => (
  validations?.map((rule, index) => {
    const key = `${rule.key}-${rule.type ?? 'internal'}`
    const handleRemove = () => validations?.splice(index, 1)
    return <ListItem key={key}>
      <ValidationRuleEditor rule={rule} onRemove={handleRemove}/>
    </ListItem>
  })
)

const SWrapper = styled.div`
  label {
    min-width: max-content;
  }
`
