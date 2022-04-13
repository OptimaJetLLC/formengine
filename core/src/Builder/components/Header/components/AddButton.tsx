import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled'
import {IconButton} from 'rsuite';
import PlusIcon from "@rsuite/icons/Plus";
import {observer} from "mobx-react";
import {ComponentBar} from "./ComponentBar";
import {Popover} from "../../../../features/ui/Popover";
import {css, cx} from "@emotion/css";
import {useDragLayer} from "react-dnd";

export const AddButton = observer(() => {
    const [show, setShow] = useState(false);
    const ref = useRef(null)
    const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))

    useEffect(() => {
        //Задержка нужна, чтобы не срабатывало слишком быстро)
        if (isDragging) setTimeout(() => setShow(false))
    }, [isDragging]);

    const openToggle = useCallback(() => setShow(show => !show), [])

    return <>
        <Backdrop open={show} onClick={openToggle}/>
        <IconButton
            className={""}
            ref={ref}
            onClick={openToggle}
            icon={<PlusIcon
                className={cx(plusIcon, {active: show})}
            />}
            color="green"
            appearance={"primary"}
            circle
        />
        <Popover
            parent={ref.current}
            show={show}
            className={popover}
        >
            <ComponentBar/>
        </Popover>
    </>
})

const Backdrop = styled.div<{ open: boolean }>`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background-color: black;
  height: ${({open}) => open ? '100%' : 0};
  opacity: ${({open}) => open ? 0.25 : 0};
  z-index: 11;
  transition: opacity .2s ease;
`

const popover = css`
  z-index: 11;
  max-width: 800px;
  padding: 20px;
  border-radius: 10px;
  color: white;
  box-shadow: 0 0 15px rgb(0 0 0 / 25%);
  transition: opacity .1s ease, visibility .1s linear !important;
  background-color: rgb(51 51 51 / 80%);
`

const plusIcon = css`
  transition: transform 0.2s ease;

  &.active {
    transform: rotate(45deg);
  }
`
