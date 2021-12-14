import React, {useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {IconButton, Popover as RPopover, Whisper} from 'rsuite';
import Toolbar from "./Toolbar";
import PlusIcon from "@rsuite/icons/Plus";
import {observer} from "mobx-react";
import {useStore} from "../../utils/StoreContext";

const AddButton = observer(() => {
    const store = useStore()
    const [open, setOpen] = useState(false);

    const {isDragging} = store;
    useEffect(() => {
        if (isDragging) setOpen(false)
    }, [isDragging]);

    const Popover = <SPopover children={<Toolbar store={store}/>} open={open} full/>;
    return <div>
        <Backdrop open={open} onClick={() => setOpen(!open)}/>
        <Whisper open placement="bottom" speaker={Popover} trigger={"none"}>
            <SButton onClick={() => setOpen(!open)}
                     icon={<ButtonIcon className={open ? "active" : ""}/>} color="green"
                     appearance={"primary"} circle/>
        </Whisper>
    </div>
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

const SButton = styled(IconButton)`
  position: absolute;
  left: calc(50% - 20px);
  transform: scale(1.2);
  z-index: 14;
`

const SPopover = styled(RPopover)<{ open: boolean }>`
  max-width: 800px;
  padding: 20px;
  border-radius: 10px;
  color: white;
  box-shadow: 0 0 15px rgb(0 0 0 / 25%);
  transition: opacity .1s ease, visibility .1s linear !important;
  opacity: ${({open}) => open ? 1 : 0} !important;
  visibility: ${({open}) => open ? 'visible' : 'hidden'};
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