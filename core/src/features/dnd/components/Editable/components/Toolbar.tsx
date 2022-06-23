import {useStore} from "../../../../../utils/contexts/StoreContext";
import React, {useCallback} from "react";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {FaIcon} from "../../../../ui/Icons";
import * as faClone from "@fortawesome/free-regular-svg-icons/faClone";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import * as faTrash from "@fortawesome/free-regular-svg-icons/faTrashAlt";
import {useComponentData} from "../../../../../utils/contexts/ComponenDataContext";

export const Toolbar = observer(() => {
    const store = useStore()
    const data = useComponentData()

    const onClone = useCallback(() => store.clone(data), [])
    const onRemove = useCallback(() => store.remove(data), [])

    return <ToolbarContainer>
        <Title>
            {data.componentStore.key}
            <label>{` (${data.componentStore.type})`}</label>
        </Title>
        <FaIcon onClick={onClone} icon={faClone as unknown as IconDefinition}/>
        <FaIcon onClick={onRemove} icon={faTrash as unknown as IconDefinition}/>
    </ToolbarContainer>
})

const ToolbarContainer = styled.div`
  inset: initial;
  right: 5px;
  top: -13px;
  label: Toolbar;
  position: absolute;
  z-index: 11;
  color: var(--rs-btn-ghost-text);
  cursor: pointer !important;
  white-space: nowrap;
  border-radius: 5px;
  height: 20px;
  width: fit-content;
  padding-inline: 5px;
  font-weight: 400;
  background-color: white;

  .rs-theme-dark & {
    background-color: #3b3f43;
  }

  display: flex;
  gap: 5px;
  align-items: center;

  & > .rs-icon {
    cursor: pointer;
  }
`

const Title = styled.label`
  display: inline;
  cursor: move;
`
