import {fireEvent, RenderResult} from '@testing-library/react'
import {asyncAct} from '../asyncAct'

export const clickRun = async (app: RenderResult) => {
  const runButton = await app.findByText('Run')
  await asyncAct(async () => {
    fireEvent.click(runButton)
  })
}
