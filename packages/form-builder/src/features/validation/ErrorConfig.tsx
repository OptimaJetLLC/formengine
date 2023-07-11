import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Checkbox, Input} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {PropertyBlock} from '../ui/RightPanel/PropertiesEditor/components/Properties'

/**
 * React form builder component that displays the configuration properties of the validation error display component.
 * @returns the React element.
 */
export const ErrorConfig = () => {
  const {t} = useTranslation()
  const store = useBuilderStore()
  const [errorVisible, setErrorVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Error message example!')

  useEffect(() => {
    store.viewer.screen.props.error ??= {value: {}}
  }, [])

  useEffect(() => {
    if (errorVisible) {
      store.viewer.form.setAllErrors(errorMessage)
    } else {
      store.viewer.form.setAllErrors()
    }

    return () => store.viewer.form.setAllErrors()
  }, [errorVisible, errorMessage])

  const properties = store.view.errorMeta.properties
  const context = store.viewer.screen.props.error?.value

  return (
    <div>
      <h6>{t('annotation.errorConfig.header')}</h6>
      {t('annotation.errorConfig.show')}: <Checkbox onChange={(_, checked) => setErrorVisible(checked)} checked={errorVisible}/>
      {errorVisible && <Input style={{marginTop: 4, marginBottom: 4}} onChange={setErrorMessage} value={errorMessage}/>}
      <PropertyBlock annotations={properties} context={context}/>
    </div>
  )
}
