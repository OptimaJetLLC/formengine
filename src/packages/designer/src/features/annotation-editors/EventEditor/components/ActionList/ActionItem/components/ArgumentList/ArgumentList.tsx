import styled from '@emotion/styled'
import {namedObserver, useStore} from '@react-form-builder/core'
import {ArrowDownLine, ArrowUpLine} from '@rsuite/icons'
import {t} from 'i18next'
import {isEmpty} from 'lodash-es'
import type {MouseEventHandler} from 'react'
import {useCallback, useEffect, useReducer} from 'react'
import {Animation, Button} from 'rsuite'
import {useComputed} from '../../../../../../../../utils/useComputed'
import {Rows} from '../../../../../../../components/Containers'
import {useActionData} from '../../contexts/ActionDataContext'
import {ArgumentItem} from './ArgumentItem'

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

const rowStyle = {marginBlock: 8, paddingInline: 10}
const expandStyle = {marginTop: -2}

const RawArgumentList = () => {
  const store = useStore()
  const data = useActionData()
  const getAction = useCallback(() => store.findAction(data), [data, store])
  const action = useComputed(getAction)
  const [show, toggleShow] = useReducer(state => !state, false)
  const ExpandIcon = show ? ArrowUpLine : ArrowDownLine
  const preventClick = useCallback<MouseEventHandler<HTMLDivElement>>((e) => e.stopPropagation(), [])

  useClearableArguments()

  if (!Object.keys(action.params).length) return null

  return (
    <div onMouseDown={preventClick}>
      <Animation.Collapse in={show} unmountOnExit>
        <Rows gap={1} style={rowStyle}>
          {Object.entries(action.params).map((arg, index) =>
            <ArgumentItem key={index} data={arg}/>)}
        </Rows>
      </Animation.Collapse>

      <ExpandButton block onClick={toggleShow}>
        <>
          {t('actions.arguments')}
          <ExpandIcon style={expandStyle}/>
        </>
      </ExpandButton>
    </div>
  )
}

export const ArgumentList = namedObserver('ArgumentList', RawArgumentList)
