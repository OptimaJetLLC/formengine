import {define} from '@react-form-builder/core'

interface RsCustomBlockProps {

}

const RsCustomBlock = (props: RsCustomBlockProps) => {
  return (<>CustomBlock</>)
}

export const rsCustomBlock = define(RsCustomBlock)
  .type('RsCustomBlock')
  .name('Custom block')
