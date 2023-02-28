import {Dispatch, useRef} from 'react'
import {Button, Modal} from 'rsuite'
import {useTranslationPart} from '../../../../../localization/hooks'
import {Box} from '../../../../../ui/Containers'
import {Parameter} from '../../../../types'
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

      <Box px={10}>
        {value?.map((param, index) => <ParameterItem key={index} index={index} value={param} dispatch={dispatch}/>)}
      </Box>

      <Button block children={t('add')} onClick={handleCreateParam}/>
    </div>
  )
}
