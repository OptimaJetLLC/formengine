import {CustomActionDefinition, Parameter, toParameterWithType} from 'fb-core'
import React, {useReducer, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Button, Col, Grid, Input, Modal} from 'rsuite'
import {JsEditor} from '../../../../components/JsEditor'
import {ParameterList} from './components/ParameterList'
import {ParamAction} from './types'

interface CustomActionEditorProps {
  onCancel: () => void
  onSave: (value: CustomActionDefinition) => void
  data?: CustomActionDefinition
  onEnter: () => void
}

export const CustomActionEditor = ({onCancel, onSave, data, onEnter}: CustomActionEditorProps) => {
  const {t} = useTranslation()
  const [name, setName] = useState(data?.name ?? '')
  const [body, setBody] = useState(data?.body ?? '')
  const [params, dispatchParams] = useReducer(paramsReducer, data?.params)
  const [error, setError] = useState<string>()

  const handleSave = () => {
    try {
      new Function(body)
      onSave({name, body, params})
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const functionHeader = `function (${getParamString(params)}e: ActionEventArgs):`

  if (!data) return null

  return (
    <Modal open={true} onClose={onCancel} size="lg" onEnter={onEnter}>
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
            <Modal.Title>{functionHeader}</Modal.Title>
            <JsEditor value={body} onChange={setBody}/>
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
    case 'create':
      const paramName = `param${(index)}`
      return params ? [...params, paramName] : [paramName]
    case 'update':
      param && params?.splice(index, 1, param)
      return params?.concat()
    case 'remove':
      params?.splice(index, 1)
      return params?.concat()
  }
}

function getParamString(params?: Parameter[]) {
  if (!params) return ''
  const names: string[] = params.map(toParameterWithType).map(([name, type]) => name + ': ' + type)
  return `args: {${names.join(', ')}}, `
}
