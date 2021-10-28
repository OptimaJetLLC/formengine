import React from 'react';
import {Container, Content, Footer} from 'rsuite';
import {observer} from "mobx-react";
import FormBuilder from "./Builder";


const App = observer(() => {
    return (
        <Container>
            <Content>
                <FormBuilder getForm={() => []}/>
            </Content>
            <Footer/>
        </Container>
    );
})

export default App;
