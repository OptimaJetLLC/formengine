import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {createView, define, FormViewer, FormViewerProps, Store, useStore} from '@react-form-builder/core'
import {act, render} from '@testing-library/react'
import {type ForwardedRef, useEffect} from 'react'
import form from './forms/moving-component-form.json'

describe('Component move test', () => {
  it('The moved component should reflect the change of its data in the form', async () => {
    const storeRef: ForwardedRef<Store> = {current: null}

    // we use a special component to get the store
    const StoreStaticContext = ({content}: {content: string}) => {
      const store = useStore()

      useEffect(() => {
        storeRef.current = store
      }, [store])

      return <span>{content}</span>
    }

    const storeStaticContext = define(StoreStaticContext, 'StoreStaticContext').category('test')

    const models = [...rSuiteComponents, storeStaticContext].map(d => d.build().model)
    const view = createView(models)

    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    const getForm = () => JSON.stringify(form)

    const {findByTestId} = render(<FormViewer view={view} getForm={getForm} viewerRef={viewerRef} />)

    // ensure that the form is rendered
    expect(await findByTestId('testInput')).toBeInTheDocument()

    const formViewer = viewerRef.current
    if (!formViewer) {
      throw new Error('FormViewer is not defined')
    }

    // let's check that the form data is correct
    const expectedData = '{"testInput":"ok","repeater1":[{},{},{}]}'
    expect(JSON.stringify(formViewer.formData.data)).toEqual(expectedData)

    const store = storeRef.current
    if (!store) {
      throw new Error('Store is not defined')
    }

    const inputComponent = store.formData.findByKey('testInput')
    if (!inputComponent) {
      throw new Error('Input component is not found')
    }

    const staticContentComponent = store.formData.findByKey('staticContent')
    if (!staticContentComponent) {
      throw new Error('StaticContent component is not found')
    }

    // ok, move the component inside the repeater
    act(() => staticContentComponent.insertAfterMe(inputComponent))

    // let's check that the form data is correct
    const expectedDataAfterMove = '{"repeater1":[{"testInput":"ok"},{"testInput":"ok"},{"testInput":"ok"}]}'
    expect(JSON.stringify(formViewer.formData.data)).toEqual(expectedDataAfterMove)

    // and now move the component back
    act(() => inputComponent.setParent(store.formData))

    // let's check that the form data is correct
    const expectedDataAfterMoveBack = '{"repeater1":[{},{},{}],"testInput":"ok"}'
    expect(JSON.stringify(formViewer.formData.data)).toEqual(expectedDataAfterMoveBack)
  })
})
