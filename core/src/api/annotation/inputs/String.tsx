import {PropertyEditorProps} from "../../Types";
import {Input} from "rsuite";
import {LabeledInput} from "../../../components/GroupItems";


export default ({componentStore, annotation}: PropertyEditorProps<string | undefined>) => (
    <LabeledInput>
        <label>{annotation.title}</label>
        <Input
            value={componentStore.props[annotation.key]}
            onChange={value => componentStore.props[annotation.key] = value as string | undefined}
        />
    </LabeledInput>
)
