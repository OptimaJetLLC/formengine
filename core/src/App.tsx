import React, {createContext, ReactNode, useContext, useState} from 'react';
import {observer} from "mobx-react";
import {FormBuilder} from "./Builder";
import {rsuite} from "./views/rsuite";
import {Button} from "rsuite";


const App = observer(() => {

    return (
        //<A/>
        <FormBuilder
            getForm={() => []}
            view={rsuite}
        />
    )
})

export default App;


function A() {
    let counter = useContext(MyContext)

    if (counter === undefined) return (
        <MyProvider value={1}>
            <A/>
        </MyProvider>
    )

    if (counter.count === 10) return null

    return <MyProvider value={counter.count + 1}>
        <label>{counter.count}</label>
        <Button children={"Click me"} onClick={() => {
            counter!.setCount(counter!.count + 1)
        }}/>
        <br/>
        <A/>
    </MyProvider>
}

function MyProvider(props: { value: number, children: ReactNode }) {
    const [count, setCount] = useState(props.value)

    return <MyContext.Provider value={{count, setCount}}>
        {props.children}
    </MyContext.Provider>
}

const MyContext = createContext<{ count: number, setCount: Function } | undefined>(undefined);