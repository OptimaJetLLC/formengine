import {array, boolean, define, event, node, oneOf, string} from '@react-form-builder/core'
import type {UploaderProps} from 'rsuite'
import {Uploader} from 'rsuite'
import {nonNegNumber} from '../commonProperties'
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

export const rsUploader = define(RsUploader, 'RsUploader')
  .name('Uploader')
  .props({
    action: string.required.default('/'),
    accept: string,
    autoUpload: boolean.default(true),
    customElement: boolean.default(false),
    children: node,
    disableMultipart: boolean.default(false),
    disabled: boolean.default(false),
    disabledFileItem: boolean.default(false),
    draggable: boolean.default(false),
    fileListVisible: boolean.default(true),
    listType: oneOf('text', 'picture-text', 'picture'),
    method: string,
    multiple: boolean.default(false),
    name: string,
    onChange: event,
    onError: event,
    onPreview: event,
    onProgress: event,
    onRemove: event,
    onReupload: event,
    onSuccess: event,
    onUpload: event,
    removable: boolean.default(false),
    timeout: nonNegNumber.default(0),
    withCredentials: boolean.default(false),
    fileList: array
      .withEditorProps({columns})
      .valued
  })
