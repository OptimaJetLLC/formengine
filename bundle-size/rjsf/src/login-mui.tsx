import Form from '@rjsf/mui'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './login-form.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App formComponent={Form} />
  </StrictMode>
)
