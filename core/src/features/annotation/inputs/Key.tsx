import {PropertyEditorProps} from "../types";
import {Input} from "rsuite";
import {LabeledInput} from "../../../components/Containers";

export default ({componentStore, annotation}: PropertyEditorProps<string>) => (
    <LabeledInput>
        <label>{annotation.title}</label>
        <Input
            value={componentStore.key}
            onChange={value => componentStore.key = value as string}
        />
    </LabeledInput>
);
