import React, { Component } from 'react';
import { Overlay } from 'react-native-elements';
import { View } from 'react-native';
import builderStyles from '../../../../builder-styles';
import {Row} from './dwkit-item-group.jsx';

function header(props) {
    return (<View style={builderStyles.dwKitModalHeader}>
        {props.children}
    </View>)
}

function content(props) {
    return (<View style={builderStyles.dwKitModalContent}>
        {props.children}
    </View>)
}

function actions(props) {
    return (<Row style={builderStyles.dwKitModalActions}>
        {props.children}
    </Row>)
}

export default class DWKitModal extends Component {

    static Header = header;
    static Content = content;
    static Actions = actions;

    render() {
        // todo check why overlay dont't close
        if (!this.props.visible) {
            return null;
        }
        const controlProps = {
            ...builderStyles.dwKitModalOverlayProps,
            isVisible: this.props.visible,
            onRequestClose: this.props.onClose,
            onBackdropPress: this.props.onClose,
        };
        return (<Overlay {...controlProps}>
            <View style={builderStyles.dwKitModalBody}>
                {this.props.children}
            </View>
        </Overlay>);
    }

}
