import React from 'react';
import { Item, Modal } from 'semantic-ui-react';
import { register } from 'optimajet-builder-shared';

register('tree-picker-header', options => {
    return (
        <Modal.Header>{options.props.name}
            <div className="ui menu">
                <Item className="active tree" as="a">
                    <i className="list icon"/> Select
                </Item>
                <Item className="picked item" as="a">
                    <i className="checkmark icon"/> {options.props.selected} <span className="count"/>
                </Item>
            </div>
        </Modal.Header>
    );
});
