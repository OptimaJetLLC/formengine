import Form from '@rjsf/core'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './booking-form.tsx'

import 'bootstrap/dist/css/bootstrap.min.css'

import './booking.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App formComponent={Form} buttonClass="btn btn-info" />
  </StrictMode>
)
