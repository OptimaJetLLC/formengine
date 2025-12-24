import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RjsfApp} from './RjsfApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RjsfApp />
  </StrictMode>,
)
