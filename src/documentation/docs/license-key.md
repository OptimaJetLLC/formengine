---
sidebar_position: 34
title: License key
slug: /license-key
---

# License key

Contact our [sales department](https://formengine.io/pricing) to obtain a licence key.

Once you have the licence key, you need to pass it to the `FormBuilder`
component [property](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#licensekey).

Examples:

```typescript jsx
<FormBuilder
  licenseKey={'YOUR_LICENSE_KEY_HERE'}
/>
```

:::info Important!

The licence check will work correctly either on `localhost` or under HTTPS. These are limitations of browser cryptography!

:::
