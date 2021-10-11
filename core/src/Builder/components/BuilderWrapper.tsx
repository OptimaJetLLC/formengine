import React from "react";
import {Node} from "../../utils/Node";
import styled from '@emotion/styled';
import {store} from "../../stores/Store";
import ControlBar from './ControlBar';
import Selection from './Selection'

interface BuilderWrapperProps {
    node: Node,
    children: any
}

interface BuilderWrapperState {
    containerRef: any,
    hovered?: boolean,
}

class BuilderWrapper extends React.Component<BuilderWrapperProps, BuilderWrapperState > {
    containerRef: any = React.createRef();
    constructor(props: BuilderWrapperProps) {
        super(props);
        this.state = {
            containerRef:  React.createRef()
        };
    } 



    // renderSelection = () => {
    //     const selectionClassName = baseClassName 
    //         + " formbuilder-item-toolbar-container selection"
    //         + (dragging ? "" : ((selected ? " selected" : "") + (hovered ? " hovered" : ""))) 

    //     return (
    //         <div ref={options.me.selectionRef}
    //             style={{...stylePinned(10)}}  tabIndex="0"
    //             className={selectionClassName}
    //             onClick={onClick}
    //             onKeyDown ={onKeyDown }
    //             {...dragProps}
    //         />
    //     )
    // };

    isSelected = () => {
        let key = store.currentNode;
        return key == this.props?.node;
    }

    setSelected = () => {
        store.currentNode = this.props?.node;
    }
    
    onMouseOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const { isDragging, isResizing, isMoving } = store;
        this.setState({ 
            hovered: true && !(isDragging && isResizing && isMoving)
        })
    }

    onMouseLeave = (e: any) => {
        this.setState({ hovered: false });
    }

    render() {
        const { children } = this.props;
        const { hovered} = this.state;
        const selected = this.isSelected();
        return <Container ref={this.containerRef}>
            <Selection onClick={this.setSelected}
                onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}
                hovered={hovered} selected={selected}/>
            {selected && <ControlBar referenceElement={this.containerRef} content={this.props?.node?.key}/>}
            {children}
        </Container>
    }
}

const Container = styled.div`
    position: relative;
`

const wrapperHoc = (props: BuilderWrapperProps) => <BuilderWrapper {...props}/>

export default wrapperHoc;