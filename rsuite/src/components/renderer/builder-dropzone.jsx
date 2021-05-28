import React from 'react';
import { Popup, TextArea } from 'semantic-ui-react';
import { DropzoneContext, register } from 'optimajet-builder-shared';
import { getDisplayStyle } from './style-helper';

register('builder-dropzone', options => {

    function getDz(visible) {
        return (<div name={options.key} key={options.key} elementafter={options.elementAfter}
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
