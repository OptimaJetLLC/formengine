import React from 'react';
import {observer} from "mobx-react";
import styled from '@emotion/styled'
import 'tippy.js/dist/tippy.css';
import {IconButton} from 'rsuite';
import MenuIcon from '@rsuite/icons/Menu';

import {store} from "../../stores/Store";

const LeftMenuBar = observer(() => {

    const toggleModeButton = () => {
        const onClick = () => {
            store.toggleBuilderMode();
        }
        return <IconButton
            onClick={onClick}
            icon={<MenuIcon/>}>
        </IconButton>;
    }

    return (
        <Container>
            <VerticalButtonToolbar>
                {toggleModeButton()}
                {toggleModeButton()}
            </VerticalButtonToolbar>
        </Container>
    );
});

const VerticalButtonToolbar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & > * {
    margin: 4px;
  }
`

const Container = styled.div`
  display: flex;
  flex: 0;
  box-shadow: 0 15px 15px -15px rgb(0 0 0 / 25%);
  padding: 7px;
`

export default LeftMenuBar;