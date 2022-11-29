import {define, string} from 'fb-core'
import React from 'react'
import {textStyles} from '../commonProperties'
import {TextProps} from '../commonTypes'

interface LabelProps extends TextProps {
  text: string
}

const Label = ({text, ...props}: LabelProps) => (
  <label {...props}>{text}</label>
)

export const label = define(Label)
  .props({text: string.default('Label'), ...textStyles})
