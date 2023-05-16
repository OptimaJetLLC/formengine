import {define, string} from '@react-form-builder/builder/view'
import {createElement} from 'react'
import {backgroundColor, headerSize, textStyles} from '../commonProperties'
import {TextProps} from '../commonTypes'

interface RsHeaderProps extends TextProps {
  content?: string
  headerSize: string
}

export const RsTitle = ({content, headerSize, ...props}: RsHeaderProps) => {
  return createElement(headerSize, {children: content, ...props})
}

const {textAlign, color} = textStyles

export const rsTitle = define(RsTitle)
  .props({
    content: string.required.default('Header'),
    headerSize
  })
  .css({
    backgroundColor,
    textAlign,
    color
  })

