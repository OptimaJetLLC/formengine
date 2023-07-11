import {saveAs} from 'file-saver'
import JSZip from 'jszip'
import {BuilderStore} from '../../../../stores/BuilderStore'

const formExtension = '.json'

/**
 * Exports all forms to a ZIP archive.
 * @param store FormBuilder store.
 * @param archiveName the name of the ZIP archive.
 * @returns the {@link Promise} with the result of the forms export.
 * @internal
 */
export async function exportForms(store: BuilderStore, archiveName: string) {
  const formKeys = await store.getFormKeys()

  const zip = new JSZip()
  for (const formName of formKeys) {
    const formValue = await store.getStoredFormJson(formName)
    zip.file(`${formName}${formExtension}`, formValue)
  }

  const blob = await zip.generateAsync({type: 'blob'})
  saveAs(blob, archiveName)
}

/**
 * Import forms from a ZIP archive.
 * @param store FormBuilder store.
 * @param content a ZIP archive content.
 * @returns the {@link Promise} with the result of the forms import.
 * @internal
 */
export async function importForms(store: BuilderStore, content: ArrayBuffer) {
  const jsZip = await JSZip.loadAsync(content)
  const jsZipObjects = jsZip.filter(path => path.endsWith(formExtension))
  const forms = []
  for (const jsZipObject of jsZipObjects) {
    const formName = jsZipObject.name.slice(0, -formExtension.length)
    const formValue = await jsZipObject.async('string')
    forms.push([formName, formValue])
  }
  for (const pair of forms) {
    await store.saveForm(pair[0], pair[1])
  }
}
