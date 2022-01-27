import {ReactElement, ReactNode} from "react";
import {Droppable, DroppableProvided} from "react-beautiful-dnd";

interface ContainerizedProps {
    key: string
    children: ReactNode
}
export const Containerized = ({key, children}: ContainerizedProps) => {

    return <Droppable droppableId={key}>
        {(provider: DroppableProvided, dropSnap) => {
            return (
                <div
                    ref={provider.innerRef}
                    style={dropSnap.isDraggingOver ? {
                        backgroundColor: '#3498FF26',
                        outline: "2px dashed #3498ff",
                        padding: 8,
                    } : undefined}
                    {...provider.droppableProps}
                >
                    {children}
                    {provider.placeholder}
                </div>
            )
        }}
    </Droppable>
}