import Form from '@rjsf/mui'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './booking-form.tsx'

import './booking.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App
      formComponent={Form}
      buttonClass="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary"
    />
  </StrictMode>
)
