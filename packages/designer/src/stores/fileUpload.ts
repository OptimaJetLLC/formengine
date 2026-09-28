/**
 * Reads the file as a string and passes the result to the onRead callback function.
 * @param file the file to read.
 * @param onRead the callback to process the contents of the file.
 * @internal
 */
function readAsString(file: File, onRead: (content: string) => void) {
  const reader = new FileReader()
  reader.readAsText(file, 'UTF-8')

  reader.onload = readerEvent => {
    const content: string = (readerEvent.target?.result as string) ?? ''
    onRead(content)
  }
}

/**
 * Creates an HTML input element, passes the onFile callback to the onchange event of that input.
 * @param onFile the callback for the onchange event.
 * @internal
 */
function uploadFile(onFile: (file: File) => void) {
  const input = document.createElement('input')
  input.type = 'file'

  input.onchange = e => {
    const target = e.target as HTMLInputElement
    const file: File = (target.files as FileList)[0]

    onFile(file)
  }

  input.click()
}

/**
 * Uploads a file with string content.
 * @param onUpload the callback to process the contents of the file.
 * @internal
 */
export function uploadStringFile(onUpload: (content: string) => void) {
  uploadFile(file => readAsString(file, onUpload))
}

/**
 * Uploads a file with binary content.
 * @param onUpload the callback to process the contents of the file.
 * @internal
 */
export function uploadBinaryFile(onUpload: (content: Promise<ArrayBuffer>) => void) {
  uploadFile(file => onUpload(file.arrayBuffer()))
}
