import {define, event, object, readOnly, someOf, string} from '@react-form-builder/core'
import {uniqueId} from 'lodash-es'
import type {CSSProperties} from 'react'
import {useEffect, useMemo, useRef, useState} from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import './styles.css'
import {Labeled} from './Labeled'

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
                          value,
                          initialValue,
                          label,
                          style,
                          toolbarOptions,
                          placeholder,
                          className,
                          modules: customModules,
                          ...props
                        }: RichTextEditorProps) => {
  const [key, setKey] = useState(uniqueId())
  const valueRef = useRef(value)
  valueRef.current = value

  const plainInitialValue = useMemo(() => {
    // we want to trigger the useEffect only when the initialValue changes
    return valueRef.current ?? initialValue
  }, [initialValue])

  useEffect(() => {
    setKey(uniqueId())
  }, [placeholder, toolbarOptions, customModules, initialValue])

  const modules = useMemo(() => ({
    toolbar: toolbarOptions?.map(option => options[option]),
    ...(customModules ?? {})
  }), [customModules, toolbarOptions])

  const mergedStyle = useMemo(() => ({...editorStyle, ...style}), [style])

  // div wrapper is needed because the Labeled wrapper applies attributes to the child, but the ReactQuill component does not accept this props.
  return <Labeled label={label} style={style} className={className}>
    <div>
      <ReactQuill key={key}
                  defaultValue={plainInitialValue}
                  modules={modules}
                  placeholder={placeholder}
                  style={mergedStyle}
                  {...props}
      />
    </div>
  </Labeled>
}

export const richTextEditor = define(RichTextEditor, 'RichTextEditor')
  .name('Rich text editor')
  .category('fields')
  .props({
    value: string.valued.hideEditor(),
    initialValue: string,
    label: string.default('Rich text editor'),
    placeholder: string,
    readOnly: readOnly.default(false),
    toolbarOptions: someOf(...Object.keys(options)).withEditorProps({
      creatable: false
    }).default(defaultOptions),
    modules: object,
    onChange: event
  })
