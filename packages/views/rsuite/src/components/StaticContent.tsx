import {string, define} from 'fb-core'

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
