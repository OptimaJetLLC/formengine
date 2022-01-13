import React, {useState} from "react";
import PinIcon from '@rsuite/icons/Pin';
import {usePopper} from 'react-popper';
import styled from '@emotion/styled';
import {FaIcon} from "../../../../components/UI/Icons";
import * as faClone from '@fortawesome/free-regular-svg-icons/faClone'
import * as faTrash from "@fortawesome/free-regular-svg-icons/faTrashAlt";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {useStore} from "../../../../utils/StoreContext";

const ControlBar = (props: any) => {
    const store = useStore()
    const {referenceElement, elementKey} = props;
    const popperRef: any = React.useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [arrowRef, setArrowRef]: any = useState(null);
    const {styles, attributes} = usePopper(referenceElement.current, popperRef.current, {
        placement: 'top',
        modifiers: [
            {
                name: 'preventOverflow',
                options: {
                    altAxis: false,
                }
            },
            {
                name: 'offset',
                options: {
                  offset: [0, -10],
                },
            },
        ]
    });
    return (
        <ControlBarContainer ref={popperRef} style={styles.popper} {...attributes.popper}>
            <div ref={setArrowRef}/>
            <ControlBarContent>
                <Title>{elementKey}</Title>
                <PinIcon onClick={() => {
                }}/>
                <FaIcon onClick={() => store.clone(elementKey)}
                        icon={faClone as unknown as IconDefinition}/>
                <FaIcon onClick={() => store.remove(elementKey)}
                        icon={faTrash as unknown as IconDefinition}/>
            </ControlBarContent>
        </ControlBarContainer>
    )
}

const ControlBarContainer = styled.div`
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
`

const ControlBarContent = styled.div`
  display: flex;
  color: var(--rs-text-primary);
  align-items: center;

  & > .rs-icon {
    cursor: pointer;
    margin-right: 7px;
  }
`

const Title = styled.div`
        display: inline;
    margin-right: 5px;
    cursor: move;
`

export default ControlBar;