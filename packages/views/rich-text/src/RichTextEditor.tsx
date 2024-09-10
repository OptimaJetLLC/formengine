import {boolean, define, event, object, someOf, string} from '@react-form-builder/core'
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
   * The initial value for the editor.
   */
  initialValue?: string
  /**
   * The CSS class name.
   */
  className?: string
  /**
   * Triggered after the content changed.
   */
  onChange: (value?: string) => void
  /**
   * Groups of buttons to be displayed on the toolbar.
   */
  toolbarOptions?: ToolbarOption[]
  /**
   * Allows to customize the behavior and functionality of the editor.
   */
  modules?: Record<string, unknown>
  /**
   * The label for the component.
   */
  label?: string
}

const editorStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1
}

const RichTextEditor = ({
// The value is extracted and not used so that the editor is uncontrolled.
                          value,
                          initialValue,
                          onChange,
                          label,
                          style,
                          toolbarOptions,
                          placeholder,
                          modules: customModules,
                          ...props
                        }: RichTextEditorProps) => {
  const [key, setKey] = useState(uniqueId())

  const plainInitialValue = useMemo(() => {
    if (!initialValue) return initialValue
    return JSON.parse(JSON.stringify(initialValue))
  }, [initialValue])

  const handleChange: ReactQuill.ReactQuillProps['onChange'] = useCallback((value, delta, source, editor) => {
    const content = editor.getContents()
    onChange(content)
  }, [onChange])

  useEffect(() => {
    setKey(uniqueId())
  }, [placeholder, toolbarOptions, customModules, plainInitialValue])

  const modules = useMemo(() => ({
    toolbar: toolbarOptions?.map(option => options[option]),
    ...(customModules ?? {})
  }), [customModules, toolbarOptions])

  return <RsLabeledInput style={style}>
    <RsRtlLabel>{label}</RsRtlLabel>
    <ReactQuill key={key}
                defaultValue={plainInitialValue}
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
    value: object.valued.hideEditor(),
    initialValue: object,
    label: string.default('Rich text editor'),
    placeholder: string,
    readOnly: boolean.default(false),
    toolbarOptions: someOf(...Object.keys(options)).withEditorProps({
      creatable: false
    }).default(defaultOptions),
    modules: object,
    onChange: event
  })
