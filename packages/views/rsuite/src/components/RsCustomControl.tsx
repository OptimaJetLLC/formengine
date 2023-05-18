import {define} from '@react-form-builder/builder/view'

interface RsCustomControlProps {

}

const RsCustomControl = (props: RsCustomControlProps) => {
  // todo implement
  return (<>CustomControl</>)
}

export const rsCustomControl = define(RsCustomControl)
  .type('RsCustomControl')
  .name('Custom control')
  .preview(<span>This is custom preview 🎉🚉🪆</span>)
