import React, {useState} from "react";
import PinIcon from '@rsuite/icons/Pin';
import CopyIcon from '@rsuite/icons/Copy';
import TrashIcon from '@rsuite/icons/Trash';
import {usePopper} from 'react-popper';
import styled from '@emotion/styled';

const ControlBar = (props: any) => {
    const {referenceElement, content} = props;
    const popperRef: any = React.useRef(null);
    const [arrowRef, setArrowRef]: any = useState(null);
    const { styles, attributes } = usePopper(referenceElement.current, popperRef.current, {
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
            <div ref={setArrowRef} />
            <ControlBarContent>
                <Title>{content}</Title>
                <PinIcon/>
                <CopyIcon/>
                <TrashIcon/>
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
  -webkit-box-shadow: 0px 6px 10px rgba(18, 83, 204, 0.12), 0px 1px 18px rgba(18, 83, 204, 0.12), 0px 3px 5px rgba(18, 83, 204, 0.15);
  box-shadow: 0px 6px 10px rgba(18, 83, 204, 0.12), 0px 1px 18px rgba(18, 83, 204, 0.12), 0px 3px 5px rgba(18, 83, 204, 0.15);
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