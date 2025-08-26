import type {Annotation} from '@react-form-builder/core'
import {ComponentDataProvider, namedObserver, useErrorModel} from '@react-form-builder/core'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Input} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {SCheckbox} from '../../../annotation-editors/BooleanInput'
import {Rows} from '../../../components/Containers'
import {LabeledWrapper} from '../../../components/LabeledProperty'
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
  const properties = store.view.getMeta(errorModel.type)?.properties?.map(property => {
    return Object.assign(property, {localizable: false, calculable: false} as Annotation)
  }) ?? []
  const context = store.viewer.form.errorProps
  const label = t('annotation.errorConfig.show')

  return (
    <Rows gap={10}>
      <LabeledWrapper label={label}>
        <SCheckbox onChange={(_, checked) => setErrorVisible(checked)} checked={errorVisible}/>
      </LabeledWrapper>
      {errorVisible && <Input style={{marginTop: 4, marginBottom: 4}} onChange={setErrorMessage} value={errorMessage}/>}
      <ErrorComponentPicker/>
      <ComponentDataProvider value={store.viewer.form.componentTree}>
        <PropertyBlock annotations={properties} context={context}/>
      </ComponentDataProvider>
    </Rows>
  )
}

export const ErrorSettings = namedObserver('ErrorSettings', RawErrorSettings)
