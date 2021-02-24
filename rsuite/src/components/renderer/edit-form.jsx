import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { isDefined, isUndefined, register } from 'optimajet-builder-shared';

register('edit-form', options => {

    function createError(text) {
        let closeBtn = 'Close';
        if (isDefined(options.props.localization)) {
            closeBtn = options.props.localization.base.closebutton;
        }

        return (<Modal open={options.state.open} onClose={options.onClose}>
            <Modal.Header>
                Error
            </Modal.Header>
            <Modal.Content>
                <p>{text}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={options.onClose}>
                    {closeBtn}
                </Button>
            </Modal.Actions>
        </Modal>);
    }

    if (isUndefined(options.state.item)) {
        return (<div/>);
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

    return (<div>
        {React.createElement(editForm, {
            key: 'editform',
            data: options.state.item,
            parent: options.parent,
            open: options.state.open,
            onSave: options.onSave,
            onClose: options.onClose,
            actions: options.props.actions,
            className: 'formbuilder-editform',
            localization: options.props.localization
        })}
        <Modal size="small" open={options.state.confirm} dimmer="inverted" onClose={options.confirmHandleCancel}>
            <Modal.Header>
                {questionTitle}
            </Modal.Header>
            <Modal.Content>
                <p>{options.state.confirmtext}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button className="buttontype1" onClick={options.state.confirmHandle}>{okBtn}</Button>
                <Button className="buttontype2" onClick={options.confirmHandleCancel}>{cancelBtn}</Button>
            </Modal.Actions>
        </Modal>
    </div>)
});
