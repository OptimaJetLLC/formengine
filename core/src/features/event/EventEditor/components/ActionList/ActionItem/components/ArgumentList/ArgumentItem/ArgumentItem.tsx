import {observer} from "mobx-react";
import {LabeledInput} from "../../../../../../../../ui/Containers";
import {Arg} from "../../../../../../../types";
import {getArgumentInputByType, extractArgumentData} from "./utils";


interface ActionArgumentProps {
    data: Arg
}

export const ArgumentItem = observer(({data}: ActionArgumentProps) => {
    const [name, type] = extractArgumentData(data)
    const ArgumentInput = getArgumentInputByType(type)

    return <LabeledInput style={{display: "flex", flexDirection: "column", flex: 1}}>
        <label>{name}</label>
        <ArgumentInput name={name}/>
    </LabeledInput>
})

export interface InputProps {
    name: string
}

