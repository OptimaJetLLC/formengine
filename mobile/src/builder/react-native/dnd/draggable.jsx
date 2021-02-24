// based on https://blog.reactnativecoach.com/creating-draggable-component-with-react-native-132d30c27cb0
// and on https://moduscreate.com/blog/animated_drag_and_drop_with_react_native/

import React, { Component } from 'react';
import { Animated, PanResponder, TouchableOpacity } from 'react-native';
import { DraggableContext } from './draggable-context';
import DragItem from './drag-item.jsx';

export default class Draggable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY()
        };
        this.dragging = false;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: this.onBeginDrag.bind(this),
            onPanResponderMove: this.onMove.bind(this),
            onPanResponderRelease: this.onEndDrag.bind(this),
        });
    }

    onMove(e, gesture) {
        this.props.context.onMove(gesture);
        const event = Animated.event([
            null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]);
        return event(e, gesture);
    }

    onBeginDrag() {
        if (this.setDraggableComponent && this.instance) {
            this.instance.measure((w, y, width, height, pageX, pageY) => {
                this.dragging = true;
                this.props.context.onBeginDrag();
                const dragItem = (<DragItem {...this.props} pageX={pageX} pageY={pageY} pan={this.state.pan}/>);
                this.setDraggableComponent(dragItem);
                this.forceUpdate();
            });
            if (this.props.onBeginDrag) {
                this.props.onBeginDrag();
            }
            return true;
        }
        return false;
    }

    onEndDrag(e, gesture) {
        this.dragging = false;
        this.props.context.onEndDrag(gesture, this);
        if (this.props.onEndDrag) {
            this.props.onEndDrag();
        }
        this.setDraggableComponent(null);
        Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
        }).start();
        this.forceUpdate();
    }

    getAnimatedView() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform(),
        };
        const styles = [panStyle];
        if (this.dragging) {
            const dragStyle = {
                zIndex: 1000,
                position: 'absolute',
            };
            styles.push(dragStyle);
        }

        return (<Animated.View {...this.panResponder.panHandlers} style={styles}>
            {this.getChildrenView()}
        </Animated.View>);
    }

    getChildrenView() {
        return (this.props.children);
    }

    draw(setComponent) {
        if (setComponent) {
            this.setDraggableComponent = setComponent;
        }
        if (this.dragging) {
            return (this.getChildrenView());
        }
        return (this.getAnimatedView());
    }

    render() {
        return (<TouchableOpacity ref={view => {
            this.instance = view;
        }}>
            <DraggableContext.Consumer>
                {({ setComponent }) => (
                    (this.draw(setComponent))
                )}
            </DraggableContext.Consumer>
        </TouchableOpacity>);
    }

}
