import React from 'react';
import {observer} from "mobx-react";
import {FormBuilder} from "./Builder";
import {rsuite} from "./views/rsuite";


const App = observer(() => {

    return (
        <FormBuilder
            getForm={() => []}
            view={rsuite}
        />
    )
})

export default App;
