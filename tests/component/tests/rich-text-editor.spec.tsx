import {defaultRichTextFeatureFlags, richTextModel} from '@react-form-builder/components-rich-text'
import {type ComponentData, createView} from '@react-form-builder/core'
import {waitFor} from '@testing-library/react'
import {Quill} from 'react-quill-new'
import {
  applyFeaturesToModules,
  applyFeatureToModules,
  featureStateFromModules,
  formatsFromModules,
  modulesFromFeatureFlags,
  type RichTextFeature,
} from '../../../packages/views/rich-text/src/richTextFeatures'
import {asyncAct} from '../../common/lib/asyncAct'
import {renderViewerForm} from '../util/renderViewerForm'

const richTextView = createView([richTextModel])

const videoHtml = '<iframe class="ql-video" src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>'

function modulesFor(features: readonly RichTextFeature[], existing?: Record<string, unknown>) {
  return applyFeaturesToModules(new Set(features), existing)
}

function richTextForm(
  props: Record<string, {value: unknown}> = {},
  schema?: {validations: Array<{key: string; args?: Record<string, unknown>}>}
) {
  return {
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'editor',
          type: 'RichTextEditor',
          props: {
            label: {value: 'Editor'},
            ...props,
          },
          ...(schema ? {schema} : {}),
        },
      ],
    },
    localization: {},
    languages: [
      {
        code: 'en',
        dialect: 'US',
        name: 'English',
        description: 'American English',
        bidi: 'ltr',
      },
    ],
    defaultLanguage: 'en-US',
  }
}

async function renderEditor(
  props?: Record<string, {value: unknown}>,
  schema?: {validations: Array<{key: string; args?: Record<string, unknown>}>}
) {
  const result = renderViewerForm(richTextView, richTextForm(props, schema))
  await waitFor(() => {
    expect(result.container.querySelector('.ql-container')).not.toBeNull()
  })
  return {...result, formData: result.formData as unknown as ComponentData}
}

function toolbarButton(container: HTMLElement, format: string) {
  return container.querySelector(`button.ql-${format}`)
}

function getQuill(container: HTMLElement) {
  const node = container.querySelector('.ql-container')
  const editor = node ? Quill.find(node) : null
  if (!editor || typeof (editor as Quill).clipboard?.convert !== 'function') {
    throw new Error('Quill editor was not initialized')
  }
  return editor as Quill
}

function hasEmbed(delta: {ops?: Array<{insert?: unknown}>}, name: string) {
  return (delta.ops ?? []).some(op => {
    return typeof op.insert === 'object' && op.insert !== null && name in op.insert
  })
}

function hasBoldShortcut(quill: Quill) {
  const bindings = (quill.keyboard as {bindings?: Record<string, unknown[]>}).bindings
  return Boolean(bindings?.b?.length)
}

describe('RichTextEditor features', () => {
  it('does not persist a separate features property', async () => {
    const {formData} = await renderEditor()
    const editor = formData.findByKey('editor')
    if (!editor) throw new Error('Rich text editor was not found')

    expect(editor.store.props.features).toBeUndefined()
  })

  describe.each([{useSemanticHTML: true}, {useSemanticHTML: false}])('useSemanticHTML=$useSemanticHTML', ({useSemanticHTML}) => {
    it('clears editor contents and form data when the form is cleared', async () => {
      const {container, formData} = await renderEditor({
        initialValue: {value: '<p>seed</p>'},
        useSemanticHTML: {value: useSemanticHTML},
      })
      const quill = getQuill(container)

      await asyncAct(async () => {
        quill.insertText(0, 'hello')
      })
      await waitFor(() => {
        expect(formData.data.editor).toEqual(expect.stringContaining('hello'))
      })

      await asyncAct(async () => formData.clear())

      await waitFor(() => {
        expect(formData.data.editor).toBeUndefined()
        expect(getQuill(container).getText().trim()).toBe('')
        expect(container.querySelector('.ql-editor')?.textContent?.trim()).toBe('')
      })
    })

    it('stores undefined when the editor is emptied', async () => {
      const {container, formData} = await renderEditor({
        useSemanticHTML: {value: useSemanticHTML},
      })
      const quill = getQuill(container)

      await asyncAct(async () => {
        quill.insertText(0, 'hello')
      })
      await waitFor(() => {
        expect(formData.data.editor).toEqual(expect.stringContaining('hello'))
      })

      await asyncAct(async () => {
        quill.deleteText(0, quill.getLength())
      })

      await waitFor(() => {
        expect(formData.data.editor).toBeUndefined()
        expect(getQuill(container).getText().trim()).toBe('')
      })
    })

    it('keeps an empty editor undefined so required validation can fail', async () => {
      const {container, formData} = await renderEditor(
        {useSemanticHTML: {value: useSemanticHTML}},
        {validations: [{key: 'required', args: {message: 'Editor is required'}}]}
      )

      await waitFor(() => {
        expect(formData.data.editor).toBeUndefined()
      })

      await asyncAct(async () => formData.validate())

      await waitFor(() => {
        expect(formData.errors.editor).toBe('Editor is required')
        const label = container.querySelector('label')
        const fieldId = label?.getAttribute('for')
        const field = container.querySelector(`*[id="${fieldId}"]`)
        const errorId = field?.getAttribute('aria-errormessage')
        expect(errorId).toBeTruthy()
        expect(container.querySelector(`*[id="${errorId}"]`)).not.toBeNull()
      })
    })
  })

  it('keeps video, formula, link, and keyboard shortcuts fully off by default', async () => {
    const {container} = await renderEditor()
    const quill = getQuill(container)

    expect(toolbarButton(container, 'video')).not.toBeInTheDocument()
    expect(toolbarButton(container, 'formula')).not.toBeInTheDocument()
    expect(toolbarButton(container, 'link')).not.toBeInTheDocument()
    expect(quill.scroll.query('video')).toBeNull()
    expect(quill.scroll.query('formula')).toBeNull()
    expect(quill.scroll.query('link')).toBeNull()
    expect(hasEmbed(quill.clipboard.convert({html: videoHtml}), 'video')).toBe(false)
    expect(hasBoldShortcut(quill)).toBe(false)
  })

  it('keeps inline formatting, blocks, image, and undo/redo fully on by default', async () => {
    const {container} = await renderEditor()
    const quill = getQuill(container)

    expect(toolbarButton(container, 'bold')).toBeInTheDocument()
    expect(toolbarButton(container, 'italic')).toBeInTheDocument()
    expect(toolbarButton(container, 'blockquote')).toBeInTheDocument()
    expect(toolbarButton(container, 'image')).toBeInTheDocument()
    expect(container.querySelector('.ql-header')).not.toBeNull()
    expect(quill.scroll.query('bold')).not.toBeNull()
    expect(quill.scroll.query('header')).not.toBeNull()
    expect(quill.scroll.query('image')).not.toBeNull()

    await asyncAct(async () => {
      quill.insertText(0, 'hello')
    })
    expect(quill.history.stack.undo.length).toBeGreaterThan(0)
  })

  it('turns an enabled feature group fully on, including format and toolbar', async () => {
    const {container} = await renderEditor({
      modules: {value: modulesFromFeatureFlags({...defaultRichTextFeatureFlags, video: true, link: true})},
    })
    const quill = getQuill(container)

    expect(toolbarButton(container, 'video')).toBeInTheDocument()
    expect(toolbarButton(container, 'link')).toBeInTheDocument()
    expect(quill.scroll.query('video')).not.toBeNull()
    expect(quill.scroll.query('link')).not.toBeNull()
    expect(hasEmbed(quill.clipboard.convert({html: videoHtml}), 'video')).toBe(true)
  })

  it('turns unselected feature groups fully off', async () => {
    const {container} = await renderEditor({
      modules: {value: modulesFor(['inlineFormatting'])},
    })
    const quill = getQuill(container)

    expect(toolbarButton(container, 'bold')).toBeInTheDocument()
    expect(toolbarButton(container, 'italic')).toBeInTheDocument()
    expect(toolbarButton(container, 'blockquote')).not.toBeInTheDocument()
    expect(toolbarButton(container, 'image')).not.toBeInTheDocument()
    expect(toolbarButton(container, 'video')).not.toBeInTheDocument()
    expect(container.querySelector('.ql-header')).toBeNull()
    expect(quill.scroll.query('bold')).not.toBeNull()
    expect(quill.scroll.query('italic')).not.toBeNull()
    expect(quill.scroll.query('header')).toBeNull()
    expect(quill.scroll.query('image')).toBeNull()
    expect(quill.scroll.query('video')).toBeNull()
    expect(hasEmbed(quill.clipboard.convert({html: videoHtml}), 'video')).toBe(false)

    await asyncAct(async () => {
      quill.insertText(0, 'hello')
    })
    expect(quill.history.stack.undo).toHaveLength(0)

    await asyncAct(async () => {
      quill.insertText(0, 'hello', 'bold', true)
    })
    expect(quill.getFormat(0, 5)).toMatchObject({bold: true})

    await asyncAct(async () => {
      quill.formatText(0, 5, 'italic', true)
    })
    expect(quill.getFormat(0, 5)).toMatchObject({italic: true})

    await asyncAct(async () => {
      quill.formatText(0, 5, 'blockquote', true)
    })
    expect(quill.getFormat(0, 5).blockquote).toBeFalsy()
  })

  it('enables keyboard shortcuts only when that feature group is selected', async () => {
    const {container} = await renderEditor({
      modules: {value: modulesFromFeatureFlags({...defaultRichTextFeatureFlags, keyboardShortcuts: true})},
    })
    const quill = getQuill(container)

    expect(hasBoldShortcut(quill)).toBe(true)
  })

  it('reads configuration from the stored modules blob', async () => {
    const {container} = await renderEditor({
      modules: {
        value: {
          toolbar: [['bold', 'italic', 'underline', 'strike']],
          keyboard: {bindings: {bold: false, italic: false, underline: false}},
        },
      },
    })
    const quill = getQuill(container)

    expect(toolbarButton(container, 'bold')).toBeInTheDocument()
    expect(toolbarButton(container, 'image')).not.toBeInTheDocument()
    expect(toolbarButton(container, 'blockquote')).not.toBeInTheDocument()
    expect(quill.scroll.query('image')).toBeNull()
    expect(quill.scroll.query('header')).toBeNull()
  })
})

const handwrittenExtras = {
  clipboard: {matchVisual: false},
  syntax: {interval: 1000, languages: ['javascript', 'html']},
  mention: {mentionDenotationChars: ['@', '#'] as string[], minChars: 1},
  imageResize: {modules: ['Resize', 'DisplaySize']},
}

const handwrittenToolbar = [['bold', 'italic', 'underline', 'strike'], ['image']]

const handwrittenModules = {
  toolbar: handwrittenToolbar,
  history: {delay: 1500, maxStack: 50, userOnly: true},
  ...handwrittenExtras,
}

const quillSafeHandwrittenModules = {
  toolbar: handwrittenToolbar,
  clipboard: handwrittenExtras.clipboard,
  history: {delay: 1500, maxStack: 50, userOnly: true},
}

function storedModules(formData: ComponentData) {
  const editor = formData.findByKey('editor')
  if (!editor) throw new Error('Rich text editor was not found')
  return editor.store.props.modules?.value as Record<string, unknown>
}

async function writeEditorModules(formData: ComponentData, modules: Record<string, unknown>) {
  const editor = formData.findByKey('editor')
  if (!editor) throw new Error('Rich text editor was not found')
  await asyncAct(async () => {
    editor.store.props.modules = {value: modules}
  })
}

describe('RichTextEditor handwritten modules merge', () => {
  it('keeps extra module keys when one feature checkbox is toggled', () => {
    const merged = applyFeatureToModules('video', true, handwrittenModules)

    expect(merged.clipboard).toEqual(handwrittenExtras.clipboard)
    expect(merged.syntax).toEqual(handwrittenExtras.syntax)
    expect(merged.mention).toEqual(handwrittenExtras.mention)
    expect(merged.imageResize).toEqual(handwrittenExtras.imageResize)
    expect(JSON.stringify(merged.toolbar)).toContain('video')
    expect(JSON.stringify(merged.toolbar)).toContain('image')
    expect(JSON.stringify(merged.toolbar)).toContain('bold')
    expect(JSON.stringify(merged.toolbar)).not.toContain('blockquote')
  })

  it('keeps handwritten toolbar handlers when rewriting the feature toolbar', () => {
    const merged = applyFeatureToModules('video', true, {
      toolbar: {
        container: handwrittenToolbar,
        handlers: {image: 'customImage'},
      },
      ...handwrittenExtras,
    })

    expect(merged.toolbar).toMatchObject({handlers: {image: 'customImage'}})
    const toolbarContainer = (merged.toolbar as {container: unknown}).container
    expect(JSON.stringify(toolbarContainer)).toContain('video')
    expect(JSON.stringify(toolbarContainer)).toContain('"image"')
    expect(merged.clipboard).toEqual(handwrittenExtras.clipboard)
  })

  it('keeps handwritten history options when undo/redo stays enabled', () => {
    const merged = applyFeatureToModules('inlineFormatting', true, handwrittenModules)

    expect(merged.history).toEqual(handwrittenModules.history)
    expect(merged.mention).toEqual(handwrittenExtras.mention)
  })

  it('keeps extra keyboard keys when shortcuts are turned off', () => {
    const merged = applyFeatureToModules('keyboardShortcuts', false, {keyboard: {bindings: {tab: 'custom'}, delay: 1}})

    expect(merged.keyboard).toEqual({
      bindings: {bold: false, italic: false, underline: false},
      delay: 1,
    })
  })

  it('marks a format group as partial when the JSON toolbar has only some of its controls', () => {
    const modules = {toolbar: [['bold'], ['image']]}

    expect(featureStateFromModules(modules, 'inlineFormatting')).toBe('partial')
    expect(featureStateFromModules(modules, 'image')).toBe('on')
    expect(featureStateFromModules(modules, 'video')).toBe('off')
    expect(formatsFromModules(modules)).toEqual(['bold', 'image'])
  })

  it('marks keyboard shortcuts as partial when only some bindings are disabled', () => {
    expect(featureStateFromModules({keyboard: {bindings: {bold: false}}}, 'keyboardShortcuts')).toBe('partial')
  })

  it('merges a checkbox change into stored modules without completing a partial group', async () => {
    const {container, formData} = await renderEditor({
      modules: {value: quillSafeHandwrittenModules},
    })

    expect(featureStateFromModules(storedModules(formData), 'inlineFormatting')).toBe('partial')
    expect(toolbarButton(container, 'image')).toBeInTheDocument()
    expect(toolbarButton(container, 'video')).not.toBeInTheDocument()

    await writeEditorModules(formData, applyFeatureToModules('video', true, storedModules(formData)))

    expect(storedModules(formData)).toEqual(
      expect.objectContaining({
        clipboard: handwrittenExtras.clipboard,
        history: quillSafeHandwrittenModules.history,
      })
    )
    expect(featureStateFromModules(storedModules(formData), 'inlineFormatting')).toBe('partial')
    expect(JSON.stringify(storedModules(formData).toolbar)).toContain('video')
    expect(JSON.stringify(storedModules(formData).toolbar)).not.toContain('blockquote')
    expect(toolbarButton(container, 'video')).toBeInTheDocument()
    expect(toolbarButton(container, 'image')).toBeInTheDocument()
    expect(toolbarButton(container, 'bold')).toBeInTheDocument()

    await writeEditorModules(formData, applyFeatureToModules('image', false, storedModules(formData)))

    expect(storedModules(formData)).toEqual(
      expect.objectContaining({
        clipboard: handwrittenExtras.clipboard,
        history: quillSafeHandwrittenModules.history,
      })
    )
    expect(JSON.stringify(storedModules(formData).toolbar)).not.toContain('image')
    expect(toolbarButton(container, 'image')).not.toBeInTheDocument()
    expect(toolbarButton(container, 'bold')).toBeInTheDocument()
    expect(getQuill(container).scroll.query('image')).toBeNull()
  })
})
