import {isEmpty, namedObserver, useStore} from '@react-form-builder/core'
import {ArrowDownLine, ArrowUpLine} from '@rsuite/icons'
import {t} from 'i18next'
import type {MouseEventHandler} from 'react'
import {useCallback, useEffect, useReducer} from 'react'
import {Animation, Button} from 'rsuite'
import {useComputed} from '../../../../../../../../utils/useComputed'
import {Rows} from '../../../../../../../components/Containers'
import {useActionData} from '../../contexts/ActionDataContext'
import {ArgumentItem} from './ArgumentItem/ArgumentItem'

import styles from './ArgumentList.module.css'

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
        <Rows className={styles.rows}>
          {Object.entries(action.params).map((arg, index) =>
            <ArgumentItem key={index} data={arg}/>)}
        </Rows>
      </Animation.Collapse>
      <Button block className={styles.expandButton} onClick={toggleShow}>
        <>
          {t('actions.arguments')}
          <ExpandIcon className={styles.expand}/>
        </>
      </Button>
    </div>
  )
}

export const ArgumentList = namedObserver('ArgumentList', RawArgumentList)
