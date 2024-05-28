import {Annotation, ComponentDataProvider, namedObserver, useErrorModel} from '@react-form-builder/core'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Checkbox, Input} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {PropertyBlock} from '../../RightPanel/PropertiesEditor/components/Properties'
import {ErrorComponentPicker} from './ErrorComponentPicker'

/**
 * React form builder component that displays the configuration properties of the validation error display component.
 * @returns the React element.
 */
const RawErrorSettings = () => {
  const {t} = useTranslation()
  const store = useBuilderStore()
  const [errorVisible, setErrorVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Error message example!')
  const message = errorVisible ? errorMessage : undefined

  useEffect(() => {
    store.viewer.form.componentTree.setAllErrors(message)
    return () => store.viewer.form.componentTree.setAllErrors()
  }, [message, store.viewer.form.componentTree])

  const errorModel = useErrorModel()
  const errorAnnotations = store.view.getErrorAnnotations(errorModel.type)
  const properties = errorAnnotations?.map(property => {
    return Object.assign(property, {localizable: false, calculable: false} as Annotation)
  }) ?? []
  const context = store.viewer.form.errorProps

  return (
    <div>
      {t('annotation.errorConfig.show')}: <Checkbox onChange={(_, checked) => setErrorVisible(checked)} checked={errorVisible}/>
      {errorVisible && <Input style={{marginTop: 4, marginBottom: 4}} onChange={setErrorMessage} value={errorMessage}/>}
      <ErrorComponentPicker/>
      <ComponentDataProvider value={store.viewer.form.componentTree}>
        <PropertyBlock annotations={properties} context={context}/>
      </ComponentDataProvider>
    </div>
  )
}

export const ErrorSettings = namedObserver('ErrorSettings', RawErrorSettings)
