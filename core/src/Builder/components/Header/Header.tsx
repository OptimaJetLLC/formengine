import React from 'react';
import {observer} from "mobx-react";
import styled from '@emotion/styled'
import {AddButton} from "./components/AddButton";
import {LeftPart} from "./components/LeftPart";
import {RightPart} from "./components/RightPart";

const Header = observer(() => {

    return (
        <Container>
            <LeftPart/>
            <div className="center">
                <AddButton/>
            </div>
            <RightPart/>
        </Container>
    );
});


const Container = styled.div`
  display: flex;
  flex: 1;
  //box-shadow: 0 15px 15px -15px rgb(0 0 0 / 25%);

  & > * {
    display: flex;
    padding: 10px;
  }

  & .right.panel {
    justify-content: flex-end;
  }

  & .center {
    flex: 1;
    justify-content: center;
    display: flex;
  }
`

export {Header};