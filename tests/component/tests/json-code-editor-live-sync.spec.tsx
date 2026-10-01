import {fireEvent, render, screen} from '@testing-library/react'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {JsonInput} from '../../../packages/designer/src/features/annotation-editors/JsonInput'
import {JsonCode} from '../../../packages/designer/src/stores/BuilderStore'
import {toPrettyJsonString} from '../../../packages/designer/src/utils/toPrettyJsonString'

let mockBuilderStore: {
  currentEditable?: JsonCode
  editJsonCode: ReturnType<typeof vi.fn>
}

vi.mock('../../../packages/designer/src/utils/BuilderStoreContext', () => ({
  useBuilderStore: () => mockBuilderStore,
}))

describe('JSON editor live sync', () => {
  const onChange = vi.fn()
  const onClean = vi.fn()

  beforeEach(() => {
    onChange.mockReset()
    onClean.mockReset()
    mockBuilderStore = {
      currentEditable: undefined,
      editJsonCode: vi.fn(
        (editorKey: string, editorTitle: string, json: string, onSave: (value: string) => void, onValidate?: (value: string) => void) => {
          mockBuilderStore.currentEditable = new JsonCode(editorKey, editorTitle, json, onSave, onValidate)
        }
      ),
    }
  })

  it('replaces the open JSON snapshot when the opener value changes', () => {
    const {rerender} = render(
      <JsonInput editorKey="modules" editorTitle="richTextEditor1.Modules" value={{toolbar: []}} onChange={onChange} onClean={onClean} />
    )

    fireEvent.click(screen.getByRole('textbox'))

    expect(mockBuilderStore.editJsonCode).toHaveBeenCalledWith(
      'modules',
      'richTextEditor1.Modules',
      toPrettyJsonString({toolbar: []}, 2),
      onChange,
      undefined
    )

    rerender(
      <JsonInput
        editorKey="modules"
        editorTitle="richTextEditor1.Modules"
        value={{toolbar: ['bold']}}
        onChange={onChange}
        onClean={onClean}
      />
    )

    expect(mockBuilderStore.editJsonCode).toHaveBeenLastCalledWith(
      'modules',
      'richTextEditor1.Modules',
      toPrettyJsonString({toolbar: ['bold']}, 2),
      onChange,
      undefined
    )
  })

  it('keeps the snapshot when a different JSON editor is open', () => {
    mockBuilderStore.currentEditable = new JsonCode('other', 'otherEditor.Modules', '{}', vi.fn())

    const {rerender} = render(
      <JsonInput editorKey="modules" editorTitle="richTextEditor1.Modules[0]" value={{toolbar: []}} onChange={onChange} onClean={onClean} />
    )

    rerender(
      <JsonInput
        editorKey="modules"
        editorTitle="richTextEditor1.Modules[0]"
        value={{toolbar: ['bold']}}
        onChange={onChange}
        onClean={onClean}
      />
    )

    expect(mockBuilderStore.editJsonCode).not.toHaveBeenCalled()
  })
})
