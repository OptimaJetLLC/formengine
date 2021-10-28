import {PropertyEditorProps} from "../../../Types";
import AddActionButton from "./components/AddActionButton";
import ActionList from "./components/ActionList";

//EventEditor: one event - one editor
export default ({componentStore, annotation}: PropertyEditorProps<Function | undefined>) => {

    return <div>
        <label>{annotation.title}:</label>
        <ActionList eventKey={annotation.key} componentStore={componentStore}/>
        <AddActionButton eventKey={annotation.key} componentStore={componentStore}/>
    </div>;
}


