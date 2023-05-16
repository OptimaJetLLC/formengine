import {boolean, define, string} from '@react-form-builder/builder/view'

interface RsStaticContentProps {
  content: string
  allowHtml: boolean
}

const RsStaticContent = (props: RsStaticContentProps) => {
  const {content, allowHtml, ...otherProps} = props
  if (allowHtml) return <span dangerouslySetInnerHTML={{__html: content}} {...otherProps}/>
  return <span {...otherProps}>{content}</span>
}

export const rsStaticContent = define(RsStaticContent)
  .props({
    content: string.required.default('Text...'),
    allowHtml: boolean.named('Allow HTML'),
  })
