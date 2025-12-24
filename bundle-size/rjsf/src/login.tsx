import Form from '@rjsf/core'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './login-form.tsx'

import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App formComponent={Form} />
  </StrictMode>
)
