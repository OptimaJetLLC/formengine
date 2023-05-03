export interface FormStorage {
  getFormNames: () => Promise<string[]>
  removeForm: (formName: string) => Promise<any>
  getForm: (formName: string) => Promise<string>
  saveForm: (formName: string, formValue: string) => Promise<any>
}
