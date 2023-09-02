import styled from '@emotion/styled'
import {
  ActionData,
  AsyncFunction,
  ComponentStore,
  CustomActionDefinition,
  getActionList,
  Parameter,
  Store,
  toParameterWithType,
  useStore
} from '@react-form-builder/core'
import {assign} from 'lodash-es'
import {useEffect, useReducer, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup, Form, FormInstance, Schema} from 'rsuite'
import {EditableAction} from '../../../../../stores/BuilderStore'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {CodeEditor} from '../../../../components/CodeEditor'
import {Columns, Rows} from '../../../../components/Containers'
import {Header} from '../../../../ui/BottomPanel/Header'
import {ParameterList} from './components/ParameterList'
import {ParamAction} from './types'

/**
 * React form builder component that displays a custom action code editor.
 * @param root0 the EditableAction data
 * @param root0.actionData the action data
 * @param root0.eventName the event name
 * @returns the React element.
 */
export const CustomActionEditor = ({actionData, eventName}: EditableAction) => {
  const {t} = useTranslation()
  const store = useStore()
  const storeProps = store.form.componentTree.store.props
  const builderStore = useBuilderStore()
  const action = findAction(store, actionData.name) ?? {name: '', body: ''}
  const formRef = useRef<FormInstance>(null)
  const [actionState, setActionState] = useActionState(action, actionData)
  const [params, dispatchParams] = useReducer(paramsReducer, action?.params)

  useEffect(() => {
    dispatchParams({type: 'reset', params: action?.params, index: 0})
  }, [actionData])

  const model = Schema.Model({
    name: Schema.Types.StringType()
      .isRequired(t('customActionEditor.nameIsRequired'))
      .addRule(name => actionData.name === actionState.name || !findAction(store, name), t('customActionEditor.actionNameExists'))
  })

  const close = () => builderStore.currentEditable = undefined

  const save = () => {
    if (!formRef.current?.check()) return
    try {
      AsyncFunction(actionState.body)
    } catch (e) {
      setActionState({errors: (e as Error).message})
      return
    }

    const value = {...actionState, params}
    storeProps.actions ??= {value: []}
    if (findAction(store, actionData.name || actionState.name)) {
      assign(action, value)
      return
    }
    storeProps.actions.value.push(value)

    const componentStore = builderStore.oneSelected?.store
    if (componentStore) ComponentStore.addEventHandler(componentStore, eventName, {name: value.name ?? '', type: 'custom'})
  }

  return <>
    <Header>
      {t('bottomPanel.editCustomAction')}
    </Header>
    <Container>
      <Rows gap={10}>
        <Form model={model} checkTrigger={'change'} formValue={actionState} onChange={setActionState} ref={formRef}>
          <Form.Control name={'name'} style={{width: '100%'}}/>
        </Form>
        <EditorContainer>
          <CodeEditor beginContextLine={makeFunctionHeader(params)} endContextLine="}"
                      initialValue={actionState.initialBody ?? ''} onChange={body => setActionState({body})}/>
        </EditorContainer>
        <div>
          <ButtonGroup size={'sm'}>
            <Button appearance="primary" onClick={() => save()}>{t('common.save')}</Button>
            <Button appearance="ghost" onClick={close}>{t('common.close')}</Button>
          </ButtonGroup>
          {!!actionState.errors && <label style={{color: 'red', marginInline: 10}}>{actionState.errors}</label>}
        </div>
      </Rows>
      <ParameterList value={params} dispatch={dispatchParams}/>
    </Container>
  </>
}

type ActionState = { name?: string, body?: string, initialBody?: string, errors?: string }

function useActionState({name, body}: CustomActionDefinition, actionData: ActionData): [ActionState, any] {
  const initialState = {name, body, initialBody: body, errors: ''}
  const [state, setState] = useState<ActionState>(initialState)
  useEffect(() => setState(initialState), [actionData])
  const setActionState = (newState: ActionState) => setState((prevState) => ({...prevState, ...newState}))
  return [state, setActionState]
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

function paramsReducer(params: Parameter[] | undefined, action: ParamAction) {
  const {index, param, type, params: parameters} = action
  switch (type) {
    case 'reset':
      return [...parameters ?? []]
    case 'create': {
      const paramName = `prop${(index)}`
      return params ? [...params, paramName] : [paramName]
    }
    case 'update':
      param && params?.splice(index, 1, param)
      return params?.concat()
    case 'remove':
      params?.splice(index, 1)
      return params?.concat()
  }
}

const findAction = (store: Store, name?: string) => getActionList(store, 'custom')?.find(a => a.name === name) as CustomActionDefinition

const makeFunctionHeader = (params?: Parameter[]) => {
  let types = ''
  if (params?.length) {
    const names: string[] = params.map(toParameterWithType).map(([name, type]) => name + ': ' + type)
    types = `\n* @param {{${names.join(', ')}}} args - the action parameters.`
  } else {
    types = '\n* @param {} args - the action arguments.'
  }

  return `/**${types}
* @param {ActionEventArgs} e - the action arguments.
*/
async function Action (args, e) {`
}
