import {configure} from "mobx";
import {observer} from "mobx-react";
import React from "react";
import styled from '@emotion/styled';
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {store} from "../stores/Store";
import {FormViewerProps} from "../FormViewer";
import HeaderBar from "./components/Headerbar";
import BuilderView from "./BuilderView"
import {Preview} from "./Preview";

export interface FormBuilderProps extends FormViewerProps {

}

const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;

    if (!destination) return;

    if (source.droppableId === "TOOLBAR")
        store.add(source.droppableId, destination.droppableId, destination.index);
    else {
        store.move(source.droppableId, destination.droppableId, destination.index);
    }

    store.isDragging = false;
}

const FormBuilder = (props: FormBuilderProps) => {

    const onDragStart = () => {
        store.isDragging = true;
    }

    return <div>
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <HeaderBar/>
            <Content>
                {store.isBuilderMode
                    ? <BuilderView getForm={() => []}/>
                    : <Preview getForm={() => []}/>
                }
            </Content>
        </DragDropContext>
    </div>;
}

const Content = styled.div`
  padding: 20px;
  padding-top: 30px;
  flex: 1;
  flex-direction: row;
`

//TODO move to other common place
//State can be changed from anywhere
configure({enforceActions: "never"})

export default observer(FormBuilder);
