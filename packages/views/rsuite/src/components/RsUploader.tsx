import {array, boolean, define, event, node, oneOf, string} from '@react-form-builder/core'
import {useMemo} from 'react'
import type {UploaderProps} from 'rsuite'
import {Uploader} from 'rsuite'
import {nonNegNumber, readOnly} from '../commonProperties'
import {InputCell} from './components/InputCell'
import {useTouchOnEvent} from './hooks/useTouchOnEvent'

interface RsUploaderProps extends UploaderProps {
  customElement: boolean
}

const RsUploader = ({customElement, children, disabled, multiple, fileList, ...props}: RsUploaderProps) => {
  const onRemove = useTouchOnEvent(props, 'onRemove')

  const canUpload = useMemo(() => {
    if (multiple) return true
    return !(fileList && fileList.length > 0)
  }, [fileList, multiple])

  const disabledButton = useMemo(() => disabled || !canUpload, [disabled, canUpload])

  return <Uploader {...props} disabled={disabledButton} multiple={multiple}
                   fileList={fileList} onRemove={onRemove}>
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
    readOnly,
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
    timeout: nonNegNumber,
    withCredentials: boolean.default(false),
    fileList: array
      .withEditorProps({columns})
      .valued
  })
