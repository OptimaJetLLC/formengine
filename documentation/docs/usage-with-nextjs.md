---
sidebar_position: 31
title: Usage with Next.js
slug: /usage-with-nextjs
---

# Usage with Next.js

The FormEngine is fully compatible with the latest versions of the [Next.js](https://nextjs.org/).

:::caution

The Next.js version 12 incorrectly minifies the js code containing `??` operator. To make the FormEngine library work correctly,
disable [swcMinify](https://nextjs.org/docs/architecture/nextjs-compiler#minification) in `next.config.js` or update Next.js to the latest
version.

:::
