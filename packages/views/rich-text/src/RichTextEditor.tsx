import {boolean, define, event, someOf, string} from '@react-form-builder/core'
import {uniqueId} from 'lodash-es'
import type {CSSProperties} from 'react'
import {useCallback, useEffect, useMemo, useState} from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import './styles.css'
import {RsLabeledInput, RsRtlLabel} from './Labeled'

const options = {
  font: [{font: []}],
  header: [{header: []}],
  align: [{align: []}],
  direction: [{direction: 'rtl'}],
  decoration: ['bold', 'italic', 'underline', 'strike'],
  color: [{color: []}, {background: []}],
  script: [{script: 'super'}, {script: 'sub'}],
  block: ['blockquote', 'code-block'],
  list: [{list: 'ordered'}, {list: 'bullet'}],
  indent: [{'indent': '-1'}, {'indent': '+1'}],
  insert: ['link', 'image', 'video'],
  size: [{size: ['small', false, 'large', 'huge']}],
  clean: ['clean']
}

type ToolbarOption = keyof typeof options

const defaultOptions: ToolbarOption[] = [
  'header',
  'decoration',
  'align',
  'insert'
]

/**
 * The Rich text editor component properties.
 */
export interface RichTextEditorProps extends ReactQuill.ReactQuillProps {
  /**
   * The initial value for editor.
   */
  initialValue?: string
  /**
   * The CSS class name.
   */
  className?: string
  /**
   * Triggered after content changed.
   */
  onChange: (value?: string) => void
  /**
   * Groups of buttons to be displayed on the toolbar.
   */
  toolbarOptions?: ToolbarOption[]
  /**
   * The label for component.
   */
  label?: string
}

const editorStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1
}

const RichTextEditor = ({initialValue, onChange, label, style, toolbarOptions, placeholder, ...props}: RichTextEditorProps) => {
  const [value, setValue] = useState()
  const [key, setKey] = useState(uniqueId())
  const handleChange: ReactQuill.ReactQuillProps['onChange'] = useCallback((value, delta, source, editor) => {
    setValue(value)
    const content = editor.getContents()
    onChange(content)
  }, [onChange])

  useEffect(() => {
    setKey(uniqueId())
  }, [placeholder, toolbarOptions])

  const modules = useMemo(() => ({
    toolbar: toolbarOptions?.map(option => options[option])
  }), [toolbarOptions])

  return <RsLabeledInput style={style}>
    <RsRtlLabel>{label}</RsRtlLabel>
    <ReactQuill key={key}
                defaultValue={initialValue}
                value={value}
                onChange={handleChange}
                modules={modules}
                placeholder={placeholder}
                style={{
                  ...editorStyle,
                  ...style
                }}
                {...props}
    />
  </RsLabeledInput>
}

export const richTextEditor = define(RichTextEditor, 'RichTextEditor')
  .name('Rich text editor')
  .category('fields')
  .props({
    initialValue: string.valued,
    label: string.default('Rich text editor'),
    placeholder: string,
    readOnly: boolean.default(false),
    toolbarOptions: someOf(...Object.keys(options)).withEditorProps({
      creatable: false
    }).default(defaultOptions),
    onChange: event
  })
