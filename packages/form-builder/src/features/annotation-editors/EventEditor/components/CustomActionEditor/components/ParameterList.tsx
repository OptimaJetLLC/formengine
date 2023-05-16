import {Parameter} from '@react-form-builder/core'
import {Dispatch, useRef} from 'react'
import {Button, Modal} from 'rsuite'
import {Rows} from '../../../../../components/Containers'
import {useTranslationPart} from '../../../../../localization/hooks'
import {ParamAction} from '../types'
import {ParameterItem} from './ParameterItem'

interface ParameterPanelProps {
  value?: Parameter[]
  dispatch: Dispatch<ParamAction>
}

export const ParameterList = ({value, dispatch}: ParameterPanelProps) => {
  const paramCountRef = useRef(1)
  const t = useTranslationPart('actions')
  const handleCreateParam = () => dispatch({type: 'create', index: paramCountRef.current++})

  return (
    <div>
      <Modal.Title>{t('parameters')}</Modal.Title>

      <Rows style={{paddingBlock: 10}}>
        {value?.map((param, index) => <ParameterItem key={index} index={index} value={param} dispatch={dispatch}/>)}
      </Rows>

      <Button block children={t('add')} onClick={handleCreateParam}/>
    </div>
  )
}
