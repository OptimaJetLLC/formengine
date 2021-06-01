import React from 'react';
import { Popup, TextArea } from 'semantic-ui-react';
import { DropzoneContext, register, BuilderActions } from 'optimajet-builder-shared';
import { getDisplayStyle } from './style-helper';

register('builder-dropzone', options => {

    var onDrop = (e) => {
        var el = $(e.target);
        var data = JSON.parse(e.dataTransfer.getData('data'));
        e.dataTransfer.clearData();

        if (el.length > 0) {
            if (data.new) {                
                BuilderActions.add(data.key, el[0]);
            } else {
                BuilderActions.move(data.key, el[0]);
            }
        }

        return false;
    }
    const onDragOver = (e) => {
        e.preventDefault();
    }

    function getDz(visible) {
        return (<div name={options.key} key={options.key} elementafter={options.elementAfter}
                     onDragOver={onDragOver} onDrop={onDrop}
                     elementtoinsert={options.elementToInsert} placeholderkey={options.placeholderKey}
                     className="formbuilder-zone" style={getDisplayStyle(visible)}>{options.text}
        </div>);
    }

    return (<DropzoneContext.Consumer>
            {({ isBuilder }) => (
                <Popup
                    trigger={getDz(isBuilder)}
                    onClose={options.onClosePopup}
                    content={<TextArea rows="10" width="200px" onChange={options.onChangeDZ}
                                       placeholder="Insert a model control"/>}
                    on='click'
                />
            )}
        </DropzoneContext.Consumer>
    );
});
