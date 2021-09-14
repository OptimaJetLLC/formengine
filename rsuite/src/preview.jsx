import React from 'react';
import { BasePreview } from 'optimajet-builder-shared';

export default class Preview extends BasePreview {

    render() {
        const preview = this.getPreview();
        const style = this.props.show ? {} : {display:"none"};
        return (
            <div className="form-container">
                <div className="formbuilder-form" style={style}>
                    {/* {preview.dropzoneHeader} */}
                    {preview.items}
                    {preview.dropzoneFooter}
                </div>                
            </div> 
        )
    }
}
