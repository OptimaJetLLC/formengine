import {StrictMode} from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'
import {BundleSizeApp} from './BundleSizeApp'

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <BundleSizeApp />
  </StrictMode>
)
