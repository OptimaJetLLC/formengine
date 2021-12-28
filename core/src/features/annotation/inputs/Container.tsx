import {PropertyEditorProps} from "../types";
import {LabeledInput} from "../../../components/UI/Containers";
import {ReactNode} from "react";

const Container = (props: PropertyEditorProps<ReactNode | undefined>) => {
    const {annotation, value, componentStore} = props

    return (
        <LabeledInput>
            <label>{annotation.title}</label>
            <ul>
                {componentStore.children?.map((item) => (<li>{item.key}</li>))}
            </ul>
        </LabeledInput>
    );
};

export {Container}