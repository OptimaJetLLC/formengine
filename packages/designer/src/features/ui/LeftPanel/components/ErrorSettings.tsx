import type {Annotation} from '@react-form-builder/core'
import {ComponentDataProvider, namedObserver, useErrorModel} from '@react-form-builder/core'
import {useCallback, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Input} from 'rsuite'
import type {CheckboxProps, ValueType} from 'rsuite/esm/Checkbox/Checkbox'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {SCheckbox} from '../../../annotation-editors/BooleanInput'
import {Rows} from '../../../components/Containers'
import {LabeledWrapper} from '../../../components/LabeledProperty'
import {PropertyBlock} from '../../RightPanel/PropertiesEditor/components/PropertyBlock'
import {ErrorComponentPicker} from './ErrorComponentPicker'
import styles from './ErrorSettings.module.css'

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

  const handleCheckboxChange: CheckboxProps['onChange'] = useCallback((_: ValueType | undefined, checked: boolean) => {
    setErrorVisible(checked)
  }, [])

  return (
    <Rows className={styles.rows}>
      <LabeledWrapper label={label}>
        <SCheckbox onChange={handleCheckboxChange} checked={errorVisible}/>
      </LabeledWrapper>
      {errorVisible && <Input className={styles.input} onChange={setErrorMessage} value={errorMessage}/>}
      <ErrorComponentPicker/>
      <ComponentDataProvider value={store.viewer.form.componentTree}>
        <PropertyBlock annotations={properties} context={context}/>
      </ComponentDataProvider>
    </Rows>
  )
}

export const ErrorSettings = namedObserver('ErrorSettings', RawErrorSettings)
