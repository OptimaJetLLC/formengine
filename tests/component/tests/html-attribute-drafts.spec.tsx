import {type ComponentData} from '@react-form-builder/core'
import {act, fireEvent, within} from '@testing-library/react'
import {describe, expect, it, onTestFinished, vi} from 'vitest'
import {selectDropDownOption} from '../util/controls'
import {renderBuilder} from '../util/renderBuilder'

type BuilderApp = Awaited<ReturnType<typeof renderBuilder>>
type BuilderUndoer = {undo: () => void; hasUndo: boolean}

const getUndoer = (app: BuilderApp) => {
  const builder = app.getFormBuilder() as {builderStore: {undoer: BuilderUndoer}} | null
  if (!builder) throw new Error('Form builder is not available')
  return builder.builderStore.undoer
}

const savedAttribute = {name: 'title', value: 'Saved title'}
const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {key: 'first', type: 'RsInput', htmlAttributes: [savedAttribute]},
      {key: 'second', type: 'RsInput'},
      {key: 'third', type: 'RsInput'},
    ],
  },
}

const firstAttributes = (app: BuilderApp) => JSON.parse(app.getFormBuilder()!.formAsString).form.children[0].htmlAttributes

const firstCanvasInput = (app: BuilderApp) => within(app.getByTestId('first-editable-wrapper')).getByRole('textbox')

const firstStore = (app: BuilderApp) => (app.getFormData() as ComponentData).findByKey('first')!.store

const openFirstEditor = async (app: BuilderApp) => {
  const first = await app.findByTestId('first-editable-wrapper')
  await act(async () => {
    fireEvent.click(first)
  })
  return (await app.findByTestId('htmlAttributes-labeled-wrapper')).parentElement!
}

const clickApply = async (editor: HTMLElement) => {
  await act(async () => {
    fireEvent.click(within(editor).getByRole('button', {name: 'Apply'}))
  })
}

const switchTo = async (app: BuilderApp, key: 'first' | 'second' | 'third') => {
  const target = await app.findByTestId(`${key}-editable-wrapper`)
  await act(async () => {
    fireEvent.click(target)
  })
}

/** BuilderUndoer debounces form snapshots by 1s before they enter the undo stack. */
const flushUndoDebounce = async () => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1000)
  })
}

describe('HTML attribute drafts', () => {
  it('discards edits to existing rows when switching components without Apply', async () => {
    const app = await renderBuilder(form)
    const second = await app.findByTestId('second-editable-wrapper')
    const editor = await openFirstEditor(app)

    expect(firstCanvasInput(app)).toHaveAttribute('title', 'Saved title')

    await act(async () => {
      fireEvent.change(within(editor).getByDisplayValue('Saved title'), {target: {value: 'Unsaved title'}})
    })

    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Saved title'}])
    expect(firstCanvasInput(app)).toHaveAttribute('title', 'Saved title')
    expect(within(editor).getByRole('button', {name: 'Apply'})).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(second)
    })
    await act(async () => {
      fireEvent.click(await app.findByTestId('first-editable-wrapper'))
    })

    expect(within(editor).getByDisplayValue('Saved title')).toBeInTheDocument()
    expect(within(editor).queryByRole('button', {name: 'Apply'})).not.toBeInTheDocument()
    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Saved title'}])
    expect(firstCanvasInput(app)).toHaveAttribute('title', 'Saved title')
  })

  it('discards name edits when switching components without Apply', async () => {
    const app = await renderBuilder(form)
    const editor = await openFirstEditor(app)
    const namePicker = within(editor).getByTestId('picker-describe').closest('.rs-picker') as HTMLElement

    await selectDropDownOption(app, namePicker, 'about')

    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Saved title'}])
    expect(firstCanvasInput(app)).toHaveAttribute('title', 'Saved title')
    expect(within(editor).getByRole('button', {name: 'Apply'})).toBeInTheDocument()
    expect(within(editor).getByTestId('picker-describe')).toHaveTextContent('about')

    await switchTo(app, 'second')
    await switchTo(app, 'first')

    expect(within(editor).getByTestId('picker-describe')).toHaveTextContent('title')
    expect(within(editor).queryByRole('button', {name: 'Apply'})).not.toBeInTheDocument()
    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Saved title'}])
  })

  it('discards row removal when switching components without Apply', async () => {
    const app = await renderBuilder(form)
    const editor = await openFirstEditor(app)

    await act(async () => {
      fireEvent.click(within(within(editor).getByRole('row', {name: /Saved title/})).getByRole('button'))
    })

    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Saved title'}])
    expect(firstCanvasInput(app)).toHaveAttribute('title', 'Saved title')
    expect(within(editor).getByRole('button', {name: 'Apply'})).toBeInTheDocument()
    expect(within(editor).queryByDisplayValue('Saved title')).not.toBeInTheDocument()

    await switchTo(app, 'second')
    await switchTo(app, 'first')

    expect(within(editor).getByDisplayValue('Saved title')).toBeInTheDocument()
    expect(within(editor).queryByRole('button', {name: 'Apply'})).not.toBeInTheDocument()
    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Saved title'}])
  })

  it('commits edits only with Apply and isolates later drafts from the saved rows', async () => {
    const app = await renderBuilder(form)
    const editor = await openFirstEditor(app)

    await act(async () => {
      fireEvent.change(within(editor).getByDisplayValue('Saved title'), {target: {value: 'Applied title'}})
    })
    await clickApply(editor)

    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Applied title'}])
    expect(firstCanvasInput(app)).toHaveAttribute('title', 'Applied title')
    expect(within(editor).queryByRole('button', {name: 'Apply'})).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.change(within(editor).getByDisplayValue('Applied title'), {target: {value: 'Another draft'}})
    })

    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Applied title'}])
    expect(firstCanvasInput(app)).toHaveAttribute('title', 'Applied title')
    await switchTo(app, 'second')
    await switchTo(app, 'first')
    expect(within(editor).getByDisplayValue('Applied title')).toBeInTheDocument()
  })

  it('isolates name drafts after Apply from the saved rows', async () => {
    const app = await renderBuilder(form)
    const editor = await openFirstEditor(app)
    const namePicker = () => within(editor).getByTestId('picker-describe').closest('.rs-picker') as HTMLElement

    await selectDropDownOption(app, namePicker(), 'about')
    await clickApply(editor)

    expect(firstAttributes(app)).toEqual([{name: 'about', value: 'Saved title'}])
    expect(firstCanvasInput(app)).not.toHaveAttribute('title')
    expect(within(editor).queryByRole('button', {name: 'Apply'})).not.toBeInTheDocument()

    await selectDropDownOption(app, namePicker(), 'abbr')

    expect(firstAttributes(app)).toEqual([{name: 'about', value: 'Saved title'}])
    expect(within(editor).getByTestId('picker-describe')).toHaveTextContent('abbr')
    await switchTo(app, 'second')
    await switchTo(app, 'first')
    expect(within(editor).getByTestId('picker-describe')).toHaveTextContent('about')
  })

  it('keeps a draft when attributes are replaced externally on the same component', async () => {
    const app = await renderBuilder(form)
    const editor = await openFirstEditor(app)

    await act(async () => {
      fireEvent.change(within(editor).getByDisplayValue('Saved title'), {target: {value: 'Draft title'}})
    })

    await act(async () => {
      firstStore(app).htmlAttributes = [{name: 'title', value: 'External title'}]
    })

    expect(within(editor).getByDisplayValue('Draft title')).toBeInTheDocument()
    expect(within(editor).getByRole('button', {name: 'Apply'})).toBeInTheDocument()
    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'External title'}])
    expect(firstCanvasInput(app)).toHaveAttribute('title', 'External title')
  })

  it('applies a kept draft over an external attribute replacement', async () => {
    const app = await renderBuilder(form)
    const editor = await openFirstEditor(app)

    await act(async () => {
      fireEvent.change(within(editor).getByDisplayValue('Saved title'), {target: {value: 'Draft title'}})
    })

    await act(async () => {
      firstStore(app).htmlAttributes = [{name: 'title', value: 'External title'}]
    })
    await clickApply(editor)

    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Draft title'}])
    expect(firstCanvasInput(app)).toHaveAttribute('title', 'Draft title')
    expect(within(editor).queryByRole('button', {name: 'Apply'})).not.toBeInTheDocument()
  })

  it('undo during a draft restores the previously applied form', async () => {
    const app = await renderBuilder(form)
    const editor = await openFirstEditor(app)

    // Load debounce was scheduled with real timers during mount; wait it out before faking.
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })

    // Testing Library drains promises with setTimeout(0), so keep those callbacks advancing.
    vi.useFakeTimers({toFake: ['setTimeout', 'clearTimeout'], shouldAdvanceTime: true})
    onTestFinished(() => {
      vi.useRealTimers()
    })

    await act(async () => {
      fireEvent.change(within(editor).getByDisplayValue('Saved title'), {target: {value: 'Applied title'}})
    })
    await clickApply(editor)
    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Applied title'}])
    expect(firstCanvasInput(app)).toHaveAttribute('title', 'Applied title')

    await flushUndoDebounce()
    expect(getUndoer(app).hasUndo).toBe(true)

    await act(async () => {
      fireEvent.change(within(editor).getByDisplayValue('Applied title'), {target: {value: 'Draft title'}})
    })
    expect(within(editor).getByRole('button', {name: 'Apply'})).toBeInTheDocument()
    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Applied title'}])

    await act(async () => {
      getUndoer(app).undo()
    })

    // Undo reparses the form and clears selection; the draft editor is discarded with the selection.
    expect(firstAttributes(app)).toEqual([{name: 'title', value: 'Saved title'}])
    expect(app.queryByTestId('htmlAttributes-labeled-wrapper')).not.toBeInTheDocument()
  })

  it('discards drafts when switching between components that both lack attributes', async () => {
    const app = await renderBuilder(form)
    await switchTo(app, 'second')
    const editor = (await app.findByTestId('htmlAttributes-labeled-wrapper')).parentElement!
    const addButton = within(editor)
      .getAllByRole('button')
      .find(button => button.className.includes('rs-btn-block'))!

    await act(async () => {
      fireEvent.click(addButton)
    })
    const valueInput = within(editor)
      .getAllByRole('textbox')
      .find(input => input.className.includes('rs-input'))!
    await act(async () => {
      fireEvent.change(valueInput, {target: {value: 'Unsaved value'}})
    })

    expect(within(editor).getByRole('button', {name: 'Apply'})).toBeInTheDocument()

    await switchTo(app, 'third')
    await switchTo(app, 'second')

    expect(within(editor).queryByDisplayValue('Unsaved value')).not.toBeInTheDocument()
    expect(within(editor).queryByRole('button', {name: 'Apply'})).not.toBeInTheDocument()
  })

  it('keeps other applied rows when removing one row without Apply', async () => {
    const app = await renderBuilder(form)
    const editor = await openFirstEditor(app)
    const addButton = within(editor)
      .getAllByRole('button')
      .find(button => button.className.includes('rs-btn-block'))!

    await act(async () => {
      fireEvent.click(addButton)
    })
    const namePicker = within(editor).getAllByTestId('picker-describe')[1].closest('.rs-picker') as HTMLElement
    await selectDropDownOption(app, namePicker, 'about')
    const valueInputs = within(editor)
      .getAllByRole('textbox')
      .filter(input => input.className.includes('rs-input'))
    await act(async () => {
      fireEvent.change(valueInputs[1], {target: {value: 'About text'}})
    })
    await clickApply(editor)

    expect(firstAttributes(app)).toEqual([
      {name: 'title', value: 'Saved title'},
      {name: 'about', value: 'About text'},
    ])

    await act(async () => {
      fireEvent.click(within(within(editor).getByRole('row', {name: /Saved title/})).getByRole('button'))
    })

    expect(firstAttributes(app)).toEqual([
      {name: 'title', value: 'Saved title'},
      {name: 'about', value: 'About text'},
    ])
    expect(firstCanvasInput(app)).toHaveAttribute('title', 'Saved title')
    expect(within(editor).getByRole('button', {name: 'Apply'})).toBeInTheDocument()

    await switchTo(app, 'second')
    await switchTo(app, 'first')

    expect(within(editor).getByDisplayValue('Saved title')).toBeInTheDocument()
    expect(within(editor).getByDisplayValue('About text')).toBeInTheDocument()
    expect(within(editor).queryByRole('button', {name: 'Apply'})).not.toBeInTheDocument()
  })
})
