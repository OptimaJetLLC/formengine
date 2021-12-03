import React, {useState} from 'react';
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
    const backdropProps = {showPopup, isDragging};
    const popoverProps: TippyProps = {
        visible: showPopup,
        content: <Toolbar/>, arrow: true, disabled: isDragging, interactive: true,
        onShow: () => setShowPopup(true), onHide: () => setShowPopup(false),
        maxWidth: '800px', placement: 'bottom', offset: [0, -25],
        animation: 'fade', duration: [null, 0]
    }

    //TODO заменить Tippy на свой компонент тултипа, который при скрывании не удаляется из дерева,
    //а делается невидимым (иначе DnD выдает много ошибок в консоль)
    return <div style={{width: 60, ...style}}>
        <Backdrop {...backdropProps} />
        <Popover {...popoverProps}>
            <HoverZone>
                <AddButton onMouseOver={() => setShowPopup(true)} onMouseLeave={() => setShowPopup(false)}
                           icon={<PlusIcon/>} color="green"
                           appearance={"primary"} circle/>
            </HoverZone>
        </Popover>
    </div>
})

const Backdrop = styled.div<{ showPopup: boolean, isDragging: boolean }>`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background-color: black;
  height: ${(props: any) => (!props.showPopup || props.isDragging) ? 0 : '100%'};
  opacity: ${(props: any) => (!props.showPopup || props.isDragging) ? 0 : 0.25};
  z-index: 11;
  transition: opacity 0.2s ease;
`

const HoverZone = styled.div`
  padding: 10px 25px;
  position: absolute;
  left: calc(50% - 43px);
  //transform: translateX(100%);
  margin-top: -10px;
  z-index: 12;
`

const Popover = styled(Tippy)`
  border-radius: 10px;
  background-color: rgb(51 51 51 / 80%);
  box-shadow: 0 0 15px rgb(0 0 0 / 25%);
  margin-top: 20px;
`

export default AddButton;