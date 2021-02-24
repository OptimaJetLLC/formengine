import React, { Component } from 'react';
import { Input, Text } from 'react-native-elements';
import { isUndefined, register } from 'optimajet-builder-shared';
import builderStyles from '../../builder-styles';
import { getDisplayStyle } from './utils';
import Droppable from '../../builder/dnd/droppable.jsx';
import builderDragAndDropContext from '../../builder/drag-and-drop-builder-context';
import { TouchableOpacity, View } from 'react-native';
import { Tooltip  } from '@ui-kitten/components';
import { FormWidthContext } from './form-width-context';

class BuilderDropzone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            hover: false,
            visible: true,
            modalVisible: false,
        };
    }

    static attr(value) {
        if (isUndefined(value)) {
            return undefined;
        }
        return { value: value }
    }

    onBeginDrag() {
        this.setState({
            active: true,
            hovered: false,
        });
    }

    onEndDrag() {
        this.setState({
            active: false,
            hovered: false,
        });
    }

    onEnter() {
        this.setState({
            hovered: true,
        });
    }

    onLeave() {
        this.setState({
            hovered: false,
        });
    }

    onDrop(draggable) {
        const element = {
            attributes: {
                name: BuilderDropzone.attr(this.props.name),
                elementafter: BuilderDropzone.attr(this.props.elementAfter),
                elementtoinsert: BuilderDropzone.attr(this.props.elementToInsert),
                placeholderkey: BuilderDropzone.attr(this.props.placeholderKey),
            },
        }
        if (draggable.props.onDrop) {
            draggable.props.onDrop(this, element);
        }
    }

    onHide() {
        this.setState({
            visible: false,
        });
    }

    onShow() {
        this.setState({
            visible: true,
        });
    }

    showModal() {
        this.props.options.onChangeDZ(null, { value: '' });
        this.setState({ modalVisible: true })
    }

    save() {
        this.props.options.onClosePopup();
        this.setState({ modalVisible: false });
    }

    cancel() {
        this.setState({ modalVisible: false });
    }

    drawModal(anchor) {
        // todo add styles and create portal
        return (
        <Tooltip  appearance='white' visible={this.state.modalVisible} 
                  anchor={anchor} style={builderStyles.controls.dropzonePopover.container}
                  onBackdropPress={this.save.bind(this)}>
            <View>
                <Input multiline={true} numberOfLines={4}
                       onChangeText={text => this.props.options.onChangeDZ(null, { value: text })}
                       placeholder={'Insert here a model control \n(for copy - double click by control title)'}/>
            </View>
        </Tooltip>);
          
    }

    render() {
        const activeStyle = this.state.active ? builderStyles.dwkitFormBuilderZoneActive : {};
        const hoverStyle = this.state.hovered ? builderStyles.dwkitFormBuilderZoneHover : {};
        let displayStyle = getDisplayStyle(this.state.visible);
        let textStyle = builderStyles.dwkitFormBuilderZoneText;
        return (
            <TouchableOpacity onPress={() => this.showModal()}>
                <FormWidthContext.Consumer>
                    {({ isColumn }) => {
                        if (isColumn) {                            
                            displayStyle = [displayStyle, builderStyles.grouped.inColumn.dropzone.container];
                            textStyle = [textStyle, builderStyles.grouped.inColumn.dropzone.text];
                        }
                        return <Droppable name={this.props.name} key={this.props.keyValue} elementafter={this.props.elementAfter}
                                elementtoinsert={this.props.elementToInsert}
                                placeholderkey={this.props.placeholderKey}
                                style={[builderStyles.dwkitFormBuilderZone, displayStyle, activeStyle, hoverStyle]}
                                onDrop={this.onDrop.bind(this)} onBeginDrag={this.onBeginDrag.bind(this)}
                                onEndDrag={this.onEndDrag.bind(this)} onEnter={this.onEnter.bind(this)}
                                onLeave={this.onLeave.bind(this)} onHide={this.onHide.bind(this)}
                                onShow={this.onShow.bind(this)} context={builderDragAndDropContext}
                                onPress={this.showModal.bind(this)}>
                            <View>
                                {this.drawModal(() => 
                                    <Text style={textStyle}>{this.props.text}</Text>
                                )}
                            </View>
                        </Droppable>
                    }}
                </FormWidthContext.Consumer>
            </TouchableOpacity>);
    }
}

register('builder-dropzone', options => {
    return (<BuilderDropzone name={options.key} key={options.key + '_bdz'} keyValue={options.key}
                             elementAfter={options.elementAfter} elementToInsert={options.elementToInsert}
                             placeholderKey={options.placeholderKey} text={options.text}
                             options={options}/>)
});
