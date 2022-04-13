import {SelectPicker} from "rsuite";
import {InputProps} from "../ArgumentItem";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ArgumentName} from "../../../../../../../../types";
import {useActionData} from "../../../../contexts/ActionDataContext";
import {observer} from "mobx-react";

const booleanData = [
    {label: "True", value: 1},
    {label: "False", value: 0},
    //{label: "Bind to prop...", value: -2}
]

//TODO использовтаь для аргументов и пропертей одни компоненты.
//TODO вынести useConnected... хук в родителя аргумента
//Эти TODO относятся к InputNumber и к InputBindableText в substitution
export const InputBoolean = observer(({name}: InputProps) => {
    const [value, setValue] = useSyncBoolean(name)

    /* TODO
    * Значение undefined для аргументов и bool в частности сейчас не реализован.
    * Предполагается, что если значение может быть undefined, то значение
    * cleanable будет равен true и значение можно будет стереть.

    * TODO
    * Реализация Bindings для boolean в данный момент не приоритете.
    * */

    return (
        <SelectPicker
            data={booleanData}
            searchable={false}
            cleanable={false}
            value={value}
            onSelect={setValue}
        />
    )
})

const useSyncBoolean = (name: ArgumentName): [0 | 1, Dispatch<SetStateAction<0 | 1>>] => {
    const data = useActionData()
    const [value, setValue] = useState<0 | 1>(getInitialState)
    useChangeConnectedData()

    return [value, setValue]


    function getInitialState() {
        const value = data.weakArgs?.[name] ?? false
        return value ? 1 : 0
    }

    function useChangeConnectedData() {
        useEffect(() => {
            data.weakArgs = Object.assign({}, data.weakArgs, {[name]: Boolean(value)})
        }, [value])
    }
}