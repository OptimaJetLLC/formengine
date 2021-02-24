import React from 'react';
import { isDefined, isUndefined, register } from 'optimajet-builder-shared';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import DWKitModal from '../edit-control/dwkit/dwkit-modal.jsx';
import DWKitButton from '../edit-control/dwkit/dwkit-button.jsx';

register('edit-form', options => {

    function createError(text) {
        let closeBtn = 'Close';
        if (isDefined(options.props.localization)) {
            closeBtn = options.props.localization.base.closebutton;
        }

        return (<DWKitModal visible={options.state.open} onClose={options.onClose}>
            <DWKitModal.Header>
                <Text>Error</Text>
            </DWKitModal.Header>
            <DWKitModal.Content>
                <Text>{text}</Text>
            </DWKitModal.Content>
            <DWKitModal.Actions>
                <DWKitButton onPress={options.onClose} title={closeBtn}/>
            </DWKitModal.Actions>
        </DWKitModal>);
    }

    if (isUndefined(options.state.item)) {
        return (<View/>);
    }

    const editForm = options.controls.getEditControlByType(
        options.state.item['data-buildertype'],
        options.props.externalControlList
    );
    if (!editForm) {
        return createError('EditForm is not found for this control!');
    }

    let okBtn = 'OK';
    let cancelBtn = 'Cancel';
    let questionTitle = 'Question';
    if (isDefined(options.props.localization)) {
        okBtn = options.props.localization.base.okbutton;
        cancelBtn = options.props.localization.base.cancelbutton;
        questionTitle = options.props.localization.base.questiontitle;
    }

    return (<View>
        {React.createElement(editForm, {
            key: 'editform',
            data: options.state.item,
            parent: options.parent,
            open: options.state.open,
            onSave: options.onSave,
            onClose: options.onClose,
            actions: options.props.actions,
            localization: options.props.localization
        })}
        <DWKitModal visible={options.state.confirm} onClose={options.confirmHandleCancel}>
            <DWKitModal.Header>
                <Text>{questionTitle}</Text>
            </DWKitModal.Header>
            <DWKitModal.Content>
                <Text>{options.state.confirmtext}</Text>
            </DWKitModal.Content>
            <DWKitModal.Actions>
                <DWKitButton onPress={options.state.confirmHandle} title={okBtn}/>
                <DWKitButton onPress={options.confirmHandleCancel} title={cancelBtn} appearance='outline'/>
            </DWKitModal.Actions>
        </DWKitModal>

        {/*<Modal size="small" open={options.state.confirm} dimmer="inverted" onClose={options.confirmHandleCancel}>*/}
        {/*    <Modal.Header>*/}
        {/*        {questionTitle}*/}
        {/*    </Modal.Header>*/}
        {/*    <Modal.Content>*/}
        {/*        <p>{options.state.confirmtext}</p>*/}
        {/*    </Modal.Content>*/}
        {/*    <Modal.Actions>*/}
        {/*        <Button className="buttontype1" onClick={options.state.confirmHandle}>{okBtn}</Button>*/}
        {/*        <Button className="buttontype2" onClick={options.confirmHandleCancel}>{cancelBtn}</Button>*/}
        {/*    </Modal.Actions>*/}
        {/*</Modal>*/}
    </View>)
});
