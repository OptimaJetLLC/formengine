import {css, cx} from '@emotion/css'
import styled from '@emotion/styled'
import PlusIcon from '@rsuite/icons/Plus'
import {observer} from 'mobx-react'
import {useCallback, useEffect, useRef, useState} from 'react'
import {useDragLayer} from 'react-dnd'
import {IconButton} from 'rsuite'
import {ComponentBar} from '../../ComponentBar'

export const AddButton = observer(() => {
  const [show, setShow] = useState(false)
  const [showPermanent, setShowPermanent] = useState(false)
  const ref = useRef(null)
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))

  useEffect(() => {
    //Задержка нужна, чтобы не срабатывало слишком быстро
    setTimeout(() => setShow(!isDragging && showPermanent))
  }, [isDragging])

  const openToggle = useCallback(() => {
    setShow(show => !show)
    setShowPermanent(showPermanent => !showPermanent)
  }, [])

  return <>
    <IconButton ref={ref} onClick={openToggle} icon={<PlusIcon className={cx(plusIcon, {show})}/>}
                style={{padding: 8}} color="green" appearance={'primary'} circle/>
    <Popover className={cx({show})}>
      <ComponentBar draggable={true}/>
    </Popover>
  </>
})

const Popover = styled.div`
  display: none;

  &.show {
    display: flex;
  }

  position: absolute;
  top: 35px;
  max-height: calc(100% - 75px);
  z-index: 12;
  inset-inline-start: 0;
  max-width: 280px;
  margin-top: 25px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgb(0 0 0 / 25%);
  transition: opacity .1s ease, visibility .1s linear !important;
  background-color: var(--rs-btn-default-bg);
`

const plusIcon = css`
  transition: transform 0.2s ease;

  &.show {
    transform: rotate(45deg);
  }
`
