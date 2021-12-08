import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {IconButton} from 'rsuite';
import {store} from "../../stores/Store";
import Toolbar from "./Toolbar";
import PlusIcon from "@rsuite/icons/Plus";
import Tippy, {TippyProps} from "@tippyjs/react";
import {observer} from "mobx-react";

const AddButton = observer(({style}: any) => {
    const [showPopup, setShowPopup] = useState(false);
    const AddButton = styled(IconButton)`
      transform: scale(1.2);
      z-index: 14;
    `

    const {isDragging} = store;
    useEffect(() => {
        if (isDragging) setShowPopup(false);
    }, [isDragging]);

    const backdropProps = {showPopup, isDragging};
    const popoverProps: TippyProps = {
        visible: true,
        content: <Toolbar/>, arrow: true, disabled: isDragging, interactive: true,
        maxWidth: '800px', placement: 'bottom', offset: [0, 0],
        animation: 'fade', duration: [null, 0]
    }

    //TODO заменить Tippy на свой компонент тултипа, который при скрывании не удаляется из дерева,
    //а делается невидимым (иначе DnD выдает много ошибок в консоль)
    return <div style={{width: 60, ...style}}>
        <Backdrop {...backdropProps} onClick={() => setShowPopup(!showPopup)}/>
        <Popover {...popoverProps} showPopup={showPopup}>
            <HoverZone onClick={() => setShowPopup(!showPopup)}>
                <AddButton onClick={() => setShowPopup(!showPopup)}
                           icon={<ButtonIcon className={showPopup ? "active" : ""}/>} color="green"
                           appearance={"primary"} circle/>
            </HoverZone>
        </Popover>
    </div>
})

const Backdrop = styled.div<{ showPopup: boolean }>`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background-color: black;
  height: ${(props: any) => props.showPopup ? '100%' : 0};
  opacity: ${(props: any) => props.showPopup ? 0.25 : 0};
  z-index: 11;
  transition: opacity 0.2s ease;
`

const HoverZone = styled.div`
  padding: 10px 25px;
  position: absolute;
  left: calc(50% - 43px);
  cursor: pointer;
  margin-top: -10px;
  z-index: 12;
`

const Popover = styled(Tippy)<{ showPopup: boolean }>`
  border-radius: 10px;
  background-color: rgb(51 51 51 / 80%);
  box-shadow: 0 0 15px rgb(0 0 0 / 25%);
  visibility: ${(props: any) => props.showPopup ? "visible" : "none"};
  opacity: ${(props: any) => props.showPopup ? 1 : 0};
`

const ButtonIcon = styled(PlusIcon)`
  transition: transform 0.2s ease;

  &.active {
    transform: rotate(45deg);
  }
`

export default AddButton;