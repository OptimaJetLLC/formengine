import {define, oneOf, string} from 'form-builder/view'
import {backgroundColor, textStyles} from '../commonProperties'
import {TextProps} from '../commonTypes'

interface RsHeaderProps extends TextProps {
  content: string
  level: string
}

interface Levels {
  [key: string]: (p?: any) => JSX.Element;
}

const levelMap: Levels = {
  'h1': p => <h1 {...p}/>,
  'h2': p => <h2 {...p}/>,
  'h3': p => <h3 {...p}/>,
  'h4': p => <h4 {...p}/>,
  'h5': p => <h5 {...p}/>,
  'h6': p => <h6 {...p}/>,
}

const RsTitle = ({content, level, ...props}: RsHeaderProps) => {
  const Element = levelMap[level]
  return <Element {...props}>{content}</Element>
}

const {textAlign, color} = textStyles

export const rsTitle = define(RsTitle)
  .props({
    content: string.required.default('Header'),
    level: oneOf('h1', 'h2', 'h3', 'h4', 'h5', 'h6')
      .default('h4')
      .hinted('Header level'),
  })
  .css({
    backgroundColor,
    textAlign,
    color
  })

