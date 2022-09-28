import {define} from '../../features/define'
import {string} from '../../features/annotation'

interface StaticContentProps {
  content: string;
}

const StaticContent = (props: StaticContentProps) => {
  const {content, ...otherProps} = props
  return (<span {...otherProps}>{content}</span>)
}

export const staticContent = define(StaticContent)
  .props({
    content: string.required.default('Text...'),
  })
