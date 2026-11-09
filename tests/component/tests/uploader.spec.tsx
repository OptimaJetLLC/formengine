import type {FileType, UploaderProps} from '@react-form-builder/components-uploader'
import {uploaderComponent} from '@react-form-builder/components-uploader'
import {createView, FormViewer} from '@react-form-builder/core'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'

const Uploader = uploaderComponent.build().model.component
const uploaderView = createView([uploaderComponent.build().model])

const createFile = (name = 'sample.txt', content = 'hello', type = 'text/plain') => new File([content], name, {type})

const mockFetchOk = (filePath = '/uploaded/sample.txt') =>
  vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({filePath, status: 'success'}),
  })

const mockFetchReject = (message = 'network down') => vi.fn().mockRejectedValue(new Error(message))

const mockFetchJsonError = () =>
  vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({status: 'error', error: 'server rejected'}),
  })

const mockFetchHttpError = (status = 500) =>
  vi.fn().mockResolvedValue({
    ok: false,
    status,
    json: async () => ({filePath: '/should-not-use', status: 'success'}),
  })

const createFileTransfer = (files: File[]) => {
  // Chromium requires a real DataTransfer; jsdom accepts a plain object and does not define DataTransfer.
  if (typeof DataTransfer === 'undefined') {
    const items = files.map(file => ({
      kind: 'file' as const,
      type: file.type,
      getAsFile: () => file,
    }))
    return {
      files,
      items,
      types: ['Files'],
      getData: () => '',
    }
  }

  const dataTransfer = new DataTransfer()
  for (const file of files) {
    dataTransfer.items.add(file)
  }
  return dataTransfer
}

const selectFiles = (input: HTMLInputElement, files: File[]) => {
  fireEvent.change(input, {target: {files}})
}

const dispatchTransferEvent = (target: Element, type: 'drop' | 'paste', transferKey: 'dataTransfer' | 'clipboardData', files: File[]) => {
  // Native DragEvent/ClipboardEvent expose read-only transfer getters in Chromium;
  // fireEvent cannot overwrite them. A plain Event + defineProperty works in both
  // Chromium and jsdom.
  const event = new Event(type, {bubbles: true, cancelable: true})
  Object.defineProperty(event, transferKey, {
    configurable: true,
    value: createFileTransfer(files),
  })
  fireEvent(target, event)
}

const pasteFiles = (target: Element, files: File[]) => {
  dispatchTransferEvent(target, 'paste', 'clipboardData', files)
}

const dropFiles = (target: Element, files: File[]) => {
  dispatchTransferEvent(target, 'drop', 'dataTransfer', files)
}

const expectNoUpload = async (onChange: ReturnType<typeof vi.fn>, onError: ReturnType<typeof vi.fn>) => {
  await asyncAct(async () => {
    await new Promise(resolve => setTimeout(resolve, 30))
  })
  expect(fetch).not.toHaveBeenCalled()
  expect(onChange).not.toHaveBeenCalled()
  expect(onError).not.toHaveBeenCalled()
}

const renderUploader = (props: Partial<UploaderProps> = {}) => {
  const onChange = vi.fn()
  const onError = vi.fn()
  const result = render(
    <Uploader action="/upload" value={[]} dropzone={true} paste={false} onChange={onChange} onError={onError} {...props}>
      Drop files
    </Uploader>
  )
  const root = result.container.firstElementChild
  if (!root) throw new Error('Uploader root is missing')
  const input = result.container.querySelector('input[type="file"]')
  if (!(input instanceof HTMLInputElement)) throw new Error('Uploader file input is missing')
  return {...result, root, input, onChange, onError}
}

const renderViewerUploader = (props: Record<string, unknown> = {}) => {
  const form = {
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'uploader1',
          type: 'Uploader',
          props: {
            action: {value: '/upload'},
            children: {value: 'Drop files'},
            dropzone: {value: true},
            ...props,
          },
        },
      ],
    },
  }

  return render(<FormViewer view={uploaderView} getForm={() => JSON.stringify(form)} />)
}

const findViewerDropzone = async (utils: ReturnType<typeof renderViewerUploader>) => {
  await utils.findByText('Drop files')
  const root = utils.container.querySelector('[role="presentation"]')
  if (!root) throw new Error('Uploader dropzone root is missing')
  return root
}

describe('Uploader', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetchOk())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('uploads a selected file and appends it to value via onChange', async () => {
    const existing: FileType[] = [{name: 'existing.txt', url: '/uploaded/existing.txt', status: 'success'}]
    const fetchMock = mockFetchOk('/uploaded/next.txt')
    vi.stubGlobal('fetch', fetchMock)
    const {input, onChange, onError} = renderUploader({value: existing})
    const file = createFile('next.txt')

    selectFiles(input, [file])

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
    expect(onError).not.toHaveBeenCalled()
    expect(fetchMock).toHaveBeenCalledWith(
      '/upload',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
      })
    )

    const nextValue = onChange.mock.calls[0][0] as FileType[]
    expect(nextValue).toHaveLength(2)
    expect(nextValue[0]).toEqual(existing[0])
    expect(nextValue[1]).toMatchObject({
      name: 'next.txt',
      url: '/uploaded/next.txt',
      status: 'success',
      blobFile: file,
    })
  })

  it('calls onError when the upload request fails', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    vi.stubGlobal('fetch', mockFetchReject('network down'))
    const {input, onChange, onError} = renderUploader()

    selectFiles(input, [createFile()])

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(onError.mock.calls[0][0]).toEqual(expect.any(Error))
    expect((onError.mock.calls[0][0] as Error).message).toBe('Some files failed to upload')
    expect(onChange).toHaveBeenCalledTimes(1)
    const failed = onChange.mock.calls[0][0] as FileType[]
    expect(failed[0]).toMatchObject({
      name: 'sample.txt',
      status: 'error',
      error: 'network down',
    })
    expect(failed[0].url).toBeUndefined()
    expect(consoleError).toHaveBeenCalled()
    consoleError.mockRestore()
  })

  it('calls onError when the server returns an error payload', async () => {
    vi.stubGlobal('fetch', mockFetchJsonError())
    const {input, onChange, onError} = renderUploader()

    selectFiles(input, [createFile()])

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0][0]).toMatchObject({
      name: 'sample.txt',
      status: 'error',
      error: 'server rejected',
    })
  })

  it('calls onError when the HTTP response is not ok', async () => {
    vi.stubGlobal('fetch', mockFetchHttpError(503))
    const {input, onChange, onError} = renderUploader()

    selectFiles(input, [createFile()])

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0][0]).toMatchObject({
      name: 'sample.txt',
      status: 'error',
      error: 'Upload failed with status 503',
    })
    expect(onChange.mock.calls[0][0][0].url).toBeUndefined()
  })

  it('does not upload when action is missing', async () => {
    const {input, onChange, onError} = renderUploader({action: ''})

    selectFiles(input, [createFile()])

    await expectNoUpload(onChange, onError)
  })

  it('uploads dropped files when dropzone is enabled', async () => {
    const {root, onChange, onError} = renderUploader({dropzone: true})

    dropFiles(root, [createFile('dropped.txt')])

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
    expect(onError).not.toHaveBeenCalled()
    expect(onChange.mock.calls[0][0][0]).toMatchObject({
      name: 'dropped.txt',
      url: '/uploaded/sample.txt',
      status: 'success',
    })
  })

  it('does not upload dropped files when dropzone is disabled', async () => {
    const {root, onChange, onError} = renderUploader({dropzone: false})

    dropFiles(root, [createFile('dropped.txt')])

    await expectNoUpload(onChange, onError)
  })

  it('does not upload pasted files when paste is disabled', async () => {
    const {root, onChange, onError} = renderUploader({paste: false})

    pasteFiles(root, [createFile('pasted.txt')])

    await expectNoUpload(onChange, onError)
  })

  it('uploads pasted files when paste is enabled', async () => {
    const {root, onChange, onError} = renderUploader({paste: true})

    pasteFiles(root, [createFile('pasted.txt')])

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
    expect(onError).not.toHaveBeenCalled()
    expect(onChange.mock.calls[0][0][0]).toMatchObject({
      name: 'pasted.txt',
      url: '/uploaded/sample.txt',
      status: 'success',
    })
  })

  it('does not upload files that do not match accept', async () => {
    const {input, root, onChange, onError} = renderUploader({
      accept: {'image/png': ['.png']},
    })

    selectFiles(input, [createFile('notes.txt', 'hello', 'text/plain')])
    dropFiles(root, [createFile('notes.txt', 'hello', 'text/plain')])

    await expectNoUpload(onChange, onError)
  })

  it('calls onError when some of multiple files fail', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({filePath: '/uploaded/ok.txt', status: 'success'}),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({status: 'error', error: 'second failed'}),
      })
    vi.stubGlobal('fetch', fetchMock)
    const {input, onChange, onError} = renderUploader({multiple: true})

    selectFiles(input, [createFile('ok.txt'), createFile('bad.txt')])

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1))
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledTimes(1)
    const files = onChange.mock.calls[0][0] as FileType[]
    expect(files).toHaveLength(2)
    expect(files[0]).toMatchObject({name: 'ok.txt', url: '/uploaded/ok.txt', status: 'success'})
    expect(files[1]).toMatchObject({name: 'bad.txt', status: 'error', error: 'second failed'})
  })

  it('does not upload when disabled', async () => {
    const {input, root, onChange, onError} = renderUploader({disabled: true, paste: true})

    selectFiles(input, [createFile()])
    dropFiles(root, [createFile('dropped.txt')])
    pasteFiles(root, [createFile('pasted.txt')])

    await expectNoUpload(onChange, onError)
  })

  it('does not upload when readOnly', async () => {
    const {input, root, onChange, onError} = renderUploader({readOnly: true, paste: true})

    selectFiles(input, [createFile()])
    dropFiles(root, [createFile('dropped.txt')])
    pasteFiles(root, [createFile('pasted.txt')])

    await expectNoUpload(onChange, onError)
  })

  it('does not upload pasted files in FormViewer when paste is omitted (default false)', async () => {
    const utils = renderViewerUploader()
    const root = await findViewerDropzone(utils)

    pasteFiles(root, [createFile('pasted.txt')])

    await asyncAct(async () => {
      await new Promise(resolve => setTimeout(resolve, 30))
    })
    expect(fetch).not.toHaveBeenCalled()
  })

  it('uploads pasted files in FormViewer when paste is enabled', async () => {
    const utils = renderViewerUploader({paste: {value: true}})
    const root = await findViewerDropzone(utils)

    pasteFiles(root, [createFile('pasted.txt')])

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
  })
})
