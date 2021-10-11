import React from 'react';
import {Container, Content, Footer, Header} from 'rsuite';
import FormBuilder from "./Builder";


function App() {
    return (
        <Container>
            <Header/>
            <Content style={{margin: '1%'}}>
                {/*<SampleForm/>*/}

                <br/>

                <FormBuilder getForm={()=> []}/>
            </Content>
            <Footer/>
        </Container>
    );
}

export default App;
