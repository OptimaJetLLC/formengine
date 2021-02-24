import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BuilderActions, DropzoneContext, register, BaseControls } from 'optimajet-builder-shared';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import builderStyles from '../../../builder-styles';
import { getDisplayStyle } from './utils';
import Draggable from '../../../builder/react-native/dnd/draggable.jsx';
import builderDragAndDropContext from '../../../builder/react-native/drag-and-drop-builder-context';
import { Hoverable } from 'react-native-web-hooks';

const Control = ({options}) => {    
    const [hovered, setHovered] = useState(false);
    let containers = {
        'form': '',
        'formgroup': '',
        'grid': '',
        'gridcolumn': '',
        'container': '',
        'div': '',
        'repeater': ''
    };

    options.me.updateBarPosition = function(){
        if(!options.me.controlRef || !options.me.barRef)
          return;

        options.me.controlRef.measure( (fx, fy, width, height, px, py) => {
            options.me.barRef && options.me.barRef.measure( (barfx, barfy, barWidth, barHeight, barpx, barpy) => {
                var x = fx + width - barWidth;
                if(x < 15) x = 15;
                var y = fy - barHeight/2;

                if(containers[options.props.control.props["data-buildertype"]] != undefined){
                    y -= 20;
                }

                const isStateNotInitialized = !options.me.state.x || !options.me.state.y;
                const isCoordDiff = Math.abs(options.me.state.x - x) > 1 || Math.abs(options.me.state.y - y) > 1 //in some cases element position calculate with 1px diff

                if(isStateNotInitialized || isCoordDiff){ //prevent infinite componentDidUpdate
                    options.me.setState({
                        x: x,
                        y: y
                    });
                }
            });
        });   
    }

    function getPosition(state){
        return {
            left: state.x + "px",
            top: state.y + "px",                
            right: "auto"
        };;        
    }
    

    function onDrop(droppable, element) {
        BuilderActions.move(options.props.model.key, element);
    }

    return <DropzoneContext.Consumer>
        {({ visible }) => {
            var bar = isHovered => {
                setHovered(isHovered);
                const style = [
                        isHovered ? builderStyles.controlBar.containerHovered : builderStyles.controlBar.container,
                        getPosition(options.me.state)
                ];
                return visible && <View 
                    ref={view => { options.me.barRef = view}}
                    style={style}                
                    >
                    <View title={options.props.text} style={builderStyles.controlBar.title}>
                        <Text onPress={options.onCopyControl}>{options.props.model['key']}</Text>
                    </View>
                    <TouchableOpacity style={builderStyles.controlBar.iconTouchable}>
                        <Draggable onDrop={onDrop} context={builderDragAndDropContext}>
                            <Image source={{ uri: '/images/dwkitbuilder-move.svg' }} style={builderStyles.controlBar.icon}/>
                        </Draggable>
                    </TouchableOpacity>
                    <TouchableOpacity style={builderStyles.controlBar.iconTouchable}
                                    onPress={options.props.onEdit.bind(options.props.parent, options.props.model)}>
                        <Image source={{ uri: '/images/dwkitbuilder-edit.svg' }} style={builderStyles.controlBar.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={builderStyles.controlBar.iconTouchable}
                                    onPress={options.props.onCopy.bind(options.props.parent, options.props.model)}>
                        <Image source={{ uri: '/images/dwkitbuilder-copy.svg' }} style={builderStyles.controlBar.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={builderStyles.controlBar.iconTouchable}
                                    onPress={options.props.onDelete.bind(options.props.parent, options.props.model)}>
                        <Image source={{ uri: '/images/dwkitbuilder-delete.svg' }} style={builderStyles.controlBar.icon}/>
                    </TouchableOpacity>
                </View>
            };

            return [
                <View   style={[builderStyles.controlWrapper, (hovered ? builderStyles.controlWrapperHovered : undefined)]}
                        ref={view => { options.me.controlRef = view}}>
                    {React.cloneElement(options.props.control)}
                </View>, <Hoverable>{bar}</Hoverable>
            ];
        }}
    </DropzoneContext.Consumer>
}

register('control-bar', options => {
    return <Control options={options}/>;
});
