import {array, boolean, define, disabled, event, object, readOnly, string, stringNode} from '@react-form-builder/core'
import cx from 'clsx'
import {useCallback, useMemo} from 'react'
import type {DropzoneOptions, DropzoneState} from 'react-dropzone'
import {useDropzone} from 'react-dropzone'
import type {FileType, UploaderProps} from './types'
import styles from './Uploader.module.css'
import {uploadFiles} from './utils/upload'

const defaultContent = `Drop some files here, or click to select files`

const getClassName = (state: Partial<DropzoneState>, dropzone?: boolean, className?: string) => {
  const {isDragActive, isDragAccept, isDragReject} = state

  return cx(
    styles.uploader,
    dropzone && styles.dropzone,
    isDragActive && styles.isDragActive,
    isDragAccept && styles.isDragAccept,
    isDragReject && styles.isDragReject,
    className
  )
}

const Uploader = ({
  children,
  dropzone,
  paste,
  value,
  className,
  action,
  onChange,
  onError,
  onDrop,
  onDropRejected,
  disabled,
  readOnly,
  ...props
}: UploaderProps) => {
  const handleFileUpload = useCallback(
    (acceptedFiles: File[]) => {
      if (!action) return

      const handleChange = (files?: FileType[]) => {
        if (files?.length) {
          onChange?.([...(value ?? []), ...files])
        }
      }

      const handleError = (error: unknown, files?: FileType[]) => {
        handleChange(files)
        onError?.(error)
      }

      uploadFiles(acceptedFiles, action, handleChange, handleError).catch()
    },
    [action, onChange, onError, value]
  )

  const dropzoneOptions = useMemo<DropzoneOptions>(
    () => ({
      ...props,
      disabled: Boolean(disabled || readOnly),
      noDrag: !dropzone,
      noPaste: !paste,
      onDrop: handleFileUpload,
    }),
    [disabled, dropzone, handleFileUpload, paste, props, readOnly]
  )

  const {getInputProps, getRootProps, ...state} = useDropzone(dropzoneOptions)

  const dropzoneProps = useMemo(
    () =>
      getRootProps({
        className: getClassName(state, dropzone, className),
      }),
    [className, dropzone, state, getRootProps]
  )

  const inputProps = useMemo(() => getInputProps(), [getInputProps])

  return (
    <div {...dropzoneProps}>
      <input {...inputProps} />
      {children}
    </div>
  )
}

export const uploader = define(Uploader, 'Uploader')
  .category('fields')
  .props({
    action: string.required.default('/'),
    value: array.valued.hideEditor(),
    children: stringNode.setup({default: defaultContent}),
    accept: object,
    dropzone: boolean.default(true),
    paste: boolean.default(false),
    multiple: boolean,
    disabled: disabled,
    readOnly: readOnly,
    onChange: event,
    onError: event,
  })
