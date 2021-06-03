import React from 'react';
import ReactDOM from 'react-dom';
import { Popup, TextArea } from 'semantic-ui-react';
import { DropzoneContext, register, BuilderActions } from 'optimajet-builder-shared';
import { getDisplayStyle } from './style-helper';

register('builder-dropzone', options => {  
    options.me.updateFrontPosition = (dropzoneFrontRef, dropzoneRef) => {
        options.me.dropzoneRef = dropzoneRef;
        options.me.dropzoneFrontRef = dropzoneFrontRef;
        if (!options.me.dropzoneRef || !options.me.dropzoneFrontRef)
            return;

        let control = ReactDOM.findDOMNode(options.me.dropzoneRef);
        let style = control.currentStyle || window.getComputedStyle(control);
        let dx = parseFloat(style.marginLeft);
        let dy = parseFloat(style.marginTop);

        let pos = $(control).position();
        let controlPos = control.getBoundingClientRect();
        let x, y;

        x += dx;
        y += dy;

        if (options.me.dropzoneFrontRef && options.me.dropzoneFrontRef) {
            let selection = ReactDOM.findDOMNode(options.me.dropzoneFrontRef);

            x = pos.left; y = pos.top;
            x += dx; y += dy;

            selection.style.width = controlPos.width + "px";
            selection.style.height = controlPos.height + "px";
            selection.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }
    }

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
        let dropzoneRef;
        let dropzoneFrontRef;
        return <>
            <div key={(options.key + "_front")} name={options.key} ref={(ref) => {
                options.me.dropzoneFrontRef = ref;
                dropzoneFrontRef = ref;
            }}
                 className="formbuilder-item-toolbar-container"
                 style={getDisplayStyle(visible)}
                 onDragOver={onDragOver} onDrop={onDrop}
                 elementafter={options.elementAfter} elementtoinsert={options.elementToInsert} placeholderkey={options.placeholderKey}
                 />
            <div name={options.key} key={options.key} ref={(ref) => {
                options.me.dropzoneRef = ref;
                dropzoneRef = ref;
                options.me.updateFrontPosition(dropzoneFrontRef, dropzoneRef);
            }}
                 className="formbuilder-zone" 
                 style={getDisplayStyle(visible)}>
                {options.text}
            </div>
        </>;
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
