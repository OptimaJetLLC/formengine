function readAsString(file: File, onRead: (content: string) => void) {
  const reader = new FileReader()
  reader.readAsText(file, 'UTF-8')

  reader.onload = readerEvent => {
    const content: string = readerEvent.target?.result as string ?? ''
    onRead(content)
  }
}

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

export function uploadStringFile(onUpload: (content: string) => void) {
  uploadFile(file => readAsString(file, onUpload))
}

export function uploadBinaryFile(onUpload: (content: Promise<ArrayBuffer>) => void) {
  uploadFile(file => onUpload(file.arrayBuffer()))
}
