import {define, string} from 'form-builder'
import {textStyles} from '../commonProperties'
import {TextProps} from '../commonTypes'

interface RsLabelProps extends TextProps {
  text: string
}

const RsLabel = ({text, ...props}: RsLabelProps) => <label {...props}>{text}</label>

export const rsLabel = define(RsLabel)
  .props({
    text: string.default('Label'),
  })
  .css({
    ...textStyles
  })
