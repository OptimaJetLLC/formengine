import {fireEvent, RenderResult} from '@testing-library/react'

const previewButtonText = 'Preview'
const editButtonText = 'Edit'

/**
 * Switches to viewer mode by clicking the preview button.
 * @param findByText the function to find elements by text
 */
export const switchToViewerMode = async (findByText: RenderResult['findByText']) => {
  // ensure that the form is rendered
  const previewButton = await findByText(previewButtonText)
  expect(previewButton).toBeInTheDocument()

  fireEvent.click(previewButton)

  expect(await findByText(editButtonText)).toBeInTheDocument()
}

/**
 * Switches to designer mode by clicking the edit button.
 * @param findByText the function to find elements by text
 */
export const switchToDesignerMode = async (findByText: RenderResult['findByText']) => {
  // ensure that the form is rendered
  const editButton = await findByText(editButtonText)
  expect(editButton).toBeInTheDocument()

  fireEvent.click(editButton)

  expect(await findByText(previewButtonText)).toBeInTheDocument()
}
