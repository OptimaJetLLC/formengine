import React from 'react'
import {LabeledProperty} from '../../ui/Containers'
import {RadioButtons} from '../../ui/RadioButtons'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'
import {Property} from '../utils/annotations/Property'

export const RadioInput = ({componentStore, annotation}: PropertyEditorProps) => (
  <LabeledProperty componentStore={componentStore} annotation={annotation}>
    <RadioButtons items={(annotation as Property).data}
                  {...makeAnnotationProps({componentStore, annotation})}/>
  </LabeledProperty>
)
