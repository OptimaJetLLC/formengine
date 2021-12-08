import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {IconButton, Popover, Whisper} from 'rsuite';
import {store} from "../../stores/Store";
import Toolbar from "./Toolbar";
import PlusIcon from "@rsuite/icons/Plus";
import {observer} from "mobx-react";

const AddButton = observer(() => {
    const [showPopup, setShowPopup] = useState(false);

    const {isDragging} = store;
    useEffect(() => {
        if (isDragging) setShowPopup(false);
    }, [isDragging]);

    const backdropProps = {showPopup, isDragging};

    const Popover = <STooltip children={<Toolbar/>} showPopup={showPopup} full/>;
    return <div>
        <Backdrop {...backdropProps} onClick={() => setShowPopup(!showPopup)}/>
        <Whisper open={showPopup} placement="bottom" speaker={Popover} trigger={"none"}>
            <SButton onClick={() => setShowPopup(!showPopup)}
                     icon={<ButtonIcon className={showPopup ? "active" : ""}/>} color="green"
                     appearance={"primary"} circle/>
        </Whisper>
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

const SButton = styled(IconButton)`
  position: absolute;
  left: calc(50% - 20px);
  transform: scale(1.2);
  z-index: 14;
`

const STooltip = styled(Popover)<{ showPopup: boolean }>`
  maxWidth: 800px;
  padding: 20px;
  border-radius: 10px;
  color: white;
  box-shadow: 0 0 15px rgb(0 0 0 / 25%);
  opacity: ${(props: any) => props.showPopup ? 1 : 0};
  display: ${(props: any) => props.showPopup ? "initial" : "none"};
  background-color: rgb(51 51 51 / 80%);

  .rs-popover-arrow::after {
    border-bottom-color: rgb(51 51 51 / 80%) !important;
  }
`

const ButtonIcon = styled(PlusIcon)`
  transition: transform 0.2s ease;

  &.active {
    transform: rotate(45deg);
  }
`

export default AddButton;