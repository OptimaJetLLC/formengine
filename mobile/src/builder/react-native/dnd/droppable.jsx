import React, { Component } from 'react';
import { View } from 'react-native';

export default class Droppable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            waitForEntity: false,
        };
    }

    componentWillUnmount() {
        this.props.context.unregisterDroppable(this);
    }

    render() {
        return (<View {...this.props} onLayout={this.setDropZoneValues.bind(this)}
                      ref={component => this.instance = component}/>);
    }

    setDropZoneValues(event) {
        this.props.context.registerDroppable(this, event.nativeEvent.layout);
    }

    measure() {
        if (!this.instance) {
            return;
        }
        this.instance.measure((x, y, width, height, pageX, pageY) => {
            const layout = {
                x: pageX,
                y: pageY,
                width: width,
                height: height,
            }
            this.props.context.registerDroppable(this, layout);
        });
    }

    onEnter() {
        this.setState({
            hovered: true,
        });
        if (this.props.onEnter) {
            this.props.onEnter();
        }
    }

    onLeave() {
        this.setState({
            hovered: false,
        });
        if (this.props.onLeave) {
            this.props.onLeave();
        }
    }

    onDrop(draggable) {
        this.setState({
            hovered: false,
        });
        if (this.props.onDrop) {
            this.props.onDrop(draggable);
        }
    }

    onBeginDrag() {
        this.measure();
        if (this.props.onBeginDrag) {
            this.props.onBeginDrag();
        }
    }

    onEndDrag() {
        if (this.props.onEndDrag) {
            this.props.onEndDrag();
        }
    }

    hide() {
        if (this.props.onHide) {
            this.props.onHide();
        }
    }

    show() {
        if (this.props.onShow) {
            this.props.onShow();
        }
    }

}
