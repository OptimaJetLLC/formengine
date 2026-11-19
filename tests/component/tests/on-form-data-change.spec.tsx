import {rSuiteComponents, view} from '@react-form-builder/components-rsuite'
import {
  BiDi,
  ComponentStore,
  createView,
  FormViewer,
  type FormViewerProps,
  type IFormData,
  Language,
  type PersistedForm,
} from '@react-form-builder/core'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {useState} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'
import loginForm from './forms/login-form.json'

const componentsView = createView(rSuiteComponents.map(definer => definer.build().model))
const defaultLanguage = new Language('en', 'US', 'English', 'American English', BiDi.LTR)

type PayloadSnapshot = {
  data: Record<string, unknown>
  errors: Record<string, unknown>
}

const snapshot = (formData: IFormData): PayloadSnapshot => ({
  data: JSON.parse(JSON.stringify(formData.data)),
  errors: JSON.parse(JSON.stringify(formData.errors)),
})

const createTracker = () => {
  const payloads: PayloadSnapshot[] = []
  const onFormDataChange = vi.fn((formData: IFormData) => {
    payloads.push(snapshot(formData))
  })
  return {
    onFormDataChange,
    payloads,
    last: () => payloads[payloads.length - 1],
  }
}

const toPersistedForm = (screen: ComponentStore): PersistedForm => ({
  form: screen,
  localization: {},
  languages: [defaultLanguage],
  defaultLanguage: 'en-US',
})

const createInput = (key: string, testId: string, modify?: (store: ComponentStore) => void) => {
  const store = new ComponentStore(key, 'RsInput')
  store.htmlAttributes = [{name: 'data-testid', value: testId}]
  modify?.(store)
  return store
}

const createScreen = (...children: ComponentStore[]) => {
  const screen = new ComponentStore('Screen', 'Screen')
  screen.children = children
  return toPersistedForm(screen)
}

describe('onFormDataChange', () => {
  it('receives merged initialData on mount', async () => {
    const form = createScreen(createInput('name', 'name'), createInput('city', 'city'))
    const tracker = createTracker()
    const initialData = {name: 'Ada', city: 'London'}

    const {findByTestId} = render(
      <FormViewer
        view={componentsView}
        getForm={() => JSON.stringify(form)}
        initialData={initialData}
        onFormDataChange={tracker.onFormDataChange}
      />
    )

    expect(await findByTestId('name')).toHaveValue('Ada')
    await waitFor(() => expect(tracker.last()?.data).toEqual(initialData))
  })

  it('includes schema value props in the payload', async () => {
    const form = createScreen(
      createInput('name', 'name'),
      createInput('title', 'title', store => {
        store.props.value = {value: 'Engineer'}
      })
    )
    const tracker = createTracker()

    const {findByTestId} = render(
      <FormViewer
        view={componentsView}
        getForm={() => JSON.stringify(form)}
        initialData={{name: 'Grace'}}
        onFormDataChange={tracker.onFormDataChange}
      />
    )

    expect(await findByTestId('title')).toHaveValue('Engineer')
    await waitFor(() =>
      expect(tracker.last()?.data).toEqual({
        name: 'Grace',
        title: 'Engineer',
      })
    )
  })

  it('updates when a computed field recalculates', async () => {
    const form = createScreen(
      createInput('first', 'first'),
      createInput('greeting', 'greeting', store => {
        store.props.value = {
          value: '',
          computeType: 'function',
          fnSource: 'return `Hi ${form.data.first}`',
        }
      })
    )
    const tracker = createTracker()

    const {findByTestId} = render(
      <FormViewer
        view={componentsView}
        getForm={() => JSON.stringify(form)}
        initialData={{first: 'Lin'}}
        onFormDataChange={tracker.onFormDataChange}
      />
    )

    expect(await findByTestId('greeting')).toHaveValue('Hi Lin')
    await waitFor(() => expect(tracker.last()?.data.greeting).toBe('Hi Lin'))

    fireEvent.change(await findByTestId('first'), {target: {value: 'Torvalds'}})
    await waitFor(() =>
      expect(tracker.last()?.data).toMatchObject({
        first: 'Torvalds',
        greeting: 'Hi Torvalds',
      })
    )
  })

  it('updates when the user edits a field', async () => {
    const form = createScreen(createInput('name', 'name'))
    const tracker = createTracker()

    const {findByTestId} = render(
      <FormViewer
        view={componentsView}
        getForm={() => JSON.stringify(form)}
        initialData={{name: 'before'}}
        onFormDataChange={tracker.onFormDataChange}
      />
    )

    fireEvent.change(await findByTestId('name'), {target: {value: 'after'}})
    await waitFor(() => expect(tracker.last()?.data.name).toBe('after'))
  })

  it('rolls template field edits into the parent payload', async () => {
    const child = createScreen(createInput('childName', 'childName'))
    const parentScreen = new ComponentStore('Screen', 'Screen')
    parentScreen.children = [
      createInput('parentName', 'parentName'),
      (() => {
        const template = new ComponentStore('childForm', 'Template:child')
        template.props.storeDataInParentForm = {value: false}
        return template
      })(),
    ]
    const parent = toPersistedForm(parentScreen)
    const tracker = createTracker()

    const getForm = (name?: string) => JSON.stringify(name === 'child' ? child : parent)

    const {findByTestId} = render(
      <FormViewer
        view={componentsView}
        formName="parent"
        getForm={getForm}
        initialData={{parentName: 'Root', childForm: {childName: 'Nested'}}}
        onFormDataChange={tracker.onFormDataChange}
      />
    )

    expect(await findByTestId('childName')).toHaveValue('Nested')
    await waitFor(() =>
      expect(tracker.last()?.data).toEqual({
        parentName: 'Root',
        childForm: {childName: 'Nested'},
      })
    )

    fireEvent.change(await findByTestId('childName'), {target: {value: 'Updated'}})
    await waitFor(() =>
      expect(tracker.last()?.data).toEqual({
        parentName: 'Root',
        childForm: {childName: 'Updated'},
      })
    )
  })

  it('rolls nested template data into the parent payload', async () => {
    const grandchild = createScreen(createInput('leaf', 'leaf'))
    const childScreen = new ComponentStore('Screen', 'Screen')
    childScreen.children = [
      createInput('mid', 'mid'),
      (() => {
        const template = new ComponentStore('inner', 'Template:grandchild')
        template.props.storeDataInParentForm = {value: false}
        return template
      })(),
    ]
    const child = toPersistedForm(childScreen)

    const parentScreen = new ComponentStore('Screen', 'Screen')
    parentScreen.children = [
      (() => {
        const template = new ComponentStore('outer', 'Template:child')
        template.props.storeDataInParentForm = {value: false}
        return template
      })(),
    ]
    const parent = toPersistedForm(parentScreen)
    const tracker = createTracker()

    const forms: Record<string, PersistedForm> = {
      parent,
      child,
      grandchild,
    }
    const getForm = (name?: string) => JSON.stringify(forms[name ?? 'parent'])

    const {findByTestId} = render(
      <FormViewer
        view={componentsView}
        formName="parent"
        getForm={getForm}
        initialData={{outer: {mid: 'M', inner: {leaf: 'L'}}}}
        onFormDataChange={tracker.onFormDataChange}
      />
    )

    expect(await findByTestId('leaf')).toHaveValue('L')
    await waitFor(() =>
      expect(tracker.last()?.data).toEqual({
        outer: {mid: 'M', inner: {leaf: 'L'}},
      })
    )

    fireEvent.change(await findByTestId('leaf'), {target: {value: 'Leaf2'}})
    await waitFor(() =>
      expect(tracker.last()?.data).toEqual({
        outer: {mid: 'M', inner: {leaf: 'Leaf2'}},
      })
    )
  })

  it('reflects repeater edits in the parent payload', async () => {
    const itemInput = createInput('label', 'label')
    const repeater = new ComponentStore('items', 'Repeater')
    repeater.props.value = {value: [{label: 'one'}, {label: 'two'}]}
    repeater.children = [itemInput]
    const form = createScreen(repeater)
    const tracker = createTracker()

    const {findAllByTestId} = render(
      <FormViewer view={componentsView} getForm={() => JSON.stringify(form)} onFormDataChange={tracker.onFormDataChange} />
    )

    const inputs = await findAllByTestId('label')
    expect(inputs).toHaveLength(2)
    await waitFor(() =>
      expect(tracker.last()?.data).toEqual({
        items: [{label: 'one'}, {label: 'two'}],
      })
    )

    fireEvent.change(inputs[0], {target: {value: 'alpha'}})
    await waitFor(() =>
      expect(tracker.last()?.data).toEqual({
        items: [{label: 'alpha'}, {label: 'two'}],
      })
    )
  })

  it('reflects nested repeater data in the parent payload', async () => {
    const childInput = createInput('childLabel', 'childLabel')
    const childRepeater = new ComponentStore('children', 'Repeater')
    childRepeater.props.value = {value: [{childLabel: 'c1'}]}
    childRepeater.children = [childInput]

    const parentInput = createInput('parentLabel', 'parentLabel')
    const parentRepeater = new ComponentStore('rows', 'Repeater')
    parentRepeater.props.value = {
      value: [{parentLabel: 'p1', children: [{childLabel: 'c1'}]}],
    }
    parentRepeater.children = [parentInput, childRepeater]

    const form = createScreen(parentRepeater)
    const tracker = createTracker()

    const {findByTestId} = render(
      <FormViewer view={componentsView} getForm={() => JSON.stringify(form)} onFormDataChange={tracker.onFormDataChange} />
    )

    expect(await findByTestId('childLabel')).toHaveValue('c1')
    await waitFor(() =>
      expect(tracker.last()?.data).toEqual({
        rows: [{parentLabel: 'p1', children: [{childLabel: 'c1'}]}],
      })
    )

    fireEvent.change(await findByTestId('childLabel'), {target: {value: 'c2'}})
    await waitFor(() =>
      expect(tracker.last()?.data).toEqual({
        rows: [{parentLabel: 'p1', children: [{childLabel: 'c2'}]}],
      })
    )
  })

  it('reflects a template inside a repeater in the parent payload', async () => {
    const child = createScreen(createInput('itemName', 'itemName'))
    const template = new ComponentStore('itemForm', 'Template:child')
    template.props.storeDataInParentForm = {value: false}
    const repeater = new ComponentStore('rows', 'Repeater')
    repeater.props.value = {value: [{itemForm: {itemName: 'A'}}]}
    repeater.children = [template]
    const parent = createScreen(repeater)
    const tracker = createTracker()

    const getForm = (name?: string) => JSON.stringify(name === 'child' ? child : parent)

    const {findByTestId} = render(<FormViewer view={componentsView} getForm={getForm} onFormDataChange={tracker.onFormDataChange} />)

    expect(await findByTestId('itemName')).toHaveValue('A')
    await waitFor(() =>
      expect(tracker.last()?.data).toEqual({
        rows: [{itemForm: {itemName: 'A'}}],
      })
    )

    fireEvent.change(await findByTestId('itemName'), {target: {value: 'B'}})
    await waitFor(() =>
      expect(tracker.last()?.data).toEqual({
        rows: [{itemForm: {itemName: 'B'}}],
      })
    )
  })

  it('updates the payload after clear and reset', async () => {
    const form = createScreen(
      createInput('name', 'name', store => {
        store.props.value = {value: 'schema'}
      })
    )
    const tracker = createTracker()
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const {findByTestId} = render(
      <FormViewer
        view={componentsView}
        getForm={() => JSON.stringify(form)}
        viewerRef={viewerRef}
        initialData={{name: 'initial'}}
        onFormDataChange={tracker.onFormDataChange}
      />
    )

    expect(await findByTestId('name')).toHaveValue('initial')
    await waitFor(() => expect(tracker.last()?.data.name).toBe('initial'))

    await asyncAct(async () => {
      viewerRef.current?.formData.clear()
    })
    await waitFor(() => expect(tracker.last()?.data).toEqual({}))

    await asyncAct(async () => {
      viewerRef.current?.formData.reset()
    })
    await waitFor(() => expect(tracker.last()?.data.name).toBe('schema'))
  })

  it('includes validation errors after validate()', async () => {
    const tracker = createTracker()
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const {findByTestId} = render(
      <FormViewer
        view={view}
        getForm={() => JSON.stringify(loginForm)}
        viewerRef={viewerRef}
        initialData={{login: 't1', password: 'ok'}}
        onFormDataChange={tracker.onFormDataChange}
      />
    )

    expect(await findByTestId('login')).toHaveValue('t1')
    await waitFor(() => expect(tracker.last()?.errors).toEqual({}))

    await asyncAct(async () => {
      await viewerRef.current?.formData.validate()
    })

    await waitFor(() => {
      expect(tracker.last()?.errors.login).toBeTruthy()
    })
  })

  it('does not push errors through onFormDataChange for getValidationResult()', async () => {
    const tracker = createTracker()
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const {findByTestId} = render(
      <FormViewer
        view={view}
        getForm={() => JSON.stringify(loginForm)}
        viewerRef={viewerRef}
        initialData={{login: 't1', password: 'ok'}}
        onFormDataChange={tracker.onFormDataChange}
      />
    )

    expect(await findByTestId('login')).toHaveValue('t1')
    await waitFor(() => expect(tracker.last()).toBeDefined())
    const before = tracker.last()!

    const returned = await asyncAct(async () => await viewerRef.current!.formData.getValidationResult())
    expect(returned).toMatchObject({login: expect.anything()})

    await waitFor(() => {
      expect(tracker.last()?.errors).toEqual(before.errors)
    })
  })

  it('keeps data/errors content when only initialState changes', async () => {
    const form = createScreen(createInput('name', 'name'))
    const tracker = createTracker()
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}

    const {findByTestId, rerender} = render(
      <FormViewer
        view={componentsView}
        getForm={() => JSON.stringify(form)}
        viewerRef={viewerRef}
        initialData={{name: 'fixed'}}
        initialState={{phase: 1}}
        onFormDataChange={tracker.onFormDataChange}
      />
    )

    expect(await findByTestId('name')).toHaveValue('fixed')
    await waitFor(() => expect(tracker.last()?.data.name).toBe('fixed'))
    const before = tracker.last()!

    rerender(
      <FormViewer
        view={componentsView}
        getForm={() => JSON.stringify(form)}
        viewerRef={viewerRef}
        initialData={{name: 'fixed'}}
        initialState={{phase: 2}}
        onFormDataChange={tracker.onFormDataChange}
      />
    )

    await waitFor(() => expect(viewerRef.current?.formData.state.phase).toBe(2))
    // Store may remount when props change; data/errors content must stay the same.
    expect(tracker.last()?.data).toEqual(before.data)
    expect(tracker.last()?.errors).toEqual(before.errors)
  })

  it('reflects controlled errors prop in the payload', async () => {
    const form = createScreen(createInput('name', 'name'))
    const tracker = createTracker()

    const App = () => {
      const [errors, setErrors] = useState<FormViewerProps['errors']>({name: 'required'})
      return (
        <>
          <FormViewer
            view={componentsView}
            getForm={() => JSON.stringify(form)}
            errors={errors}
            onFormDataChange={tracker.onFormDataChange}
          />
          <button type="button" data-testid="set-errors" onClick={() => setErrors({name: 'updated'})}>
            Set errors
          </button>
        </>
      )
    }

    const {findByTestId} = render(<App />)

    expect(await findByTestId('name')).toBeInTheDocument()
    await waitFor(() => expect(tracker.last()?.errors).toEqual({name: 'required'}))

    fireEvent.click(await findByTestId('set-errors'))
    await waitFor(() => expect(tracker.last()?.errors).toEqual({name: 'updated'}))
  })
})
