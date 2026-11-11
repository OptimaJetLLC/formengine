---
sidebar_position: 4
title: Storing user-defined data
slug: /formengine-designer/faq/storing-user-defined-data
description: Each component that implements IFormData can maintain a user-defined data object of any shape
---

# Storing user-defined data

Each component that implements [IFormData](/api-reference/@react-form-builder/core/interfaces/IFormData) can maintain a user-defined data
object of any shape. This functionality is not confined to forms; it can be applied to any component. When you exceed the capabilities of
the FormEngine's core features, you can extend the behavior with this custom storage.

By placing it at the form level, it becomes accessible to all dependent components and is updated in the same way the FormEngine updates.

The example below illustrates how to fetch data and store it at the form level:

```tsx
async function Action(e, args) {
  fetch('https://gist.githubusercontent.com/rogargon/5534902/raw/434445021e155240ca78e378f10f70391dd594ea/countries.json')
    .then(data => data.json())
    .then(data => {
      const preparedData = data.map(value => ({value, label: value}))

      e.store.formData.state.items = preparedData
    })
}
```

As a result, any component downstream in the hierarchy can utilize this data for tasks such as populating fields or executing calculations.

```tsx
function Calculation(form) {
  return form.state.items
}
```

## Initializing form state from props

Sometimes you want to prefill the form-level state with values that come from your host application.
You can do this by using the `initialState` prop on the form viewer or form builder.

The `initialState` prop is a plain object that is set in
[`IFormData.state`](/api-reference/@react-form-builder/core/interfaces/IFormData#state)
when the form is initialized. When the prop changes, the form state is updated accordingly.

```tsx
const initialState = {
  items: [],
  isSubmitting: false,
}

// Viewer
<FormViewer
  view={view}
  getForm={getForm}
  initialState={initialState}
/>

// Builder (uses the same FormViewer under the hood)
<FormBuilder
  view={builderView}
  getForm={getForm}
  initialState={initialState}
/>
```

The object you pass in `initialState` becomes the starting point for `form.state` in your actions and calculations:

```tsx
function Calculation(form) {
  // form.state === initialState after initialization
  return form.state.isSubmitting === true
}
```

When you rerender the React host with a different `initialState` object, the FormEngine replaces the contents of `form.state` with the new
values, keeping the object itself observable for MobX.

## Accessing your environment via userContext

Actions often need to talk to your backend, log events, or read feature flags. Instead of threading each dependency through the form, you
can pass a single **`userContext`** prop: a free-form object that represents your user-defined environment.

- **`userContext`** is available on the action event argument as **`e.userContext`** in every custom action handler.
- You choose its shape: it can hold an HTTP client, a logger, config, feature flags, or any other environment-specific APIs. This simplifies
  access to everything your actions need from the host application.

### Example: environment object with HTTP client and logger

```tsx
// Free-form object describing your environment
const userContext = {
  httpClient: createHttpClient(),
  logger: createLogger(),
  config: { apiBase: '/api', featureFlags: { saveDraft: true } },
}

const actions = {
  saveForm: async (e, args) => {
    const { httpClient, logger, config } = e.userContext ?? {}

    logger?.info('Saving form', e.store.formData.data)
    await httpClient?.post(`${config?.apiBase}/forms`, {
      data: e.store.formData.data,
      state: e.store.formData.state,
    })
  },
}

<FormViewer
  view={view}
  getForm={getForm}
  actions={actions}
  userContext={userContext}
/>
```

The same prop works with the builder:

```tsx
<FormBuilder
  view={builderView}
  getForm={getForm}
  actions={actions}
  userContext={userContext}
/>
```

By centralizing your environment in one object, you keep the form independent of persistence and make it easy to add or change
dependencies (analytics, feature flags, etc.) without touching the form definition.

Parent forms and modal forms share the same `userContext` object. Nested fields are not deep-observed, so mutations show up on the host
object, but FormEngine does not re-render because of them.

```tsx
const userContext = {draftId: null}

const actions = {
  saveDraftFromModal: (e) => {
    e.userContext.draftId = 'draft-42'
  },
  readDraftFromParent: (e) => {
    console.log(e.userContext.draftId) // 'draft-42'
  },
}

<FormViewer view={view} getForm={getForm} actions={actions} userContext={userContext} />
```

If something outside the action must react:

- Pass a new `userContext` object and rerender when the whole environment changes.
- Pass a MobX observable from the host when you need nested MobX reactions.

```tsx
import {observable, runInAction} from 'mobx'

const userContext = observable({flags: {dirty: false}})

const actions = {
  markDirty: (e) => {
    runInAction(() => {
      e.userContext.flags.dirty = true
    })
  },
}

<FormViewer view={view} getForm={getForm} actions={actions} userContext={userContext} />
```

See [Store custom data in forms](/formengine-core/storing-user-defined-data#when-you-need-reactivity) for more detail.
