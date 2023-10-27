import styled from '@emotion/styled'
import {
  ActionDefinition,
  ActionParameters,
  AsyncFunction,
  CalculableResult,
  NamedActionDefinition,
  useStore
} from '@react-form-builder/core'
import {useEffect, useMemo, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Form, FormInstance, Schema} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {GenericCodeEditor} from '../../../../calculation/GenericCodeEditor'
import {Columns, Rows} from '../../../../components/Containers'
import {Header} from '../../../../ui/BottomPanel/Header'
import type {Parameter} from '../ActionList/ActionItem/components/ArgumentList/ArgumentItem/Parameter'
import {ParameterList} from './components/ParameterList'

/**
 * Represents data for the custom action editor.
 */
export type CustomActionEditorData = {
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

type FormModel = CustomActionEditorData & { actionParameters?: Parameter[] }

const paramsToArray = (params?: ActionParameters): Parameter[] | undefined => {
  if (!params) return
  return Object.entries(params).map(([name, type]) => [name, type])
}

const paramsFromArray = (params?: Parameter[]): ActionParameters | undefined => {
  if (!params) return
  const result: ActionParameters = {}
  params.forEach(([name, type]) => result[name] = type)
  return result
}

/**
 * The properties of the CustomActionEditor component.
 */
export interface CustomActionEditorProps {
  /**
   * The data for the custom action editor.
   */
  customAction: CustomActionEditorData
  /**
   * The callback function called when a custom action is saved.
   * @param namedAction the named action definition.
   */
  onSave: (namedAction: NamedActionDefinition) => void
}

/**
 * React form builder component that displays a custom action code editor.
 * @param props the EditableAction data
 * @param props.customAction the custom action.
 * @param props.onSave the callback function called when data should be saved.
 * @returns the React element.
 */
export const CustomActionEditor = ({customAction, onSave}: CustomActionEditorProps) => {
  const {t} = useTranslation()
  const store = useStore()
  const builderStore = useBuilderStore()
  const initialFormModel: FormModel = {...customAction, actionParameters: paramsToArray(customAction.params)}

  const [formState, setFormState] = useState<FormModel>(initialFormModel)
  const [initialBody, setInitialBody] = useState(customAction.body)

  const formRef = useRef<FormInstance>(null)

  const functionHeader = useMemo(() => makeFunctionHeader(formState.actionParameters), [formState.actionParameters])

  useEffect(() => {
    setFormState(initialFormModel)
    setInitialBody(initialFormModel.body)
    formRef.current?.cleanErrors()
  }, [customAction])

  const model = Schema.Model({
    name: Schema.Types.StringType()
      .isRequired(t('customActionEditor.nameIsRequired'))
      .addRule(name => {
        return customAction.name === formState.name || !store.form.actions[name]
      }, t('customActionEditor.actionNameExists'))
  })

  const updateFormState = (delta: Partial<FormModel>) => {
    setFormState(prevState => ({...prevState, ...delta}))
  }

  const close = () => builderStore.currentEditable = undefined

  const save = (source: string) => {
    if (!formRef.current?.check()) return
    const actionDefinition = ActionDefinition.sourceAction(source, paramsFromArray(formState.actionParameters))
    const namedAction: NamedActionDefinition = {name: formState.name, actionDefinition}
    onSave?.(namedAction)
  }

  const compile = (source: string): CalculableResult => {
    AsyncFunction(source)
    return CalculableResult.success(t('testingEditor.compilationOk'))
  }

  return <>
    <Header>
      {t('bottomPanel.editCustomAction')}
    </Header>
    <Container>
      <Rows gap={10}>
        <Form model={model} checkTrigger={'change'} formValue={formState} ref={formRef}
              onChange={data => updateFormState({name: data.name})}>
          <Form.Control name={'name'} style={{width: '100%'}}/>
        </Form>
        <GenericCodeEditor beginContextLine={functionHeader}
                           endContextLine="}" source={initialBody ?? ''}
                           onSave={save} onClose={close}
                           onCompile={compile} compact
        />
      </Rows>
      <ParameterList value={formState.actionParameters}
                     onChange={value => updateFormState({actionParameters: value})}/>
    </Container>
  </>
}

const Container = styled(Columns)`
  gap: 20px;
  flex: 1;
  min-height: 0;
`

const makeFunctionHeader = (params?: Parameter[]) => {
  let types = '@param {} args - the action arguments.'
  if (params?.length) {
    const names: string[] = params.map(([name, type]) => `${name}: ${type}`)
    types = `@param {{${names.join(', ')}}} args - the action parameters.`
  }

  return `/**
 * @param {ActionEventArgs} e - the action arguments.
 * ${types}
 */
async function Action (e, args) {`
}
