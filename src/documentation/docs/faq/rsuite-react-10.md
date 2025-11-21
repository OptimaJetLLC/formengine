---
sidebar_position: 40
title: Using Designer and rsuite components in React 19
description: How to use Designer and rsuite components in React 19
slug: /using-designer-and-rsuite-components-in-react-19
---

The Designer package and rsuite components package may not work correctly in React 19, for example, if you use webpack/rspack. You may
receive the following error:

```
Compiled with problems:
ERROR in ./node_modules/rsuite/esm/toaster/render.js 26:4-88
export '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED' (imported as 'ReactDOM') was not found in 'react-dom' (possible exports: __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, createPortal, flushSync, preconnect, prefetchDNS, preinit, preinitModule, preload, preloadModule, requestFormReset, unstable_batchedUpdates, useFormState, useFormStatus, version)
```

Related issues in rsuite's GitHub:

- https://github.com/rsuite/rsuite/issues/4382
- https://github.com/rsuite/rsuite/issues/4317

To fix the error, you need to define `CreateRootContextProvider` in your application. Here is an example of how to use it:

```tsx {11,13}
import React from 'react'
import {createRoot} from 'react-dom/client'
import {CreateRootContextProvider} from 'rsuite'
import App from './App'

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <CreateRootContextProvider value={createRoot}>
        <App/>
      </CreateRootContextProvider>
    </React.StrictMode>,
  );
}
```
