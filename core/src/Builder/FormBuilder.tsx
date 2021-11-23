import {configure} from "mobx";
import {observer} from "mobx-react";
import React from "react";
import styled from '@emotion/styled';
import {DragDropContext, DragUpdate, DropResult} from "react-beautiful-dnd";
import {store} from "../stores/Store";
import {FormViewerProps} from "../FormViewer";
import HeaderBar from "./components/Headerbar";
import BuilderView from "./BuilderView"
import {Preview} from "./Preview";
import ComponentTree from "./components/ComponentTree";
import PropertiesEditor from "./components/PropertiesEditor/PropertiesEditor";
import {findNode} from "../utils/tree";

export interface FormBuilderProps extends FormViewerProps {

}

const FormBuilder = (props: FormBuilderProps) => {
    const isDragOver = store.draggingOverKey == "";
    return <div>
        <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
            <HeaderBar/>
            <Content>
                {store.showLeftPanel && <TreeContainer>
                    {store.isBuilderMode
                        ? <ComponentTree/>
                        : null
                    }
                </TreeContainer>}

                <FormContainer style={
                    isDragOver
                        ? {backgroundColor: "var(--highlight-color)"}
                        : {}
                }>
                    {store.isBuilderMode
                        ? <BuilderView getForm={props.getForm}/>
                        : <Preview getForm={props.getForm}/>
                    }
                </FormContainer>

                {store.showRightPanel && <PropertiesEditorContainer>
                    {store.isBuilderMode
                        ? <PropertiesEditor/>
                        : null
                    }
                </PropertiesEditorContainer>}
            </Content>
        </DragDropContext>
    </div>;
}

const onDragEnd = (result: DropResult) => {
    const {source, destination, draggableId} = result;

    if (!destination) return;

    if (source.droppableId === "TOOLBAR")
        store.add(draggableId, destination.droppableId, destination.index);
    else {
        store.move(draggableId, destination.droppableId, destination.index);
    }

    store.isDragging = false;
    store.draggingOverKey = undefined;
}

const onDragStart = () => {
    store.isDragging = true;
}

const onDragUpdate = ({destination}: DragUpdate) => {
    if (!destination?.droppableId) return;
    const node = findNode(destination?.droppableId);
    store.draggingOverKey = node?.parent?.key || "";
}

const PanelContainer = styled.div`
  width: 270px;
  margin: 15px 0;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 8px -2px rgb(0 0 0 / 25%);
  display: flex;
`

const TreeContainer = styled(PanelContainer)`
  //width: 200px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 0;
  padding-left: 0;

  //background-color: inherit; 
  box-shadow: none;
`

const FormContainer = styled(PanelContainer)`
  flex: 1;
  display: block;
  width: initial;
  margin: 15px;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: height .2s ease, width .2s ease, border-radius .2s ease;
`

const Content = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 56px);
  flex-direction: row;
  background-color: #f7f7fa;
  box-shadow: inset 0 0 4px 0 rgb(0 0 0 / 25%);
`

const PropertiesEditorContainer = styled(PanelContainer)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  //background-color: inherit;
  box-shadow: none;
`

//TODO move to other common place
//State can be changed from anywhere
configure({enforceActions: "never"})

export default observer(FormBuilder);
