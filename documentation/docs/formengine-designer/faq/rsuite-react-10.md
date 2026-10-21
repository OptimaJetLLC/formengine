---
sidebar_position: 40
title: Using Designer and rsuite components in React 19
description: How to use Designer and rsuite components in React 19
slug: /formengine-designer/faq/using-designer-and-rsuite-components-in-react-19
---

RSuite 5.83.4 fixes the React 19 toaster build error that affected earlier releases when they were bundled with webpack or Rspack.
FormEngine uses RSuite 5.83.4. If your application installs RSuite separately, align it with the supported version:

```bash
npm install rsuite@5.83.4 --save-exact
```

The upstream bug is documented in [rsuite/rsuite#4382](https://github.com/rsuite/rsuite/issues/4382) and was fixed by
[rsuite/rsuite#4420](https://github.com/rsuite/rsuite/pull/4420).

## Workaround for earlier RSuite releases

If you cannot upgrade from RSuite 5.83.3 or earlier, webpack or Rspack may report this error:

```text
Compiled with problems:
ERROR in ./node_modules/rsuite/esm/toaster/render.js 26:4-88
export '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED' (imported as 'ReactDOM') was not found in 'react-dom' (possible exports: __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, createPortal, flushSync, preconnect, prefetchDNS, preinit, preinitModule, preload, preloadModule, requestFormReset, unstable_batchedUpdates, useFormState, useFormStatus, version)
```

Provide `CreateRootContextProvider` in your application as a temporary workaround:

```tsx {11,13}
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {CreateRootContextProvider} from 'rsuite'
import App from './App'

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = createRoot(rootEl)
  root.render(
    <StrictMode>
      <CreateRootContextProvider value={createRoot}>
        <App />
      </CreateRootContextProvider>
    </StrictMode>,
  )
}
```
