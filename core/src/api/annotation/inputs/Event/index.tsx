import {useState} from "react";
import {PropertyEditorProps} from "../../../Types";
import AddActionButton from "./components/AddActionButton";
import ActionList from "./components/ActionList";
import {Button, IconButton, Modal} from 'rsuite';
import PlusIcon from "@rsuite/icons/Plus";
import {store} from "../../../../stores/Store";
//EventEditor: one event - one editor

const EventModal = ({data, opened, setOpened}: {
    data: PropertyEditorProps<Function | undefined>,
    opened: boolean, setOpened: Function
}) => {
    const {componentStore, annotation} = data;

    return <Modal open={opened} onClose={() => setOpened(false)}>
        <Modal.Header>
            <Modal.Title>{`${annotation.title} event actions`}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height: 600}}>
            <ActionList eventKey={annotation.key} componentStore={componentStore}/>
            <AddActionButton eventKey={annotation.key} componentStore={componentStore}/>
        </Modal.Body>
        <Modal.Footer>
            <Button appearance="primary">
                Save
            </Button>
            <Button onClick={() => setOpened(false)} appearance="subtle">
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>;
}


//EventEditor: one event - one editor
export default ({componentStore, annotation}: PropertyEditorProps<Function | undefined>) => {
    const [opened, setOpened] = useState(false);
    if (!componentStore.events[annotation.key])
        store.addEvent(annotation.key, null, {}, componentStore, null);

    return <div style={{margin: "20px  0"}}>
        <h6 style={{margin: "10px  0"}}>{annotation.title}:</h6>
        <IconButton
            onClick={() => setOpened(true)}
            block icon={<PlusIcon/>} appearance="subtle" placement="left">
            {componentStore.events[annotation.key] ? "Edit actions" : "Add actions"}
        </IconButton>
        <EventModal data={{componentStore, annotation}} opened={opened} setOpened={setOpened}/>
    </div>;
}


