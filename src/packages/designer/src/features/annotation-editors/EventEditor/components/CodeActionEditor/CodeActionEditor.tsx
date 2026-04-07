import type {ActionParameters, NamedActionDefinition} from '@react-form-builder/core'
import {ActionDefinition, AsyncFunction, CalculableResult, useStore} from '@react-form-builder/core'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import type {FormInstance} from 'rsuite'
import {Form, Schema} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {GenericCodeEditor} from '../../../../calculation/GenericCodeEditor'
import {Columns, Rows} from '../../../../components/Containers'
import {Header} from '../../../../ui/BottomPanel/Header'
import styles from './CodeActionEditor.module.css'
import type {ParameterListItem} from './components/ParameterList'
import {ParameterList, toParameterListItem} from './components/ParameterList'

const makeFunctionHeader = (params?: ParameterListItem[]) => {
  let types = '@param {} args - the action parameters arguments.'
  if (params?.length) {
    const names: string[] = params
      .map(item => item.parameter)
      .map(([name, type]) => `${name}: ${type}`)
    types = `@param {{${names.join(', ')}}} args - the action parameters arguments.`
  }

  return `/**
 * @param {ActionEventArgs} e - the action arguments.
 * ${types}
 */
async function Action (e, args) {`
}

/**
 * Represents data for the code action editor.
 */
export type CodeActionEditorData = {
  /**
   * The action name.
   */
  name: string
  /**
   * The action source code.
   */
  body: string
  /**
   * The set of action parameters.
   */
  params?: ActionParameters
}

type FormModel = CodeActionEditorData & { actionParameters?: ParameterListItem[] }

const paramsToParameterListItems = (params?: ActionParameters): ParameterListItem[] | undefined => {
  if (!params) return
  return Object.entries(params)
    .map(([name, type]) => toParameterListItem([name, type]))
}

const parameterListItemsToParams = (params?: ParameterListItem[]): ActionParameters | undefined => {
  if (!params) return
  const result: ActionParameters = {}
  params
    .map(item => item.parameter)
    .forEach(([name, type]) => result[name] = type)
  return result
}

/**
 * The properties of the CodeActionEditor component.
 */
export interface CodeActionEditorProps {
  /**
   * The data for the custom action editor.
   */
  codeAction: CodeActionEditorData
  /**
   * The callback function called when a custom action is saved.
   * @param namedAction the named action definition.
   */
  onSave: (namedAction: NamedActionDefinition) => void
}

/**
 * React form builder component that displays a custom action code editor.
 * @param props the EditableAction data
 * @param props.codeAction the code action.
 * @param props.onSave the callback function called when data should be saved.
 * @returns the React element.
 */
export const CodeActionEditor = ({codeAction, onSave}: CodeActionEditorProps) => {
  const {t} = useTranslation()
  const store = useStore()
  const builderStore = useBuilderStore()
  const initialFormModel: FormModel = useMemo(() => ({
    ...codeAction,
    actionParameters: paramsToParameterListItems(codeAction.params)
  }), [codeAction])

  const [formState, setFormState] = useState<FormModel>(initialFormModel)
  const [initialBody, setInitialBody] = useState(codeAction.body)

  const formRef = useRef<FormInstance>(null)

  const functionHeader = useMemo(() => makeFunctionHeader(formState.actionParameters), [formState.actionParameters])

  useEffect(() => {
    setFormState(initialFormModel)
    setInitialBody(initialFormModel.body)
    formRef.current?.cleanErrors()
  }, [codeAction, initialFormModel])

  const model = Schema.Model({
    name: Schema.Types.StringType()
      .isRequired(t('codeActionEditor.nameIsRequired'))
      .addRule(name => {
        return codeAction.name === formState.name || !store.form.actions[name]
      }, t('codeActionEditor.actionNameExists'))
  })

  const updateFormState = useCallback((delta: Partial<FormModel>) => {
    setFormState(prevState => ({...prevState, ...delta}))
  }, [])

  const close = useCallback(() => {
    builderStore.currentEditable = undefined
  }, [builderStore])

  const save = useCallback((source: string) => {
    if (!formRef.current?.check()) return
    const actionDefinition = ActionDefinition.sourceAction(source, parameterListItemsToParams(formState.actionParameters))
    const namedAction: NamedActionDefinition = {name: formState.name, actionDefinition}
    onSave?.(namedAction)
  }, [formState.actionParameters, formState.name, onSave])

  const compile = useCallback((source: string): CalculableResult => {
    AsyncFunction(source)
    return CalculableResult.success(t('testingEditor.compilationOk'))
  }, [t])

  const handleNameChange = useCallback((data: any) => updateFormState({name: data.name}), [updateFormState])

  const handleParametersChange = useCallback((value?: ParameterListItem[]) => {
    updateFormState({actionParameters: value})
  }, [updateFormState])

  return (
    <>
      <Header>
        {t('bottomPanel.editCodeAction')}
      </Header>
      <Columns className={styles.container}>
        <Rows className={styles.rows}>
          <Form model={model} checkTrigger={'change'} formValue={formState} ref={formRef}
                onChange={handleNameChange}>
            <Form.Control name={'name'} className={styles.control}/>
          </Form>
          <GenericCodeEditor beginContextLine={functionHeader}
                             endContextLine="}" source={initialBody ?? ''}
                             onSave={save} onClose={close}
                             onCompile={compile} compact
          />
        </Rows>
        <ParameterList value={formState.actionParameters}
                       onChange={handleParametersChange}/>
      </Columns>
    </>
  )
}
