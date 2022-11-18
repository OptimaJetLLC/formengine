import React from 'react'
import {RadioButtons} from '../../ui/RadioButtons'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'
import {Property} from '../utils/annotations/Property'

export const RadioButtonInput = ({componentStore, annotation}: PropertyEditorProps) => (
  <RadioButtons label={annotation.name} items={(annotation as Property).data}
                {...makeAnnotationProps({componentStore, annotation})}/>
)
