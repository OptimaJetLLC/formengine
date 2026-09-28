import type {IFormStorage} from '@react-form-builder/designer'
import * as emptyForm from './emptyForm.json'

const createForm = (key: string) => {
  emptyForm.form.children[0].props.content.value = key
  return JSON.stringify(emptyForm)
}

/**
 * Defines the structure for identifying the currently open form.
 */
export type CurrentFormOptions = {
  /**
   * Name of the currently open form.
   */
  formName: string
  /**
   * Version of the currently open form.
   */
  formVersion?: number
}

type FormWithVersions = {
  versions: Record<number, string>
}

function toFormOptions(formName: string, formVersion: number): CurrentFormOptions {
  return {formName, formVersion}
}

/**
 * The form storage.
 */
export class FormStorage implements IFormStorage {
  currentFormOptions?: CurrentFormOptions
  private readonly forms: Record<string, FormWithVersions>

  /**
   * The form storage constructor.
   * @param onLoadForm the callback function called when form is loaded.
   */
  constructor(private onLoadForm: (options?: CurrentFormOptions) => void) {
    this.forms = {
      a: {
        versions: {
          1: createForm('a1'),
        },
      },
      b: {
        versions: {
          1: createForm('b1'),
          2: createForm('b2'),
        },
      },
      c: {
        versions: {
          1: createForm('c1'),
          2: createForm('c2'),
        },
      },
    }
  }

  /**
   * @inheritDoc
   */
  getFormNames() {
    return Promise.resolve(Object.keys(this.forms))
  }

  /**
   * @inheritDoc
   */
  removeForm(formName: string) {
    delete this.forms[formName]
    delete this.currentFormOptions
    return Promise.resolve()
  }

  /**
   * @inheritDoc
   */
  getForm = (formName?: string, options?: CurrentFormOptions) => {
    if (!formName) throw new Error(`formName is required`)
    const formVersion = this.getNearestExistingVersion(formName, options?.formVersion as number) ?? 1
    const result = this.forms[formName]?.versions?.[formVersion]

    if (!result) throw new Error(`Cannot find form '${formName}'`)

    this.currentFormOptions = result ? toFormOptions(formName, formVersion ?? 1) : undefined
    this.onLoadForm(this.currentFormOptions)
    return Promise.resolve(result)
  }

  /**
   * @inheritDoc
   */
  saveForm(formName: string, formValue: string) {
    this.forms[formName] ??= {versions: {}}
    const version = this.currentFormOptions?.formVersion ?? 1
    this.forms[formName].versions[version] = formValue
    this.currentFormOptions = toFormOptions(formName, version)

    return Promise.resolve()
  }

  /**
   * Adding new version
   */
  addVersion() {
    if (!this.currentFormOptions) return
    const {formName, formVersion} = this.currentFormOptions
    const formValue = this.forms[formName].versions[formVersion ?? 1]
    const version = Object.keys(this.forms[formName].versions).length + 1
    this.forms[formName].versions[version] = formValue
    this.currentFormOptions = toFormOptions(formName, version)
    this.onLoadForm(this.currentFormOptions)
  }

  /**
   * Removing version
   * @param version the form version
   */
  deleteVersion(version: number) {
    if (!this.currentFormOptions) return
    const {formName, formVersion} = this.currentFormOptions
    delete this.forms[formName].versions[version]
    if (formVersion === version) {
      this.currentFormOptions.formVersion = this.getNearestExistingVersion(formName, version) ?? 1
      this.onLoadForm(this.currentFormOptions)
    }
  }

  /**
   * @inheritDoc
   */
  getFormVersions(name?: string): Promise<number[]> {
    const formName = name ?? this.currentFormOptions?.formName
    if (!formName) return Promise.resolve([])
    return Promise.resolve(Object.keys(this.forms[formName].versions).map(Number))
  }

  private getNearestExistingVersion(formName: string, version = 1) {
    if (this.forms[formName].versions[version]) return version
    if (this.forms[formName].versions[version - 1]) return version - 1
    const versions = Object.keys(this.forms[formName].versions)
    if (versions[0]) return Number(versions[0])
    return
  }
}
