import {define, string} from '@react-form-builder/core'
import {createElement} from 'react'
import {backgroundColor, headerSize, textStyles} from '../commonProperties'
import {TextProps} from '../commonTypes'

interface RsHeaderProps extends TextProps {
  content?: string
  headerSize: string
}

/**
 * React component that displays the title.
 * @param props the React component properties.
 * @param props.content the title text.
 * @param props.headerSize the title size.
 * @param props.props the other wrapped properties of the component.
 * @returns the React element.
 */
export const RsTitle = ({content, headerSize, ...props}: RsHeaderProps) => {
  return createElement(headerSize, {children: content, ...props})
}

const {textAlign, color} = textStyles

export const rsTitle = define(RsTitle)
  .type('RsTitle')
  .name('Title')
  .props({
    content: string.required.default('Header'),
    headerSize
  })
  .css({
    backgroundColor,
    textAlign,
    color
  })

