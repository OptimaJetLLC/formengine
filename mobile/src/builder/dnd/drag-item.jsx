import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class DragItem extends Component {

    constructor(props) {
        super(props);
        this.deltaX = 0;
        this.deltaY = 0;
    }

    onLayout(event) {
        this.deltaX = this.props.pageX - event.nativeEvent.layout.x;
        this.deltaY = this.props.pageY - event.nativeEvent.layout.y;
        this.forceUpdate();
    }

    render() {
        const panStyle = {
            transform: this.props.pan.getTranslateTransform(),
            zIndex: 1000,
            position: 'absolute',
            left: this.props.pageX + this.deltaX,
            top: this.props.pageY + this.deltaY,
        };
        return (<Animated.View style={panStyle} onLayout={this.onLayout.bind(this)}>
            {this.props.children}
        </Animated.View>);
    }

}
