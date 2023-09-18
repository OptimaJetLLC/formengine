import {array, boolean, define, event, node, number, oneOf, string} from '@react-form-builder/core'
import type {UploaderProps} from 'rsuite'
import {Uploader} from 'rsuite'
import {InputCell} from './components/InputCell'

interface RsUploaderProps extends UploaderProps {
  customElement: boolean
}

const RsUploader = ({customElement, children, ...props}: RsUploaderProps) => {
  return <Uploader {...props}>
    {customElement && <div>{children}</div>}
  </Uploader>
}

const columns = [
  {name: 'name', input: InputCell},
  {name: 'fileKey', input: InputCell},
  {name: 'url', input: InputCell}
]

export const rsUploader = define(RsUploader)
  .type('RsUploader')
  .name('Uploader')
  .props({
    action: string.required.default('/'),
    accept: string,
    autoUpload: boolean.default(true),
    customElement: boolean,
    children: node,
    disableMultipart: boolean,
    disabled: boolean,
    disabledFileItem: boolean,
    draggable: boolean,
    fileListVisible: boolean,
    listType: oneOf('text', 'picture-text', 'picture'),
    method: string,
    multiple: boolean,
    name: string,
    onChange: event,
    onError: event,
    onPreview: event,
    onProgress: event,
    onRemove: event,
    onReupload: event,
    onSuccess: event,
    onUpload: event,
    removable: boolean,
    timeout: number,
    withCredentials: boolean,
    defaultFileList: array
      .withEditorProps({columns})
  })
