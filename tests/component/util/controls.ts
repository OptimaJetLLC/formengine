import {wait} from '@react-form-builder/tests-common/lib/utils'
import {fireEvent, RenderResult} from '@testing-library/react'

export const selectDropDownOption = async <T extends HTMLElement>(rendered: RenderResult, dropdown: T, byValue: string): Promise<void> => {
  fireEvent.click(dropdown)
  await wait(100)
  const option = rendered.getByRole('option', {name: byValue})
  fireEvent.click(option)
  await wait(100)
  fireEvent.mouseDown(document)
  await wait(100)
}
