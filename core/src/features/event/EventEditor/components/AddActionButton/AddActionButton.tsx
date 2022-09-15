import {css} from '@emotion/css'
import PlusIcon from '@rsuite/icons/Plus'
import {observer} from 'mobx-react'
import React, {useCallback, useRef, useState} from 'react'
import {IconButton} from 'rsuite'
import {useComponentData} from '../../../../../utils/contexts/ComponenDataContext'
import {Popover} from '../../../../ui/Popover'
import {NewActionData} from '../../../types'
import {SelectAction} from './components/SelectAction'
import {addActionToEvent, initEvent} from './utils'

interface AddActionButtonProps {
  eventKey: string,
}

export const AddActionButton = observer(({eventKey}: AddActionButtonProps) => {
  const {componentStore} = useComponentData()
  const [show, setShow] = useState(false)
  const ref = useRef(null)
  const switchShow = useCallback(() => setShow(show => !show), [])

  const onSelect = useCallback((value: NewActionData) => {
    switchShow()
    initEvent(componentStore, eventKey)
    addActionToEvent(componentStore, eventKey, value)
  }, [])

  return (
    <>
      <IconButton
        block
        icon={<PlusIcon/>}
        appearance="default"
        size="sm"
        ref={ref}
        onClick={switchShow}
      />
      <Popover
        placement={'left-start'}
        className={css`z-index: 20`}
        parent={ref.current}
        show={show}
      >
        <SelectAction onSelect={onSelect}/>
      </Popover>
    </>
  )
})

