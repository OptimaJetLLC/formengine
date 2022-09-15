import {string} from '../../features/annotation'
import {define} from '../../features/annotation/utils/define'

interface StaticContentProps {
  content: string;
}

const StaticContent = (props: StaticContentProps) => {
  const {content, ...otherProps} = props
  return (<span {...otherProps}>{content}</span>)
}

export const staticContent = define(StaticContent)
  .props({
    content: string.isRequired('Text...'),
  })
