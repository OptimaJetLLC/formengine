import {observer} from 'mobx-react'
import React, {ComponentType} from 'react'
import * as Yup from 'yup'
import {useComponentData} from '../../../utils/contexts/ComponenDataContext'
import {PropertyEditorProps} from '../../annotation/types'
import {Annotation} from '../../annotation/utils/Annotation'
import {useValidation} from '../useValidation'
import {ErrorMessage} from './ErrorMessage'

interface WithValidationProps<T> {
  annotation: Annotation<any>
  Component: ComponentType<PropertyEditorProps<any>>
}

export const WithValidation = observer(<T extends any>(props: WithValidationProps<T> & T) => {
  const {annotation, Component} = props
  const {componentStore} = useComponentData()

  const scheme = Yup.string().required().min(3) //TODO scheme from annotation

  const [field, meta] = useValidation({key: annotation.key, scheme})

  return <div>
    <Component
      onChange={field.setValue}
      onBlur={() => field.setTouched()}
      value={field.value}
      annotation={annotation}
      componentStore={componentStore}/>
    <ErrorMessage {...meta}/>
  </div>
})
