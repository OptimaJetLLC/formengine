import styled from '@emotion/styled'
import {ActionDefinition, ActionParameters, AsyncFunction, NamedActionDefinition, useStore} from '@react-form-builder/core'
import {useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup, Form, FormInstance, Schema} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {CodeEditor} from '../../../../components/CodeEditor'
import {Columns, Rows} from '../../../../components/Containers'
import {Header} from '../../../../ui/BottomPanel/Header'
import type {Parameter} from '../ActionList/ActionItem/components/ArgumentList/ArgumentItem/Parameter'
import {ParameterList} from './components/ParameterList'

/**
 * Represents data for the custom action editor.
 */
export type CustomActionEditorData = { editorId: any, name: string, body: string, params?: ActionParameters }

type FormModel = CustomActionEditorData & { errors?: string, actionParameters?: Parameter[] }

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
  customAction: CustomActionEditorData
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

  const save = () => {
    if (!formRef.current?.check()) return
    try {
      AsyncFunction(formState.body)
    } catch (e) {
      updateFormState({errors: (e as Error).message})
      return
    }

    const actionDefinition = ActionDefinition.sourceAction(formState.body, paramsFromArray(formState.actionParameters))
    const namedAction: NamedActionDefinition = {name: formState.name, actionDefinition}
    onSave?.(namedAction)
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
        <EditorContainer>
          <CodeEditor key={customAction.editorId} beginContextLine={makeFunctionHeader(formState.actionParameters)}
                      endContextLine="}" initialValue={initialBody ?? ''}
                      onChange={body => updateFormState({body})}/>
        </EditorContainer>
        <div>
          <ButtonGroup size={'sm'}>
            <Button appearance="primary" onClick={() => save()}>{t('common.save')}</Button>
            <Button appearance="ghost" onClick={close}>{t('common.close')}</Button>
          </ButtonGroup>
          {!!formState.errors && <label style={{color: 'red', marginInline: 10}}>{formState.errors}</label>}
        </div>
      </Rows>
      <ParameterList value={formState.actionParameters}
                     onChange={value => updateFormState({actionParameters: value})}/>
    </Container>
  </>
}

const EditorContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;
`

const Container = styled(Columns)`
  gap: 20px;
  flex: 1;
  min-height: 0;
`

const makeFunctionHeader = (params?: Parameter[]) => {
  let types = '@param {} args - the action arguments.'
  if (params?.length) {
    const names: string[] = params.map(([name, type]) => name + ': ' + type)
    types = `@param {{${names.join(', ')}}} args - the action parameters.`
  }

  return `/**
 * @param {ActionEventArgs} e - the action arguments.
 * ${types}
 */
async function Action (e, args) {`
}
