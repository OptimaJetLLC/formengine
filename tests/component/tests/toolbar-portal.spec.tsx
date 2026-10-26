import {act, fireEvent, waitFor} from '@testing-library/react'
import {openToolbarActions} from '../util/openToolbarActions'
import {renderBuilder} from '../util/renderBuilder'

const firstForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'firstField',
        type: 'RsInput',
        props: {},
      },
    ],
  },
}

const secondForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'secondField',
        type: 'RsInput',
        props: {},
      },
    ],
  },
}

const toolbar = () => document.querySelector<HTMLElement>('[data-fe-toolbar]')

const selectAndScrollAnchor = async (findByTestId: (id: string) => Promise<HTMLElement>, rect: DOMRect) => {
  const wrapper = await findByTestId('firstField-editable-wrapper')
  fireEvent.click(wrapper)
  await waitFor(() => expect(toolbar()?.getAttribute('aria-hidden')).toBe('false'))

  const anchor = wrapper.firstElementChild
  if (!(anchor instanceof HTMLElement)) throw new Error('Missing toolbar anchor')
  vi.spyOn(anchor, 'getBoundingClientRect').mockReturnValue(rect)
  fireEvent.scroll(window)
  await waitFor(() => expect(toolbar()?.getAttribute('aria-hidden')).toBe('false'))
}

const removeViaToolbar = async (findByTestId: (id: string) => Promise<HTMLElement>) => {
  await openToolbarActions()
  fireEvent.click(await findByTestId('toolbar-remove-button'))
}

describe('Component toolbar', () => {
  it('removes the previous form toolbar after parseForm', async () => {
    const {findByTestId, getFormBuilder, queryByTestId} = await renderBuilder(firstForm)

    fireEvent.click(await findByTestId('firstField-editable-wrapper'))
    await waitFor(() => expect(toolbar()?.getAttribute('aria-hidden')).toBe('false'))

    act(() => {
      getFormBuilder()?.parseForm(JSON.stringify(secondForm))
    })

    await waitFor(() => {
      expect(queryByTestId('firstField-editable-wrapper')).not.toBeInTheDocument()
      expect(queryByTestId('secondField-editable-wrapper')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(toolbar()).toBeNull()
    })
  })

  it('keeps toolbar actions usable when the reference is scrolled above the viewport', async () => {
    const {findByTestId, queryByTestId} = await renderBuilder(firstForm)

    await selectAndScrollAnchor(findByTestId, new DOMRect(0, -400, 120, 24))
    await removeViaToolbar(findByTestId)

    await waitFor(() => expect(queryByTestId('firstField-editable-wrapper')).not.toBeInTheDocument())
  })

  it('keeps toolbar actions usable when the reference is scrolled past the left edge', async () => {
    const {findByTestId, queryByTestId} = await renderBuilder(firstForm)

    await selectAndScrollAnchor(findByTestId, new DOMRect(-200, 80, 120, 24))
    await removeViaToolbar(findByTestId)

    await waitFor(() => expect(queryByTestId('firstField-editable-wrapper')).not.toBeInTheDocument())
  })
})
