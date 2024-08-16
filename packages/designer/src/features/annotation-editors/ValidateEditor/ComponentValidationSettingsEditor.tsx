import styled from '@emotion/styled'
import type {ValidationRuleSettings} from '@react-form-builder/core'
import {boolean, namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {List, ListItem, Rows} from '../../components/Containers'
import {PropertyEditorWrapper} from '../../components/PropertyEditorWrapper'
import type {AnnotationEditorProps} from '../AnnotationEditorProps'
import {AddRuleButton} from './components/AddRuleButton'
import {ValidationRuleEditor} from './components/ValidationRuleEditor'

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

  const initValidationContext = useCallback(() => {
    store.schema ??= {}
    store.schema.validations ??= []
    return store.schema
  }, [store])

  if (!type) return null

  return (
    <Rows>
      <SWrapper>
        <PropertyEditorWrapper annotation={autoValidate} context={schema}
                               initContext={initValidationContext}/>
      </SWrapper>
      <AddRuleButton/>
      <List>{renderRules(store.schema?.validations)}</List>
    </Rows>
  )
}

export const ComponentValidationSettingsEditor = namedObserver('ComponentValidationSettingsEditor', RawComponentValidationSettingsEditor)

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
