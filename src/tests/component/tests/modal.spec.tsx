import {builderView as mantineBuilderView, view as mantineView} from '@react-form-builder/components-mantine'
import {builderView as materialUiBuilderView, view as materialUiView} from '@react-form-builder/components-material-ui'
import {builderViewWithCss, viewWithCss} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render, waitFor, within} from '@testing-library/react'
import {addCustomEventHandler, getInputElement, togglePreview} from '../util/controls'

type ModalLibraryName = 'rsuite' | 'mantine' | 'material-ui'

const modalTestViews = [
  {
    name: 'rsuite' as ModalLibraryName,
    viewerView: viewWithCss,
    builderView: builderViewWithCss
  },
  {
    name: 'mantine' as ModalLibraryName,
    viewerView: mantineView,
    builderView: mantineBuilderView
  },
  {
    name: 'material-ui' as ModalLibraryName,
    viewerView: materialUiView,
    builderView: materialUiBuilderView
  }
] as const

const modalTypeByLibrary: Record<ModalLibraryName, string> = {
  rsuite: 'RsModal',
  mantine: 'MtDialog',
  'material-ui': 'MuiDialog'
}

const buttonTypeByLibrary: Record<ModalLibraryName, string> = {
  rsuite: 'RsButton',
  mantine: 'MtButton',
  'material-ui': 'MuiButton'
}

const inputTypeByLibrary: Record<ModalLibraryName, string> = {
  rsuite: 'RsInput',
  mantine: 'MtTextInput',
  'material-ui': 'MuiTextField'
}

const containerTypeByLibrary: Record<ModalLibraryName, string> = {
  rsuite: 'RsContainer',
  mantine: 'MtContainer',
  'material-ui': 'MuiBox'
}

const headerTypeByLibrary: Record<ModalLibraryName, string> = {
  rsuite: 'RsHeader',
  mantine: 'MtTitle',
  'material-ui': 'MuiTypography'
}

const defaultLanguages = [
  {
    code: 'en',
    dialect: 'US',
    name: 'English',
    description: 'American English',
    bidi: 'ltr'
  }
]

const createFormWithMeta = (library: ModalLibraryName, form: any, withModalType: boolean) => {
  const base: any = {
    version: '1',
    form,
    localization: {},
    languages: defaultLanguages,
    defaultLanguage: 'en-US'
  }

  if (withModalType) {
    base.modalType = modalTypeByLibrary[library]
  }

  return base
}

const createShowModalButtonProps = (library: ModalLibraryName) =>
  library === 'rsuite'
    ? {appearance: {value: 'link'}, children: {value: 'Show modal'}}
    : {children: {value: 'Show modal'}}

const createModalChild = (modalKey: string, modalTemplate: string) => ({
  key: modalKey,
  type: 'Modal',
  props: {modalTemplate: {value: `Template:${modalTemplate}`}},
  modal: {props: {}, events: {}}
})

const createShowModalButton = (library: ModalLibraryName, openModalArgs: Record<string, unknown>) => ({
  key: 'showModalButton',
  type: buttonTypeByLibrary[library],
  props: createShowModalButtonProps(library),
  events: {
    onClick: [{name: 'openModal', type: 'common', args: {modalKey: 'modal1', ...openModalArgs}}]
  },
  htmlAttributes: [{name: 'data-testid', value: 'showModalButton'}]
})

const createFormModalInputChild = (library: ModalLibraryName) => ({
  key: 'modalInput',
  type: inputTypeByLibrary[library],
  props: {},
  htmlAttributes: [{name: 'data-testid', value: 'formModalInput'}]
})

const buildShowModalForm = (
  library: ModalLibraryName,
  openModalArgs: Record<string, unknown>,
  options?: { includeFormInput?: boolean }
) => {
  const children = [
    createModalChild('modal1', 'modal-layout'),
    ...(options?.includeFormInput ? [createFormModalInputChild(library)] : []),
    createShowModalButton(library, openModalArgs)
  ]

  const form = {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children
  }

  return createFormWithMeta(library, form, true)
}

const buildSimpleShowModalForm = (library: ModalLibraryName) =>
  buildShowModalForm(library, {}, {includeFormInput: false})

const buildUseFormDataShowModalForm = (library: ModalLibraryName) =>
  buildShowModalForm(
    library,
    {
      useFormData: true,
      beforeShow: {
        type: 'fn',
        body: '  if (e.data.modalInput === \'no\') return false\n  return {modalInput: "modal input data from beforeShow"}'
      }
    },
    {includeFormInput: true}
  )

const buildBeforeShowShowModalForm = (library: ModalLibraryName) =>
  buildShowModalForm(
    library,
    {
      beforeShow: {
        type: 'fn',
        body: '  if (e.data.modalInput === \'no\') return false\n  return {modalInput: "modal input data from beforeShow"}'
      }
    },
    {includeFormInput: true}
  )

const buildBeforeHideDataShowModalForm = (library: ModalLibraryName) =>
  buildShowModalForm(
    library,
    {
      beforeShow: {type: 'fn'},
      beforeHide: {
        type: 'fn',
        body: '  if (args.result === \'ok\') return e.data'
      }
    },
    {includeFormInput: true}
  )

const createModalHeader = (library: ModalLibraryName, text: string, options?: { key?: string }) => {
  const headerType = headerTypeByLibrary[library]
  const props =
    library === 'rsuite'
      ? {headerSize: {value: 'h4'}, content: {value: text}}
      : library === 'mantine'
        ? {children: {value: text}, order: {value: 4}}
        : {children: {value: text}}
  return {
    key: options?.key ?? 'modalHeader',
    type: headerType,
    props,
    ...(library === 'rsuite' && {slot: 'headerTitle'})
  }
}

const createModalInputWithTestId = (
  library: ModalLibraryName,
  testId: string,
  options?: { slot?: string; disabled?: boolean; readOnly?: boolean }
) => ({
  key: 'modalInput',
  type: inputTypeByLibrary[library],
  props:
    options?.disabled !== undefined || options?.readOnly !== undefined
      ? {
        disabled: {value: options?.disabled ?? false},
        readOnly: {value: options?.readOnly ?? false}
      }
      : {},
  htmlAttributes: [{name: 'data-testid', value: testId}],
  ...(library === 'rsuite' && options?.slot && {slot: options.slot})
})

interface ModalButtonOptions {
  appearance?: string
}

type ModalButtonEvent =
  | {
  type: 'close'
  result: string
}
  | {
  type: 'open'
  args: Record<string, unknown>
}

const createModalButton = (
  library: ModalLibraryName,
  key: string,
  label: string,
  testId: string,
  event: ModalButtonEvent,
  options?: ModalButtonOptions
) => {
  const action =
    event.type === 'close'
      ? {name: 'closeModal', type: 'common', args: {result: event.result}}
      : {name: 'openModal', type: 'common', args: event.args}

  return {
    key,
    type: buttonTypeByLibrary[library],
    props: {
      children: {value: label},
      ...(options?.appearance && library === 'rsuite' && {appearance: {value: options.appearance}})
    },
    wrapperCss: {any: {object: {width: 'fit-content'}}},
    events: {onClick: [action]},
    htmlAttributes: [{name: 'data-testid', value: testId}]
  }
}

const createCloseModalButton = (
  library: ModalLibraryName,
  key: string,
  label: string,
  result: string,
  testId: string,
  options?: ModalButtonOptions
) =>
  createModalButton(library, key, label, testId, {type: 'close', result}, options)

const createOpenModalButton = (
  library: ModalLibraryName,
  key: string,
  label: string,
  openModalArgs: Record<string, unknown>,
  testId: string,
  options?: ModalButtonOptions
) =>
  createModalButton(library, key, label, testId, {type: 'open', args: openModalArgs}, options)

const createModalLayoutButtonsContainer = (
  library: ModalLibraryName,
  children: any[],
  options?: { slot?: string; containerProps?: Record<string, unknown> }
) => ({
  key: 'buttonsContainer',
  type: containerTypeByLibrary[library],
  props:
    options?.containerProps ??
    (library === 'rsuite' ? {disabled: {value: false}, readOnly: {value: false}} : {}),
  css: {any: {object: {flexDirection: 'row', justifyContent: 'end'}}},
  children,
  ...(library === 'rsuite' && options?.slot && {slot: options.slot})
})

const buildModalLayoutForm = (library: ModalLibraryName) => {
  const modalHeader = createModalHeader(library, 'Modal window')
  const modalInput = createModalInputWithTestId(library, 'modalInput', {slot: 'body'})
  const buttonsContainer = createModalLayoutButtonsContainer(library, [
    createCloseModalButton(library, 'okButton', 'Ok', 'ok', 'okButton', {appearance: 'primary'}),
    createCloseModalButton(library, 'cancelButton', 'Cancel', 'cancel', 'cancelButton')
  ], {slot: 'footer'})

  const form = {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children:
      library === 'rsuite'
        ? [
          {
            key: 'rsModalLayout',
            type: 'RsModalLayout',
            props: {},
            children: [modalHeader, modalInput, buttonsContainer]
          }
        ]
        : [modalHeader, modalInput, buttonsContainer]
  }

  return createFormWithMeta(library, form, false)
}

const buildModalLayoutWithConfirmationForm = (library: ModalLibraryName) => {
  const modalHeader = createModalHeader(library, 'Modal window')
  const modalInput = createModalInputWithTestId(library, 'modalInput', {slot: 'body'})
  const confirmationModal = {
    key: 'confirmationModal',
    type: 'Modal',
    props: {modalTemplate: {value: 'Template:confirmation-modal'}},
    modal: {props: {}, events: {}},
    ...(library === 'rsuite' && {slot: 'footer'})
  }
  const buttonsContainer = createModalLayoutButtonsContainer(
    library,
    [
      createOpenModalButton(
        library,
        'okButton',
        'Ok',
        {modalKey: 'confirmationModal', useFormData: true},
        'okButton',
        {appearance: 'primary'}
      ),
      createCloseModalButton(library, 'cancelButton', 'Cancel', 'cancel', 'cancelButton'),
      confirmationModal
    ],
    {slot: 'footer'}
  )

  const form = {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children:
      library === 'rsuite'
        ? [
          {
            key: 'rsModalLayout',
            type: 'RsModalLayout',
            props: {},
            children: [modalHeader, modalInput, buttonsContainer]
          }
        ]
        : [
          {
            key: 'modalLayout',
            type: containerTypeByLibrary[library],
            props: {},
            children: [modalHeader, modalInput, buttonsContainer]
          }
        ]
  }

  return createFormWithMeta(library, form, true)
}

const buildConfirmationModalForm = (library: ModalLibraryName) => {
  const header = createModalHeader(library, 'Are you sure?', {key: 'header'})
  const buttonsContainer = createModalLayoutButtonsContainer(
    library,
    [
      createCloseModalButton(library, 'okButton', 'Ok', 'ok', 'confirmOk'),
      createCloseModalButton(library, 'cancelButton', 'Cancel', 'cancel', 'confirmCancel')
    ],
    {containerProps: {}}
  )

  const confirmationModalInput = createModalInputWithTestId(library, 'confirmationModalInput', {
    slot: 'body',
    disabled: true,
    readOnly: true
  })

  const form = {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'confirmationLayout',
        type: containerTypeByLibrary[library],
        props: {},
        children: [header, confirmationModalInput, buttonsContainer]
      }
    ]
  }

  return createFormWithMeta(library, form, false)
}

const makeGetForm =
  (library: ModalLibraryName, buildDefault: (lib: ModalLibraryName) => any) =>
    (formName?: string) => {
      const form = formName === 'modal-layout' ? buildModalLayoutForm(library) : buildDefault(library)
      return JSON.stringify(form)
    }

describe('Modal tests', () => {
  it.each(modalTestViews)('Should display a modal window only with the modalKey argument ($name)', async ({name, viewerView}) => {
    const getForm = makeGetForm(name, buildSimpleShowModalForm)

    const {findByTestId, queryByTestId} = render(<FormViewer getForm={getForm} view={viewerView}/>)

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const okButton = await findByTestId('okButton')
    fireEvent.click(okButton)

    // the modal window is no longer displayed
    await waitFor(() => expect(queryByTestId('modalInput')).not.toBeInTheDocument())

    fireEvent.click(showModalButton)

    const cancelButton = await findByTestId('cancelButton')
    fireEvent.click(cancelButton)

    // the modal window is no longer displayed
    await waitFor(() => expect(queryByTestId('modalInput')).not.toBeInTheDocument())
  })

  it.each(modalTestViews)('The ModalLayout close button closes the modal window ($name)', async ({name, viewerView}) => {
    const getForm = makeGetForm(name, buildSimpleShowModalForm)

    const {findByTestId, queryByTestId} = render(<FormViewer getForm={getForm} view={viewerView}/>)

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const closeButton = await findByTestId('okButton')
    fireEvent.click(closeButton)

    // the modal window is no longer displayed
    await waitFor(() => expect(queryByTestId('modalInput')).not.toBeInTheDocument())
  })

  it.each(modalTestViews)('Added modal window event handlers should be called ($name)', async ({name, builderView}) => {
    const eventHandlersData: Record<string, any> = {}
    const customActions = {
      onOpenEventHandler: () => {
        eventHandlersData.onOpen ??= []
        eventHandlersData.onOpen.push(new Date())
      },
      onCloseEventHandler: () => {
        eventHandlersData.onClose ??= []
        eventHandlersData.onClose.push(new Date())
      }
    }

    const getForm = makeGetForm(name, buildSimpleShowModalForm)

    const renderResult = render(<FormBuilder view={builderView} getForm={getForm} actions={customActions}/>)
    const {findByTestId} = renderResult

    fireEvent.click(await findByTestId('Tree_Tab'))
    fireEvent.click(await findByTestId('modal1'))

    await addCustomEventHandler(renderResult, 'onOpen', 'onOpenEventHandler')
    await addCustomEventHandler(renderResult, 'onOpen', 'onOpenEventHandler')

    await addCustomEventHandler(renderResult, 'onClose', 'onCloseEventHandler')
    await addCustomEventHandler(renderResult, 'onClose', 'onCloseEventHandler')
    await addCustomEventHandler(renderResult, 'onClose', 'onCloseEventHandler')

    await togglePreview(renderResult)

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    expect(Array.isArray(eventHandlersData.onOpen)).toBe(true)
    expect(eventHandlersData.onOpen.length).toEqual(2)

    const closeButton = await findByTestId('okButton')
    fireEvent.click(closeButton)

    expect(Array.isArray(eventHandlersData.onClose)).toBe(true)
    expect(eventHandlersData.onClose.length).toEqual(3)
  })

  it.each(modalTestViews)('onClose event handlers should be called when closeModal action is fired ($name)', async ({
                                                                                                                      name,
                                                                                                                      builderView
                                                                                                                    }) => {
    const eventHandlersData: Record<string, any> = {}
    const customActions = {
      onCloseEventHandler: () => {
        eventHandlersData.onClose ??= []
        eventHandlersData.onClose.push(new Date())
      }
    }

    const getForm = makeGetForm(name, buildSimpleShowModalForm)

    const renderResult = render(<FormBuilder view={builderView} getForm={getForm} actions={customActions}/>)
    const {findByTestId} = renderResult

    fireEvent.click(await findByTestId('Tree_Tab'))
    fireEvent.click(await findByTestId('modal1'))

    await addCustomEventHandler(renderResult, 'onClose', 'onCloseEventHandler')

    await togglePreview(renderResult)

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const okButton = await findByTestId('okButton')
    fireEvent.click(okButton)
    await waitFor(() => expect(Array.isArray(eventHandlersData.onClose)).toBe(true))
    await waitFor(() => expect(eventHandlersData.onClose.length).toEqual(1))
  })

  it.each(modalTestViews)('openModal.useFormData should pass form data ($name)', async ({name, viewerView}) => {
    const getForm = makeGetForm(name, buildUseFormDataShowModalForm)

    const {findByTestId} = render(<FormViewer getForm={getForm} view={viewerView}/>)

    const formInput = getInputElement(await findByTestId('formModalInput'))
    const randomString = `${new Date().getTime()}`

    fireEvent.change(formInput, {target: {value: randomString}})

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const modalInput = getInputElement((await findByTestId('modalInput')))
    expect(modalInput).toHaveValue(randomString)
  })

  it.each(modalTestViews)('openModal.beforeShow returning false should prevent opening the modal window ($name)', async ({
                                                                                                                           name,
                                                                                                                           viewerView
                                                                                                                         }) => {
    const getForm = makeGetForm(name, buildUseFormDataShowModalForm)

    const {findByTestId, queryByTestId} = render(<FormViewer getForm={getForm} view={viewerView}/>)

    const formInput = getInputElement(await findByTestId('formModalInput'))
    fireEvent.change(formInput, {target: {value: 'no'}})

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    expect(queryByTestId('modalInput')).not.toBeInTheDocument()

    fireEvent.change(formInput, {target: {value: 'yes'}})
    fireEvent.click(showModalButton)
    const modalInput = getInputElement(await findByTestId('modalInput'))
    expect(modalInput).toHaveValue('yes')
  })

  it.each(modalTestViews)('openModal.beforeShow should pass form data ($name)', async ({name, viewerView}) => {
    const getForm = makeGetForm(name, buildBeforeShowShowModalForm)

    const {findByTestId} = render(<FormViewer getForm={getForm} view={viewerView}/>)

    const formInput = getInputElement(await findByTestId('formModalInput'))
    fireEvent.change(formInput, {target: {value: 'some data'}})

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const modalInput = getInputElement(await findByTestId('modalInput'))
    expect(modalInput).toHaveValue('modal input data from beforeShow')
  })

  it.each(modalTestViews)('openModal.beforeHide should pass form data back ($name)', async ({name, viewerView}) => {
    const getForm = makeGetForm(name, buildBeforeHideDataShowModalForm)

    const initialData = {modalInput: 'one'}
    const {findByTestId, queryByTestId} = render(<FormViewer getForm={getForm} view={viewerView} initialData={initialData}/>)

    const formInput = getInputElement(await findByTestId('formModalInput'))
    expect(formInput).toHaveValue('one')

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const modalInput = getInputElement(await findByTestId('modalInput'))
    expect(modalInput).toHaveValue('')

    fireEvent.change(modalInput, {target: {value: 'two'}})

    const cancelButton = await findByTestId('cancelButton')
    fireEvent.click(cancelButton)
    // the modal window is no longer displayed
    await waitFor(() => expect(queryByTestId('modalInput')).not.toBeInTheDocument())
    expect(formInput).toHaveValue('one')

    fireEvent.click(showModalButton)
    const modalInput2 = getInputElement(await findByTestId('modalInput'))
    expect(modalInput2).toHaveValue('')
    fireEvent.change(modalInput2, {target: {value: 'three'}})

    const okButton = await findByTestId('okButton')
    fireEvent.click(okButton)

    const formModalInput = getInputElement(await findByTestId('formModalInput'))
    expect(formModalInput).toHaveValue('three')
  })

  it.each(modalTestViews)('openModal.beforeHide test result should match returned value ($name)', async ({name, builderView}) => {
    const getForm = makeGetForm(name, buildBeforeHideDataShowModalForm)

    const renderResult = render(<FormBuilder view={builderView} getForm={getForm}/>)
    const {container, findByTestId, findByText} = renderResult

    fireEvent.click(await findByTestId('Tree_Tab'))
    const showModalButtons = await renderResult.findAllByTestId('showModalButton')
    const treeShowModalButton = showModalButtons.find(item => item.tagName.toLowerCase() === 'div')
    if (!treeShowModalButton) {
      throw new Error('Unable to find showModalButton in tree panel')
    }
    fireEvent.click(treeShowModalButton)
    fireEvent.click(await findByTestId('Actions_Tab'))

    const rightPanel = container.querySelector('.FE_RightPanel_Content') as HTMLElement
    const argumentsButton = await within(rightPanel).findByText('Arguments')
    fireEvent.click(argumentsButton)
    const beforeHideLabel = await within(rightPanel).findByText('beforeHide')
    const beforeHideBlock = beforeHideLabel.parentNode as HTMLElement
    const editCodeButton = await within(beforeHideBlock).findByText('Edit code')
    fireEvent.click(editCodeButton)

    const runButton = await findByText('Run')
    fireEvent.click(runButton)

    const result = await findByTestId('test-result')
    await waitFor(() => expect(result).toHaveTextContent('{}'))
    expect(result).not.toHaveTextContent('function')
  })

  it.skip('Confirmation should close the parent modal', async () => {
    // todo requires actions that return a value and interrupt the chain of actions
    const getForm = (name?: string) => {
      let form: any = buildBeforeHideDataShowModalForm('rsuite')
      if (name === 'modal-layout') form = buildModalLayoutWithConfirmationForm('rsuite')
      if (name === 'confirmation-modal') form = buildConfirmationModalForm('rsuite')
      return JSON.stringify(form)
    }

    const {findByTestId, queryByTestId} = render(<FormViewer getForm={getForm} view={viewWithCss}/>)

    const showModalButton = await findByTestId('showModalButton')
    fireEvent.click(showModalButton)

    const modalInput = getInputElement(await findByTestId('modalInput'))
    expect(modalInput).toHaveValue('')
    fireEvent.change(modalInput, {target: {value: 'donut'}})

    const okButton = await findByTestId('okButton')
    fireEvent.click(okButton)

    const confirmationModalInput = await findByTestId('confirmationModalInput')
    expect(confirmationModalInput).toHaveValue('donut')

    const confirmOk = await findByTestId('confirmOk')
    fireEvent.click(confirmOk)

    // the modal window is no longer displayed
    await waitFor(() => expect(queryByTestId('modalInput')).not.toBeInTheDocument())
  })
})
