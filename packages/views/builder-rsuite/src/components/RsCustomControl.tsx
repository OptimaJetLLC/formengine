import {define} from 'form-builder'

interface RsCustomControlProps {

}

const RsCustomControl = (props: RsCustomControlProps) => {
  // todo implement
  return (<>CustomControl</>)
}

export const rsCustomControl = define(RsCustomControl)
  .named('Custom control')
  .preview(<span>This is custom preview 🎉🚉🪆</span>)
