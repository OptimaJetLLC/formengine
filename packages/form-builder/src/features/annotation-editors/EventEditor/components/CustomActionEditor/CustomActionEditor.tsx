import styled from '@emotion/styled'
import {ActionDefinition, AsyncFunction, Parameter, toParameterWithType, useStore} from '@react-form-builder/core'
import {useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup, Form, FormInstance, Schema} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {CodeEditor} from '../../../../components/CodeEditor'
import {Columns, Rows} from '../../../../components/Containers'
import {Header} from '../../../../ui/BottomPanel/Header'
import {ParameterList} from './components/ParameterList'

/**
 * Represents data for the custom action editor.
 */
export type CustomActionEditorData = { editorId: any, name: string, body: string, params?: Parameter[] }

type FormModel = CustomActionEditorData & { errors?: string }

/**
 * The properties of the CustomActionEditor component.
 */
export interface CustomActionEditorProps {
  customAction: CustomActionEditorData
  onSave: (customAction: ActionDefinition) => void
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

  const [formState, setFormState] = useState<FormModel>(customAction)
  const [initialBody, setInitialBody] = useState(customAction.body)

  const formRef = useRef<FormInstance>(null)

  useEffect(() => {
    setFormState(customAction)
    setInitialBody(customAction.body)
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

    if (!formState.params?.length) delete formState.params
    const data = JSON.parse(JSON.stringify(formState))
    const actionDefinition = ActionDefinition.sourceAction(data.name, data.body, data.params)
    onSave?.(actionDefinition)
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
          <CodeEditor key={customAction.editorId} beginContextLine={makeFunctionHeader(formState.params)} endContextLine="}"
                      initialValue={initialBody ?? ''}
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
      <ParameterList value={formState.params} onChange={value => updateFormState({params: value})}/>
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
  overflow: hidden;
`

const makeFunctionHeader = (params?: Parameter[]) => {
  let types = '\n* @param {} args - the action arguments.'
  if (params?.length) {
    const names: string[] = params.map(toParameterWithType).map(([name, type]) => name + ': ' + type)
    types = `\n* @param {{${names.join(', ')}}} args - the action parameters.`
  }

  return `/**${types}
* @param {ActionEventArgs} e - the action arguments.
*/
async function Action (args, e) {`
}
