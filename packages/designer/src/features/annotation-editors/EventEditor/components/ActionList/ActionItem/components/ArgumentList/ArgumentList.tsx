import styled from '@emotion/styled'
import {namedObserver, useStore} from '@react-form-builder/core'
import {ArrowDownLine, ArrowUpLine} from '@rsuite/icons'
import {t} from 'i18next'
import {isEmpty} from 'lodash-es'
import {useCallback, useEffect, useReducer} from 'react'
import {Animation, Button} from 'rsuite'
import {useComputed} from '../../../../../../../../utils/useComputed'
import {Rows} from '../../../../../../../components/Containers'
import {useActionData} from '../../contexts/ActionDataContext'
import {ArgumentItem} from './ArgumentItem'

// Delete arguments object on unmount if it is empty.
const useClearableArguments = () => {
  const data = useActionData()

  useEffect(() => {
    return () => {
      if (isEmpty(data.args)) {
        delete data.args
      }
    }
  }, [data.args])
}

export const ArgumentList = namedObserver('ArgumentList', () => {
  const store = useStore()
  const data = useActionData()
  const getAction = useCallback(() => store.findAction(data), [data, store])
  const action = useComputed(getAction)
  const [show, toggleShow] = useReducer(state => !state, false)
  const ExpandIcon = show ? ArrowUpLine : ArrowDownLine

  useClearableArguments()

  if (!Object.keys(action.params).length) return null

  return (
    <div onMouseDown={e => e.stopPropagation()}>
      <Animation.Collapse in={show}>
        <Rows gap={1} style={{marginBlock: 8, paddingInline: 10}}>
          {Object.entries(action.params).map((arg, index) =>
            <ArgumentItem key={index} data={arg}/>)}
        </Rows>
      </Animation.Collapse>

      <ExpandButton block onClick={toggleShow}>
        <>
          {t('actions.arguments')}
          <ExpandIcon style={{marginTop: -2}}/>
        </>
      </ExpandButton>
    </div>
  )
})

const ExpandButton = styled(Button)`
  padding: 5px !important;
  border-radius: 0 !important;
  outline: 0 !important;
  color: var(--rs-btn-subtle-text) !important;

  &:focus {
    box-shadow: none;
    background-color: initial;
  }
`
