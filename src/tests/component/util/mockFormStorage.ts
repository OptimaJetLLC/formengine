import {IFormStorage} from '@react-form-builder/designer'

const createForm = (name?: string) => `
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "rsLabel1",
        "type": "RsLabel",
        "htmlAttributes": [
          {
            "name": "data-testid",
            "value": "${name}"
          }
        ]
      }
    ]
  }
}
`

type MockFormStorageOptions = {
  onLoadForm?: (formName?: string) => void
  onSaveForm?: (formName: string) => void
  formNames?: string[]
}

export class MockFormStorage implements IFormStorage {
  private readonly onLoadForm: MockFormStorageOptions['onLoadForm']
  private readonly onSaveForm: MockFormStorageOptions['onSaveForm']
  private readonly formNames: string[]

  constructor(options?: MockFormStorageOptions) {
    this.onLoadForm = options?.onLoadForm
    this.onSaveForm = options?.onSaveForm
    this.formNames = options?.formNames ?? []
  }

  getForm = (formName?: string) => {
    this.onLoadForm?.(formName)
    return Promise.resolve(createForm(formName))
  }

  getFormNames(): Promise<string[]> {
    return Promise.resolve(this.formNames)
  }

  removeForm(formName: string): Promise<any> {
    return Promise.resolve(undefined)
  }

  saveForm(formName: string): Promise<any> {
    if (!this.formNames.includes(formName)) this.formNames.push(formName)
    this.onSaveForm?.(formName)
    return Promise.resolve(undefined)
  }
}
