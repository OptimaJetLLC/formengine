import {define, string} from 'fb-core'

interface RsStaticContentProps {
  content: string;
}

const RsStaticContent = (props: RsStaticContentProps) => {
  const {content, ...otherProps} = props
  return (<span {...otherProps}>{content}</span>)
}

export const rsStaticContent = define(RsStaticContent)
  .props({
    content: string.required.default('Text...'),
  })
