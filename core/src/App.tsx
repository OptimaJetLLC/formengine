import React from 'react';
import {Container, Content, Footer} from 'rsuite';
import {observer} from "mobx-react";
import FormBuilder from "./Builder";
import {rsuite} from "./views/rsuite";
import {StoreProvider} from "./utils/StoreContext";


const App = observer(() => {
    console.log(rsuite)
    if (rsuite.all().length === 0) return null
    //TODO push StoreProvider in form builder like hoc or smt
    return (
        <Container id={"FormbuilderContainer"} className={"formbuilder-container"}>
            <Content>
                <StoreProvider view={rsuite}>
                    <FormBuilder getForm={() => []} view={rsuite}/>
                </StoreProvider>
            </Content>
            <Footer/>
        </Container>
    );
})

export default App;
