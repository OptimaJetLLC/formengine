import {Parameter} from '@react-form-builder/core'
import {Dispatch, useRef} from 'react'
import {Button, Modal} from 'rsuite'
import {Rows} from '../../../../../components/Containers'
import {useTranslationPart} from '../../../../../localization/hooks'
import {ParamAction} from '../types'
import {ParameterItem} from './ParameterItem'

/**
 * The React {@link ParameterList} component properties.
 */
interface ParameterPanelProps {

  /**
   * The array of action parameters.
   */
  value?: Parameter[]
  /**
   * Dispatcher for functions that work with action parameters.
   */
  dispatch: Dispatch<ParamAction>
}

/**
 * React form builder component that displays the list of action parameters.
 * @param props the React component properties.
 * @param props.value the array of action parameters.
 * @param props.dispatch the dispatcher for functions that work with action parameters.
 * @returns the React element.
 */
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
