---
description: 'Integrate FormEngine with Next.js: App Router support, Server Components,
  API routes, form submission, and deployment. Complete Next.js guide.'
sidebar_label: Usage with Next.js
sidebar_position: 31
slug: /usage-with-nextjs
title: FormEngine with Next.js - Integration Guide
---

# FormEngine with Next.js - Integration Guide

The FormEngine is fully compatible with the latest versions of the [Next.js](https://nextjs.org/).

:::tip

A fully functional example is available in our [GitHub repository](https://github.com/OptimaJetLLC/formengine), located in
the [examples](https://github.com/OptimaJetLLC/formengine/tree/master/premium/examples/with-nextjs/) folder. We encourage you to explore the code and see how the
various components work together. If you have any questions or need further assistance, feel free to reach out!

:::

:::caution

Please note that Next.js version 12 incorrectly minifies JavaScript code containing the `??` operator. To ensure the FormEngine library
functions correctly, either disable [swcMinify](https://nextjs.org/docs/architecture/nextjs-compiler#minification) in your `next.config.js`
file or update to the latest version of Next.js.

:::

Currently, FormEngine does not support Server-Side Rendering (SSR). To disable SSR at the component level, include the `use client`
directive at the top of the component that utilizes FormEngine components. Additionally, wrap the components in a `dynamic` import with SSR
disabled. Here’s an example of how to implement this:

```tsx
'use client'

// ...
import dynamic from 'next/dynamic'

const FormViewer = dynamic(() => import('@react-form-builder/core').then((mod) => mod.FormViewer), {
  ssr: false
})

// ...

const Viewer = () => {
  // ...
  return (
    <FormViewer
      view={view}
      // ...
    />
  )
}
```
