import {boolean, define, event, object, readOnly, string} from '@react-form-builder/core'
import type {CSSProperties} from 'react'
import {useCallback, useMemo, useState} from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import './styles.css'
import {Labeled} from './Labeled'
import type {RichTextFeature, RichTextFeatureFlags} from './richTextFeatures'
import {
  applyFeatureToModules,
  defaultRichTextModules,
  featureStateFromModules,
  formatsFromModules,
  isModulesRecord,
  modulesFromFeatureFlags,
  richTextFeatureNames,
} from './richTextFeatures'

/**
 * The Rich text editor component properties.
 */
export interface RichTextEditorProps extends Omit<ReactQuill.ReactQuillProps, 'modules' | 'formats'> {
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
   * Feature flags. Each key fully enables or disables format, toolbar, and module for that group.
   */
  features?: RichTextFeatureFlags
  /**
   * If true, stores Quill semantic HTML instead of the editor DOM HTML.
   */
  useSemanticHTML?: boolean
  /**
   * The label for the component.
   */
  label?: string
  /**
   * Test id applied to the labeled wrapper. ReactQuill does not forward this attribute.
   */
  'data-testid'?: string
}

interface RichTextEditorRuntimeProps extends RichTextEditorProps {
  /**
   * Stored Quill modules. Designer JSON; not part of the public wrapper API.
   */
  modules?: Record<string, unknown>
}

const editorStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
}

const QUILL_EMPTY_DOM_HTML = '<p><br></p>'
const QUILL_EMPTY_SEMANTIC_HTML = '<p></p>'

function isQuillEmptyHtml(html: string): boolean {
  return html === QUILL_EMPTY_DOM_HTML || html === QUILL_EMPTY_SEMANTIC_HTML
}

function emptyQuillHtml(useSemanticHTML: boolean): string {
  return useSemanticHTML ? QUILL_EMPTY_SEMANTIC_HTML : QUILL_EMPTY_DOM_HTML
}

const RichTextEditor = ({
  value,
  initialValue,
  label,
  style,
  features,
  modules,
  useSemanticHTML = true,
  placeholder,
  className,
  onChange,
  'data-testid': dataTestId,
  ...props
}: RichTextEditorRuntimeProps) => {
  const [hadBoundValue, setHadBoundValue] = useState(() => value !== undefined)
  const emptyHtml = emptyQuillHtml(useSemanticHTML)
  const quillValue = value !== undefined ? value : hadBoundValue ? emptyHtml : (initialValue ?? emptyHtml)

  const resolvedModules = useMemo(() => {
    if (isModulesRecord(modules)) return modules
    if (features) return modulesFromFeatureFlags(features)
    return defaultRichTextModules
  }, [features, modules])
  const formats = useMemo(() => formatsFromModules(resolvedModules), [resolvedModules])
  const modulesKey = useMemo(() => JSON.stringify(resolvedModules), [resolvedModules])
  const quillMountKey = useMemo(
    () => [modulesKey, initialValue, placeholder, useSemanticHTML].join('\0'),
    [modulesKey, initialValue, placeholder, useSemanticHTML]
  )

  const mergedStyle = useMemo(() => ({...editorStyle, ...style}), [style])

  const handleChange = useCallback(
    (nextValue: string) => {
      const adjustedValue = isQuillEmptyHtml(nextValue) ? undefined : nextValue
      if (adjustedValue !== undefined) setHadBoundValue(true)
      if (adjustedValue === value) return
      onChange?.(adjustedValue)
    },
    [onChange, value]
  )

  // div wrapper is needed because the Labeled wrapper applies attributes to the child, but the ReactQuill component does not accept this props.
  return (
    <Labeled label={label} style={style} className={className} data-testid={dataTestId}>
      <div>
        <ReactQuill
          key={quillMountKey}
          {...props}
          value={quillValue}
          placeholder={placeholder}
          style={mergedStyle}
          onChange={handleChange}
          modules={resolvedModules}
          formats={formats}
          useSemanticHTML={useSemanticHTML}
        />
      </div>
    </Labeled>
  )
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
    modules: object.default(defaultRichTextModules).setup({
      editor: 'richTextModules',
      editorProps: {
        featureNames: richTextFeatureNames,
        applyFeatureToModules,
        featureStateFromModules,
      },
    }),
    useSemanticHTML: boolean.default(true),
    onChange: event,
  })

export type {RichTextFeature, RichTextFeatureFlags}
