import {boolean, namedObserver} from '@react-form-builder/core'
import {t} from 'i18next'
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
    <div>
      <h5>{t('validation.validationRules')}</h5>
      <PropertyEditorWrapper annotation={autoValidate} context={schema}/>
      {
        schema.validations?.map((rule, index) => {
          const key = `${rule.key}-${rule.type ?? 'internal'}`
          return <ValidationRuleEditor key={key} rule={rule} onRemove={() => {
            schema?.validations?.splice(index, 1)
          }}/>
        })
      }
      <AddRuleButton/>
    </div>
  )
})
