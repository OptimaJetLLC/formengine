---
description: Store and manage custom user data in FormEngine forms. Learn how to add
  metadata, custom properties, and application-specific fields to form configurations.
sidebar_class_name: formengine-core-additional
sidebar_label: Storing user-defined data
sidebar_position: 35
slug: /formengine-core/storing-user-defined-data
title: Store Custom Data in Forms - User-Defined Fields
---

# Store Custom Data in Forms - User-Defined Fields

Each form that implements [IFormData](/api-reference/@react-form-builder/core/interfaces/IFormData) can maintain a user-defined `state`
object of any shape. You can also pass a free-form `userContext` object from your host application to expose HTTP clients, loggers, and
other services to your actions.

In this guide, you'll learn:

- How to store arbitrary data in `form.state`
- How to prefill `form.state` with the `initialState` prop on `FormViewer`
- How to expose HTTP clients and loggers through `userContext` and use them in actions
- How `userContext` is shared between parent and modal forms, and how to make it reactive when you need that

## Overview

FormEngine Core gives you two main extension points for user-defined data:

- **Form-level state** via [IFormData.state](/api-reference/@react-form-builder/core/interfaces/IFormData#state), available as
  `form.state` in calculations and `e.store.formData.state` in actions.
- **Environment context** via the [userContext](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#usercontext) prop,
  available as `e.userContext` in every action.

By keeping this data outside of the form JSON, you can:

- Share data between components without adding extra fields.
- Avoid polluting the form definition with infrastructure details.
- Reuse the same form definition in different host applications.

## Form-level state with IFormData.state

The `state` object on `IFormData` is your place to store arbitrary, form-scoped data. It is:

- **Observable** by MobX, so UI reacts when you update it.
- **Independent** from `data`, which stores actual field values.
- **Accessible** from actions, calculations, and other form logic.

### Storing fetched data at the form level

The following example shows how to fetch data in an action and store it at the form level so that any component can reuse it:

```javascript title='fetchCountries Action'
/**
 * @param {ActionEventArgs} e the action arguments.
 * @param {} args the action parameters arguments.
 */
async function Action(e, args) {
  const response = await fetch(
    'https://gist.githubusercontent.com/rogargon/5534902/raw/434445021e155240ca78e378f10f70391dd594ea/countries.json'
  )
  const data = await response.json()

  const items = data.map(value => ({value, label: value}))

  // Store items at the form level
  e.store.formData.state.items = items
}
```

Any downstream component can then access this shared state, for example from a calculation:

```tsx title='Calculation.ts'
function Calculation(form) {
  // Read shared items from form-level state
  return form.state.items
}
```

## Initializing form state from FormViewer

Sometimes you want to prefill the form-level state with values that come from your host application, such as feature flags, configuration,
or initial UI state.

You can do this by using the [initialState](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#initialstate) prop on
`FormViewer`. The `initialState` prop is a plain object that becomes the starting value of
[IFormData.state](/api-reference/@react-form-builder/core/interfaces/IFormData#state) when the form is initialized.

```tsx title='HostApp.tsx'
const initialState = {
  items: [],
  isSubmitting: false,
  lastSubmissionStatus: 'idle',
}

function HostApp() {
  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
      initialState={initialState}
    />
  )
}
```

In actions and calculations, you interact with the same state object:

```tsx title='Calculation.ts'
function Calculation(form) {
  // form.state === initialState after initialization
  return form.state.isSubmitting === true
}
```

:::info[Important]
`initialState` is **reactive**. When you rerender the React host with a different `initialState` object, FormEngine replaces the contents of
`form.state` with the new values while keeping the observable object instance. This means changes to the `initialState` prop will update
`form.state` for all actions and calculations.
:::

### Live example

```jsx live
function App() {
  const [initialState, setInitialState] = useState({
    isSubmitting: false,
    lastSubmissionStatus: 'idle',
    profile: 'empty',
    name: '',
    email: '',
  })

  const form = useMemo(() => ({
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'name',
          type: 'MuiTextField',
          props: {
            label: {value: 'Name'},
            value: {
              computeType: 'function',
              fnSource: "return form.state.name ?? '';",
            },
          },
        },
        {
          key: 'email',
          type: 'MuiTextField',
          props: {
            label: {value: 'Email'},
            value: {
              computeType: 'function',
              fnSource: "return form.state.email ?? '';",
            },
          },
        },
      ],
    },
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const loadAlice = useCallback(() => {
    setInitialState({
      isSubmitting: false,
      lastSubmissionStatus: 'idle',
      profile: 'alice',
      name: 'Alice',
      email: 'alice@example.com',
    })
  }, [])

  const loadBob = useCallback(() => {
    setInitialState({
      isSubmitting: false,
      lastSubmissionStatus: 'idle',
      profile: 'bob',
      name: 'Bob',
      email: 'bob@example.com',
    })
  }, [])

  return (
    <div>
      <div style={{marginBottom: '12px'}}>
        <button onClick={loadAlice} style={{marginRight: '8px'}}>
          Load Alice initialState
        </button>
        <button onClick={loadBob}>
          Load Bob initialState
        </button>
      </div>
      <FormViewer
        view={muiView}
        getForm={getForm}
        initialState={initialState}
      />
      <div style={{marginTop: '12px', padding: '8px'}}>
        <h4 style={{marginTop: 0}}>Current initialState</h4>
        <pre style={{maxHeight: '160px', overflow: 'auto'}}>
          {JSON.stringify(initialState, null, 2)}
        </pre>
      </div>
    </div>
  )
}
```

## Accessing your environment via userContext

Actions often need to talk to your backend, log events, or read feature flags. Instead of threading each dependency through the form JSON,
you can pass a single [userContext](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#usercontext) prop: a free-form
object that represents your environment.

- **`userContext` is available in actions** as `e.userContext`.
- You choose its shape: it can hold an HTTP client, a logger, config, feature flags, or any other environment-specific APIs.
- The form stays independent from persistence and infrastructure concerns.
- FormEngine keeps the same object reference. If a modal action mutates `e.userContext`, the parent form and your host variable see those
  changes too.
- Nested fields are not deep-observed. Changing `e.userContext.flags.dirty` does not make FormEngine re-render on its own.

### Example: environment object with HTTP client and logger

```tsx title='HostApp.tsx'
// Free-form object describing your environment
const userContext = {
  httpClient: createHttpClient(),
  logger: createLogger(),
  config: {apiBase: '/api', featureFlags: {saveDraft: true}},
}

const actions = {
  saveForm: async (e, args) => {
    const {httpClient, logger, config} = e.userContext ?? {}

    logger?.info('Saving form', e.store.formData.data, e.store.formData.state)

    await httpClient?.post(`${config?.apiBase}/forms`, {
      data: e.store.formData.data,
      state: e.store.formData.state,
    })
  },
}

function HostApp() {
  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
      actions={actions}
      userContext={userContext}
    />
  )
}
```

### Sharing mutations across parent and modal forms

Pass one object as [userContext](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#usercontext). A modal action can
write to it; a parent action or your host code can read the same values afterward.

```tsx title='SharedUserContext.tsx'
const userContext = {
  draftId: null,
  flags: {dirty: false},
}

const actions = {
  saveDraftFromModal: (e) => {
    e.userContext.draftId = 'draft-42'
    e.userContext.flags.dirty = true
  },
  readDraftFromParent: (e) => {
    // Same object the modal mutated
    console.log(e.userContext.draftId) // 'draft-42'
    console.log(userContext.flags.dirty) // true
  },
}

function HostApp() {
  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
      actions={actions}
      userContext={userContext}
    />
  )
}
```

### When you need reactivity

`userContext` works well as a shared bag of services and mutable host data. FormEngine will not subscribe to nested field changes for you.
If something outside the action must update when the context changes, use one of these approaches.

| Goal                                                              | What to do                                              |
| ----------------------------------------------------------------- | ------------------------------------------------------- |
| Swap the whole environment (new client, session, or flags object) | Pass a new `userContext` object and rerender            |
| Run MobX `reaction` / `observer` on nested fields                 | Pass a MobX observable you create in the host           |
| Update React UI after an action                                   | Keep that state in React, or replace the prop afterward |

#### Replace the prop

When the environment itself changes, put a new object into state and pass it as `userContext`. Later reads of `e.userContext` (including
after an `await` in an async action) see the new object.

```tsx title='ReplaceUserContext.tsx'
function HostApp() {
  const [userContext, setUserContext] = useState({
    sessionId: 'anon',
    apiBase: '/api',
  })

  const actions = {
    login: async (e) => {
      const session = await createSession()
      // Host replaces the prop; later reads of e.userContext see the new object
      setUserContext({
        sessionId: session.id,
        apiBase: '/api',
      })
    },
    loadProfile: async (e) => {
      await delay(100)
      // After the prop replace, this is the new object
      return e.userContext.sessionId
    },
  }

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
      actions={actions}
      userContext={userContext}
    />
  )
}
```

#### Pass a host-owned MobX observable

FormEngine does not wrap `userContext` in a deep observable. If you already use MobX outside the form and need reactions on nested fields,
create the observable in the host and pass that instance.

```tsx title='ObservableUserContext.tsx'
import {observable, reaction, runInAction} from 'mobx'

const userContext = observable({
  flags: {dirty: false},
})

reaction(
  () => userContext.flags.dirty,
  (dirty) => {
    console.log('dirty changed', dirty)
  },
)

const actions = {
  markDirty: (e) => {
    runInAction(() => {
      e.userContext.flags.dirty = true
    })
  },
}

function HostApp() {
  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
      actions={actions}
      userContext={userContext}
    />
  )
}
```

A plain object is enough for most hosts. Use a host-owned observable only when you need MobX tracking outside FormEngine.

The next sections provide live examples that combine `initialState`, `userContext`, HTTP requests, and logging.

## Live example: HTTP request and logging via userContext

This live example shows how to:

- Create a simple HTTP client and logger in `userContext`.
- Log form submissions and state changes.
- Send form data and form-level state to a backend endpoint.

### Live example

```jsx live
function App() {
  const [logLines, setLogLines] = useState([])

  const form = useMemo(() => ({
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'name',
          type: 'MuiTextField',
          props: {
            label: {value: 'Name'},
          },
        },
        {
          key: 'email',
          type: 'MuiTextField',
          props: {
            label: {value: 'Email'},
          },
        },
        {
          key: 'saveButton',
          type: 'MuiButton',
          props: {
            children: {value: 'Save to backend'},
          },
          events: {
            onClick: [
              {
                name: 'submitForm',
                type: 'custom',
              },
            ],
          },
        },
      ],
    },
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const httpClient = useMemo(() => ({
    post: async (url, body) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const text = await response.text()

      return {
        ok: response.ok,
        status: response.status,
        bodyPreview: text.slice(0, 200),
      }
    },
  }), [])

  const logger = useMemo(() => ({
    info: (...args) => {
      console.log('[info]', ...args)
      const message = `[info] ${args.map(arg => JSON.stringify(arg)).join(' ')}`
      setLogLines(previous => [message, ...previous].slice(0, 5))
    },
    error: (...args) => {
      console.error('[error]', ...args)
      const message = `[error] ${args.map(arg => JSON.stringify(arg)).join(' ')}`
      setLogLines(previous => [message, ...previous].slice(0, 5))
    },
  }), [setLogLines])

  const userContext = useMemo(() => ({
    httpClient,
    logger,
    // Use the bin URL without "/b" so PostBin records the request
    config: {postUrl: 'https://echo.free.beeceptor.com '},
  }), [httpClient, logger])

  const initialState = useMemo(() => ({
    isSubmitting: false,
    lastSubmissionStatus: 'idle',
  }), [])

  const actions = useMemo(() => ({
    submitForm: async e => {
      const {httpClient, logger, config} = e.userContext ?? {}

      e.store.formData.state.isSubmitting = true
      e.store.formData.state.lastSubmissionStatus = 'pending'

      logger?.info('Submitting form', e.data, e.store.formData.state)

      try {
        const url = config?.postUrl ?? 'https://www.postb.in/1770727951872-4113895501941'
        const result = await httpClient?.post(
          url,
          {
            data: e.data,
            state: e.store.formData.state,
          }
        )

        logger?.info('Backend response', result)
        e.store.formData.state.lastSubmissionStatus = 'success'
      } catch (error) {
        logger?.error('Submit failed', error)
        e.store.formData.state.lastSubmissionStatus = 'error'
      } finally {
        e.store.formData.state.isSubmitting = false
      }
    },
  }), [])

  return (
    <div>
      <FormViewer
        view={muiView}
        getForm={getForm}
        actions={actions}
        userContext={userContext}
        initialState={initialState}
      />
      <div style={{marginTop: '16px', padding: '8px'}}>
        <h4 style={{marginTop: 0}}>Last 5 log entries</h4>
        <pre style={{maxHeight: '160px', overflow: 'auto'}}>
          {logLines.join('\n')}
        </pre>
      </div>
      <p style={{marginTop: '12px'}}>
        Open the browser console to see HTTP requests and log messages.
      </p>
    </div>
  )
}
```

## Live example: logging form changes

This example uses `onFormDataChange` to log every change and keep a compact log in React state. It does not depend on `userContext`, but it
is a useful pattern to combine with a logger from your environment.

### Live example

```jsx live
function App() {
  const [logLines, setLogLines] = useState([])

  const form = useMemo(() => ({
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'productName',
          type: 'MuiTextField',
          props: {
            label: {value: 'Product name'},
          },
        },
        {
          key: 'price',
          type: 'MuiTextField',
          props: {
            label: {value: 'Price'},
            helperText: {value: 'Enter a number'},
          },
        },
      ],
    },
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const handleFormDataChange = useCallback(formData => {
    const {data, errors} = formData
    const timestamp = new Date().toISOString()

    console.log('Form data changed:', data)
    console.log('Form errors:', errors)

    setLogLines(previous => [
      `${timestamp} data=${JSON.stringify(data)} errors=${JSON.stringify(errors)}`,
      ...previous,
    ].slice(0, 5))
  }, [])

  return (
    <div>
      <FormViewer
        view={muiView}
        getForm={getForm}
        onFormDataChange={handleFormDataChange}
      />
      <div style={{marginTop: '16px', padding: '8px'}}>
        <h4 style={{marginTop: 0}}>Last 5 changes</h4>
        <pre style={{maxHeight: '160px', overflow: 'auto'}}>
          {logLines.join('\n')}
        </pre>
      </div>
    </div>
  )
}
```

## Summary

- Use [IFormData.state](/api-reference/@react-form-builder/core/interfaces/IFormData#state) to keep arbitrary, observable form-level data.
- Initialize that state from React with the
  [initialState](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#initialstate) prop on `FormViewer`.
- Pass environment-specific dependencies (HTTP client, logger, feature flags) through
  [userContext](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#usercontext) and consume them in actions.
- Share one `userContext` object between parent and modal actions when you need common host data. Replace the prop, or pass a host-owned
  MobX observable, if something must react to changes.
- Combine these features to keep your forms clean, reusable, and independent of infrastructure details.

---

For more information:

- [Handling form data](/formengine-core/handling-form-data)
- [Actions and events](/formengine-core/actions-and-events)
- [User defined properties](/formengine-core/user-defined-properties)
- [FormEngine Core API reference](/api-reference/@react-form-builder/core)
