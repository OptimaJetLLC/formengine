import React, {useState} from 'react';
import styled from '@emotion/styled'
import {IconButton} from 'rsuite';
import {store} from "../../stores/Store";
import Toolbar from "./Toolbar";
import PlusIcon from "@rsuite/icons/Plus";
import Tippy from "@tippyjs/react";
import {observer} from "mobx-react";


const AddButton = observer(({style}: any) => {
    const [showPopup, setShowPopup] = useState(false);
    const AddButton = styled(IconButton)`
      transform: scale(1.2);
      z-index: 11;
    `

    const {isDragging} = store;
    const backdropProps = {showPopup, isDragging};

    console.log(isDragging)
    return <div {...style}>
        <Backdrop {...backdropProps}/>
        <Popover content={<Toolbar/>} maxWidth='none' placement='bottom'
                 arrow disabled={isDragging} interactive={true} animation='fade'
                 onShow={_ => setShowPopup(true)} onHide={_ => setShowPopup(false)}
                 duration={[null, 0]} animateFill={true}>
            <div><AddButton icon={<PlusIcon/>} color="green" appearance={"primary"} circle/></div>
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

const Popover = styled(Tippy)`
  border-radius: 10px;
  background-color: rgb(51 51 51 / 80%);
  box-shadow: 0 0 15px rgb(0 0 0 / 25%);
`

export default AddButton;