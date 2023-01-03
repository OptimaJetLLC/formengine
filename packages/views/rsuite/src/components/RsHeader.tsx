import {define, oneOf, string} from 'fb-core'
import {textStyles} from '../commonProperties'
import {TextProps} from '../commonTypes'

interface RsHeaderProps extends TextProps {
  content: string
  level: string
  alignment: string
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

const RsHeader = ({content, level, ...props}: RsHeaderProps) => {
  const Element = levelMap[level]
  return <Element {...props}>{content}</Element>
}

export const rsHeader = define(RsHeader)
  .props({
    content: string.required.default('Header'),
    level: oneOf('h1', 'h2', 'h3', 'h4', 'h5', 'h6')
      .default('h4')
      .hinted('Header level'),
    ...textStyles
  })

