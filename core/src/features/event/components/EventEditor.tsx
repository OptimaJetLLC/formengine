import {PropertyEditorProps} from "../../annotation/types";
import AddActionButton from "./AddActionButton";
import ActionList from "./ActionList";
import {store} from "../../../stores/Store";
import styled from "@emotion/styled";

//EventEditor: one event - one editor
export default ({componentStore, annotation}: PropertyEditorProps<Function | undefined>) => {
    if (!componentStore.events[annotation.key])
        store.addEvent(annotation.key, null, {}, componentStore, null);

    return <div style={{marginBottom: 20}}>
        <EventHeader>{annotation.title}:</EventHeader>
        <ActionList eventKey={annotation.key} componentStore={componentStore}/>
        <AddActionButton eventKey={annotation.key} componentStore={componentStore}/>
    </div>;
}

const EventHeader = styled.h6`
  margin-left: 10px;
`


