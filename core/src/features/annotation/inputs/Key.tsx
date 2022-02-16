import {PropertyEditorProps} from "../types";
import {Input} from "rsuite";
import {LabeledInput} from "../../../components/UI/Containers";

const KeyInput = ({componentStore, annotation}: PropertyEditorProps<string>) => (
    <>
        <LabeledInput>
            <label>{annotation.title}</label>
            <Input
                value={componentStore.key}
                onChange={value => componentStore.key = value as string}
            />
        </LabeledInput>

        <LabeledInput>
            <label>bindTo</label>
            <Input
                value={componentStore.bindTo}
                onChange={value => componentStore.bindTo = value as string}
            />
        </LabeledInput>
    </>
);

export default KeyInput;