---
sidebar_position: 32
title: Usage with Remix
slug: /usage-with-remix
---

# Usage with Remix

The FormEngine is fully compatible with the latest versions of the [Remix](https://remix.run/).

:::tip

A fully functional example is available in our [GitHub repository](https://github.com/optimajet/formengine), specifically located in the
[examples](https://github.com/optimajet/formengine/tree/master/premium/examples/with-remix/with-remix-v2). We encourage you to explore the code to
see how the various components interact and work together seamlessly. If you have any questions or require further assistance, please don't
hesitate to reach out!

:::

## Code changes

Highlighted lines indicate the ones that need attention.

```js
// &att
var x = 42; // highlighted line of code

// &chg
var x = 42; // modified line of code

// &new
var x = 42; // added new line of code

// &del
var x = 42; // deleted line of code
```

## The setup

Currently, FormEngine does not support Server-Side Rendering (SSR). To disable SSR at the component level, place FormEngine-related
components in a `.client.tsx` file. Additionally, implement some form of dynamic loading. For example, you can use the following pattern:

```tsx title='viewer._index.tsx'
import {lazy, useEffect, useState} from 'react'

const ViewerClient = lazy(() => import('~/components/viewer.client.js'));

export default function Viewer_index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <ViewerClient/> : null;
}
```

## Troubleshooting

The default Remix setup does not support heterogeneous modules (ESM/CJS). If you need support for heterogeneous modules, try adding a
bootloader shim:

```json5 title='package.json'
{
  //...
  "scripts": {
    "build": "remix vite:build",
    // &del>
    "dev": "remix vite:dev",
    // <&del
    // &new>
    "dev": "NODE_OPTIONS=--import=specifier-resolution-node/register remix vite:dev",
    // <&new
    //...
    "devDependencies": {
      //...
      // &new>
      "specifier-resolution-node": "^1.1.4",
      // <&new
      "tailwindcss": "^3.4.4",
      "typescript": "^5.1.6",
      "vite": "^5.1.0",
      "vite-tsconfig-paths": "^4.2.1"
    }
  }
}
```
