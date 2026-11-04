import {builderViewWithCss, viewWithCss} from '@react-form-builder/components-rsuite'
import {FormViewer, type IFormViewer, Store} from '@react-form-builder/core'
import {FormBuilder, type IFormBuilder} from '@react-form-builder/designer'
import {render} from '@testing-library/react'
import {createRef, Fragment, StrictMode} from 'react'
import {afterEach, describe, expect, it, vi} from 'vitest'
import {generatedLicenseKey} from '../../common/lib/designer/utils/license'

const getForm = () =>
  JSON.stringify({
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'button',
          type: 'RsButton',
          props: {children: {value: 'Alive'}},
          htmlAttributes: [{name: 'data-testid', value: 'live-button'}],
        },
      ],
    },
  })

const modes = [
  {name: 'normal mode', Wrapper: Fragment, creations: 1},
  {name: 'Strict Mode', Wrapper: StrictMode, creations: 2},
]

describe.each(modes)('Disposable providers in $name', ({Wrapper, creations}) => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it.each(['viewer', 'builder'])('keeps the %s store live across updates and disposes each instance once', async kind => {
    const dispose = vi.spyOn(Store.prototype, 'dispose')
    const viewerRef = createRef<IFormViewer>()
    const builderRef = createRef<IFormBuilder>()
    const element = (readOnly: boolean) =>
      kind === 'viewer' ? (
        <FormViewer view={viewWithCss} getForm={getForm} viewerRef={viewerRef} readOnly={readOnly} />
      ) : (
        <FormBuilder
          view={builderViewWithCss}
          getForm={getForm}
          viewerRef={viewerRef}
          builderRef={builderRef}
          licenseKey={generatedLicenseKey}
          persistFormName={false}
          readOnly={readOnly}
        />
      )
    const {findByTestId, rerender, unmount} = render(element(false), {wrapper: Wrapper})

    expect(await findByTestId('live-button')).toBeInTheDocument()
    const liveStore = viewerRef.current as Store
    const liveBuilder = builderRef.current
    expect(liveStore.formData.findByKey('button')).toBeDefined()
    expect(dispose).toHaveBeenCalledTimes(creations - 1)
    expect(dispose.mock.contexts).not.toContain(liveStore)
    if (kind === 'builder') expect(liveBuilder?.formAsString).toContain('button')

    rerender(element(true))

    expect(viewerRef.current).toBe(liveStore)
    expect(builderRef.current).toBe(liveBuilder)
    expect(liveStore.formData.findByKey('button')).toBeDefined()
    expect(dispose).toHaveBeenCalledTimes(creations - 1)
    expect(dispose.mock.contexts).not.toContain(liveStore)

    unmount()

    expect(dispose).toHaveBeenCalledTimes(creations)
    expect(dispose.mock.contexts.filter(store => store === liveStore)).toHaveLength(1)
    expect(new Set(dispose.mock.contexts).size).toBe(creations)
    expect(viewerRef.current).toBeNull()
    expect(builderRef.current).toBeNull()
  })
})
