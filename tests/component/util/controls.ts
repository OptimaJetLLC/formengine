import {fireEvent, RenderResult, waitFor} from '@testing-library/react'

export const selectDropDownOption = async <T extends HTMLElement>(rendered: RenderResult, dropdown: T, byValue: string): Promise<void> => {
  fireEvent.click(dropdown)
  const option = await rendered.findByRole('option', {name: byValue})
  fireEvent.click(option)
  fireEvent.mouseDown(document)
  await waitFor(() => expect(rendered.queryAllByRole('option', {name: byValue})).toHaveLength(0))
}
