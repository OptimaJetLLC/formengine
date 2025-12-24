import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SurveyComponent from './SurveyComponent'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SurveyComponent />
  </StrictMode>,
)
