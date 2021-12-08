import React, {useState} from "react";
import PinIcon from '@rsuite/icons/Pin';
import CopyIcon from '@rsuite/icons/Copy';
import TrashIcon from '@rsuite/icons/Trash';
import {usePopper} from 'react-popper';
import styled from '@emotion/styled';
import {store} from "../../stores/Store";

const ControlBar = (props: any) => {
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
                <PinIcon/>
                <CopyIcon onClick={() => store.clone(elementKey)}/>
                <TrashIcon onClick={() => store.remove(elementKey)}/>
            </ControlBarContent>
        </ControlBarContainer>
    )
}

const ControlBarContainer = styled.div`
  position: absolute;
  z-index: 10;
  cursor: pointer !important;
  white-space: nowrap;
  padding-top: 3px;
  height: 25px;
  width: fit-content;
  padding-bottom: 20px;
  padding-left: 10px;
  line-height: 20px;
  color: black;
  font-weight: 400;
  background: white;
  -webkit-box-shadow: 0 6px 10px rgba(18, 83, 204, 0.12), 0 1px 18px rgba(18, 83, 204, 0.12), 0 3px 5px rgba(18, 83, 204, 0.15);
  box-shadow: 0 6px 10px rgba(18, 83, 204, 0.12), 0 1px 18px rgba(18, 83, 204, 0.12), 0 3px 5px rgba(18, 83, 204, 0.15);
  border-radius: 11px;
`

const ControlBarContent = styled.div`
    display: flex;
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