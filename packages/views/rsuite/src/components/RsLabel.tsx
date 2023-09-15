import {define, string} from '@react-form-builder/core'
import {textStyles} from '../commonProperties'
import {TextProps} from '../commonTypes'

interface RsLabelProps extends TextProps {
  text: string
}

const RsLabel = ({text, ...props}: RsLabelProps) => <label {...props}>{text}</label>

export const rsLabel = define(RsLabel)
  .type('RsLabel')
  .name('Label')
  .props({
    text: string.default('Label'),
  })
  .css({
    ...textStyles
  })
