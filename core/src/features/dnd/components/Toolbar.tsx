import {useStore} from "../../../utils/StoreContext";
import {useComponentStore} from "../../../utils/ComponentStoreContext";
import React, {useCallback, useState} from "react";
import {observer} from "mobx-react";
import {usePopper} from "react-popper";
import styled from "@emotion/styled";
import {FaIcon} from "../../../components/UI/Icons";
import * as faClone from "@fortawesome/free-regular-svg-icons/faClone";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import * as faTrash from "@fortawesome/free-regular-svg-icons/faTrashAlt";
import {css} from "@emotion/css";
import {Popover} from "../../../components/UI/Popover";

interface ToolbarProps {
    show: boolean
    parent: Element
}

export const Toolbar = observer(({parent, show}: ToolbarProps) => {
    const store = useStore()
    const {key} = useComponentStore()

    const onClone = useCallback(() => store.clone(key), [])
    const onRemove = useCallback(() => store.remove(key), [])

    if (!show) return null

    return <Popover
        show={show}
        placement='top'
        parent={parent}
        modifiers={[{name: 'offset', options: {offset: [150, -10]}}]}
        className={ToolbarContainer}
    >
        <Title>{key}</Title>
        <FaIcon onClick={onClone} icon={faClone as unknown as IconDefinition}/>
        <FaIcon onClick={onRemove} icon={faTrash as unknown as IconDefinition}/>
    </Popover>
})

const ToolbarContainer = css`
  label: Toolbar;

  position: absolute;
  z-index: 10;
  cursor: pointer !important;
  white-space: nowrap;
  height: 20px;
  width: fit-content;
  padding-left: 10px;
  color: black;
  font-weight: 400;
  background: white;
  -webkit-box-shadow: 0 6px 10px rgba(18, 83, 204, 0.12), 0 1px 18px rgba(18, 83, 204, 0.12), 0 3px 5px rgba(18, 83, 204, 0.15);
  box-shadow: 0 6px 10px rgba(18, 83, 204, 0.12), 0 1px 18px rgba(18, 83, 204, 0.12), 0 3px 5px rgba(18, 83, 204, 0.15);
  border-radius: 11px;
  display: flex;
  //color: var(--rs-text-primary);
  align-items: center;

  & > .rs-icon {
    cursor: pointer;
    margin-right: 7px;
  }
`

const Title = styled.label`
  display: inline;
  margin-right: 5px;
  cursor: move;
`