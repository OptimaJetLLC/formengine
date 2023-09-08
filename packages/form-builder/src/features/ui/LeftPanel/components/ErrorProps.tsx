import {ComponentDataProvider, namedObserver} from '@react-form-builder/core'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Checkbox, Input} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {Annotation} from '../../../annotation/types/annotations/Annotation'
import {PropertyBlock} from '../../RightPanel/PropertiesEditor/components/Properties'

/**
 * React form builder component that displays the configuration properties of the validation error display component.
 * @returns the React element.
 */
export const ErrorProps = namedObserver('ErrorSettings', () => {
  const {t} = useTranslation()
  const store = useBuilderStore()
  const [errorVisible, setErrorVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Error message example!')

  useEffect(() => {
    const message = errorVisible ? errorMessage : undefined
    store.viewer.form.componentTree.setAllErrors(message)
    return () => store.viewer.form.componentTree.setAllErrors()
  }, [errorVisible, errorMessage])

  const properties = store.view.errorMeta.properties.map(property => {
    return Object.assign(property, {localizable: false, calculable: false} as Annotation)
  })
  const context = store.viewer.form.errorProps

  return (
    <div>
      {t('annotation.errorConfig.show')}: <Checkbox onChange={(_, checked) => setErrorVisible(checked)} checked={errorVisible}/>
      {errorVisible && <Input style={{marginTop: 4, marginBottom: 4}} onChange={setErrorMessage} value={errorMessage}/>}
      <ComponentDataProvider value={store.viewer.form.componentTree}>
        <PropertyBlock annotations={properties} context={context}/>
      </ComponentDataProvider>
    </div>
  )
})
