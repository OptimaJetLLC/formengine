import React, { Component } from 'react';
import { DraggableContext } from './draggable-context';
import { View } from 'react-native';
import builderStyles from '../../builder-styles';

export default class DragView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            draggableComponent: null,
            draggableContext: {
                setComponent: this.setDraggableComponent.bind(this),
            },
        };
    }

    render() {
        return (<DraggableContext.Provider value={this.state.draggableContext}>
            <View ref={view => {
                this.instance = view;
            }} style={builderStyles.dragView}>
                {this.state.draggableComponent}
                {this.props.children}
            </View>
        </DraggableContext.Provider>);
    }

    setDraggableComponent(component) {
        this.setState({
            draggableComponent: component,
        });
    }

}
