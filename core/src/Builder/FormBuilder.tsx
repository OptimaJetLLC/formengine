import {configure} from "mobx";
import {observer} from "mobx-react";
import React from "react";
import styled from '@emotion/styled';
import {DragDropContext, DragUpdate, DropResult} from "react-beautiful-dnd";
import {FormViewerProps} from "../FormViewer";
import HeaderBar from "./components/Headerbar";
import BuilderView from "./BuilderView"
import {Preview} from "./Preview";
import Tree from "./components/Tree";
import PropertiesEditor from "./components/PropertiesEditor/PropertiesEditor";
import Errors from "./components/Errors";
import {useStore} from "../utils/StoreContext";
import {Store} from "../stores/Store";

export interface FormBuilderProps extends FormViewerProps {

}

const FormBuilder = (props: FormBuilderProps) => {
    const store = useStore()
    const isDragOver = store.draggingOverKey === "";
    return <Container>
        <DragDropContext
            onDragStart={onDragStart.bind(null, store)}
            onDragUpdate={onDragUpdate.bind(null, store)}
            onDragEnd={onDragEnd.bind(null, store)}>
            <HeaderBar/>
            <Content>
                {store.showLeftPanel && <LeftPanel>
                    {store.isBuilderMode
                        ? <Tree/>
                        : <Errors style={{margin: 20}}/>
                    }
                </LeftPanel>}

                <FormContainer
                    // style={
                    //     isDragOver
                    //         ? {backgroundColor: "var(--highlight-color)"}
                    //         : {}
                    // }
                >
                    {store.isBuilderMode
                        ? <BuilderView getForm={props.getForm} view={props.view}/>
                        : <Preview getForm={props.getForm} view={props.view}/>
                    }
                </FormContainer>

                {store.showRightPanel && <RightPanel>
                    {store.isBuilderMode
                        ? <PropertiesEditor/>
                        : null
                    }
                </RightPanel>}
            </Content>
        </DragDropContext>
    </Container>
}

//TODO вынести функционал DnD в features
const onDragEnd = (store: Store, result: DropResult) => {
    const {source, destination, draggableId, combine} = result;
    const droppableId: string | undefined = combine
        ? combine.draggableId ?? combine.droppableId
        : destination?.droppableId;

    if (source.droppableId === "TOOLBAR")
        store.add(draggableId, droppableId || "", destination?.index ?? 0, !!combine);
    else {
        store.move(draggableId, droppableId || "", destination?.index ?? 0, !!combine);
    }

    store.isDragging = false;
    store.draggingOverKey = undefined;
    store.draggingElementKey = undefined;
}

const onDragStart = (store: Store) => {
    store.isDragging = true;
}

const onDragUpdate = (store: Store, {destination, combine}: DragUpdate) => {
    const droppableId = destination?.droppableId ?? combine?.droppableId;
    const node = store.findNode(droppableId);
    if (!node) return;

    store.draggingOverKey = !!combine
        ? node.key
        : node.parent?.key ?? "";
}

const PanelContainer = styled.div`
  width: 280px;
  margin: 15px 0;
  padding: 10px;
  background-color: #ffffffa1;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 15%);
  display: flex;
`

const LeftPanel = styled(PanelContainer)`
  //width: 200px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  //background-color: inherit; 
  box-shadow: none;
`

const FormContainer = styled(PanelContainer)`
  flex: 1;
  display: block;
  width: initial;
  background-color: white;
  margin: 15px;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: height .2s ease, width .2s ease, border-radius .2s ease;
`

const Container = styled.div`
  background-color: #f7f7fa;
`

const Content = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 56px);
  flex-direction: row;
  //background-color: #f7f7fa;
  //box-shadow: inset 0 0 4px 0 rgb(0 0 0 / 25%);
`

const RightPanel = styled(PanelContainer)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  //background-color: inherit;
  box-shadow: none;
`

//TODO move to other common place
//State can be changed from anywhere
configure({enforceActions: "never"})

export default observer(FormBuilder);
