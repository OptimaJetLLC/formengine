import {configure} from "mobx";
import {observer} from "mobx-react";
import React, {useState} from "react";
import styled from '@emotion/styled';
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {ComponentStore} from "../stores/ComponentStore";
import {store} from "../stores/Store";
import {Node} from "../utils/Node";
import {FormViewerProps} from "../FormViewer";
import HeaderBar from "./components/Headerbar";
import BuilderView from "./BuilderView"
import {Preview} from "./Preview";


export interface FormBuilderProps extends FormViewerProps {

}

export const FormBuilder = observer(() => {
    const [currentExpandedKeys, setCurrentExpandedKeys] = useState<any[]>([]);
    let expandedNodesKeys: string[] | never = [];
    const extractParentNodesKeys = (node: Node | null) => {
        if (node?.parent?.data?.key) {
            expandedNodesKeys.push(node.parent.data.key);
            extractParentNodesKeys(node.parent);
        }
        expandedNodesKeys = expandedNodesKeys.concat(currentExpandedKeys);
    }
    extractParentNodesKeys(store.currentNode);

    const onDragStart = () => {
        store.isDragging = true;
    }

    const onDragEnd = (result: DropResult) => {
        const {source, destination, draggableId} = result;

        if (source?.droppableId === "TOOLBAR") {
            //console.log('TOOLBAR', draggableId);
        } else {
            store.move(draggableId, destination?.droppableId, destination?.index);
        }
        store.isDragging = false;
    }

    return <div>
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <HeaderBar/>
            <Content>
                {/*<LeftMenuBar/>*/}
                <div style={{padding: 20, flex: 1}}>
                    {store.isBuilderMode
                        ? <BuilderView getForm={() => []}/>
                        : <Preview getForm={() => []}/>
                    }
                </div>
            </Content>
        </DragDropContext>
    </div>;
})

const Content = styled.div`
  display: flex;
  flex-direction: row;
`


//TODO move to other common place
//State can be changed from anywhere
configure({enforceActions: "never"})

export interface FormBuilderProps {
    getForm: ((code: string) => ComponentStore[])
}
export default FormBuilder;
