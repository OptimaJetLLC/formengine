import {PropertyEditorProps} from "../../../Types";
import AddActionButton from "./components/AddActionButton";
import ActionList from "./components/ActionList";

//EventEditor: one event - one editor
export default ({componentStore, annotation}: PropertyEditorProps<Function | undefined>) => {

    return <div style={{margin: "20px  0"}}>
        <h6 style={{margin: "10px  0"}}>{annotation.title}:</h6>
        <ActionList eventKey={annotation.key} componentStore={componentStore}/>
        <AddActionButton eventKey={annotation.key} componentStore={componentStore}/>
    </div>;
}


