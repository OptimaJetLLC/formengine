import React, {ComponentType} from 'react'
import {ErrorMessage} from './ErrorMessage'
import {PropertyEditorProps} from '../../annotation/types'
import {observer} from 'mobx-react'
import {useValidation} from '../useValidation'
import * as Yup from 'yup'
import {useComponentData} from '../../../utils/contexts/ComponenDataContext'
import {Annotation} from "../../annotation/utils/annotations/Annotation";

interface WithValidationProps<T> {
  annotation: Annotation
  Component: ComponentType<PropertyEditorProps>
}

export const WithValidation = observer(<T extends any>(props: WithValidationProps<T> & T) => {
  const {annotation, Component} = props
  const {componentStore} = useComponentData()

  const scheme = annotation?.scheme

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
