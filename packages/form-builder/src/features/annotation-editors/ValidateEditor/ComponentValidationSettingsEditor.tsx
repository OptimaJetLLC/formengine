import {useComponentData} from '@react-form-builder/core'
import {t} from 'i18next'
import {useEffect} from 'react'
import {boolean} from '../../annotation'
import {PropertyEditorWrapper} from '../../components/PropertyEditorWrapper'
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
export const ComponentValidationSettingsEditor = () => {
  const {store, model} = useComponentData()
  const type = model.valueType
  const schema = store.schema

  useEffect(() => {
    if (!type) return
    store.schema ??= {validations: []}
  }, [])

  if (!type || !schema) return null

  return (
    <div>
      <h5>{t('validation.validationRules')}</h5>
      <PropertyEditorWrapper annotation={autoValidate} getContext={() => schema}/>
      {
        store.schema?.validations?.map((rule, index) => {
          return <ValidationRuleEditor key={rule.key} rule={rule} onRemove={() => {
            store.schema?.validations?.splice(index, 1)
          }}/>
        })
      }
      <AddRuleButton/>
    </div>
  )
}
