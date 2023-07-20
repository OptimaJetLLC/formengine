import {CustomActionDefinition, Parameter, toParameterWithType} from '@react-form-builder/core'
import {useEffect, useReducer, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, Col, Grid, Input, Modal} from 'rsuite'
import {CodeEditor} from '../../../../components/CodeEditor'
import {ParameterList} from './components/ParameterList'
import {ParamAction} from './types'

/**
 * Properties of the React component {@link CustomActionEditor}.
 */
interface CustomActionEditorProps {
  onCancel: () => void
  onSave: (value: CustomActionDefinition) => void
  data?: CustomActionDefinition
  onEnter: () => void
}

/**
 * React form builder component that displays a custom action code editor.
 * @param props the React component properties.
 * @param props.onCancel the callback function that is called when the code editor is closed without saving data.
 * @param props.onSave the callback function that is called when the action handler is saved.
 * @param props.data the description of the custom action handler.
 * @param props.onEnter the callback that is called before opening the modal window with the code editor.
 * @returns the React element.
 */
export const CustomActionEditor = ({onCancel, onSave, data, onEnter}: CustomActionEditorProps) => {
  const {t} = useTranslation()
  const [name, setName] = useState(data?.name ?? '')
  const [body, setBody] = useState(data?.body ?? '')
  const [params, dispatchParams] = useReducer(paramsReducer, data?.params)
  const [error, setError] = useState<string>()
  const [initialValue, setInitialValue] = useState(data?.body ?? '')

  useEffect(() => {
    const initialValue = data?.body ?? ''
    setInitialValue(initialValue)
  }, [data?.body])

  const handleSave = () => {
    try {
      new Function(body)
      onSave({name, body, params})
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const functionHeader = `/**${getParamsType(params)}
* @param {ActionEventArgs} e - the action arguments.
*/
function Action (${params ? 'args, ' : ''}e) {`

  if (!data) return null

  return (
    <Modal open={true} onClose={onCancel} style={{width: '100%'}} onEnter={onEnter}>
      <Modal.Header>
        <Modal.Title>{t('codeEditor.customActionHeader')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Modal.Title>{t('common.name')}</Modal.Title>
          <Input value={name} onChange={setName}/>
        </div>
        <br/>
        <Grid fluid>
          <Col md={17}>
            <Modal.Title style={{color: 'red'}}>{error}</Modal.Title>
            <CodeEditor key={functionHeader} beginContextLine={functionHeader} endContextLine="}" initialValue={initialValue}
                        onChange={setBody} height={'80vh'}/>
          </Col>
          <Col md={6}>
            <ParameterList value={params} dispatch={dispatchParams}/>
          </Col>
        </Grid>
      </Modal.Body>

      <Modal.Footer>
        <Button children={t('common.save')} onClick={handleSave} appearance="primary"/>
        <Button children={t('common.cancel')} onClick={onCancel} appearance="subtle"/>
      </Modal.Footer>
    </Modal>
  )
}

function paramsReducer(params: Parameter[] | undefined, action: ParamAction) {
  const {index, param, type} = action
  switch (type) {
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

function getParamsType(params?: Parameter[]) {
  if (!params?.length) return ''
  const names: string[] = params.map(toParameterWithType).map(([name, type]) => name + ': ' + type)
  return `\n* @param {{${names.join(', ')}}} args - the action parameters.`
}
