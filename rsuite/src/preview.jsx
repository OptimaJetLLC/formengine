import React from 'react';
import { BasePreview } from 'optimajet-builder-shared';

export default class Preview extends BasePreview {

    render() {
        const preview = this.getPreview();
        return (
            <div className="formbuilder-preview">
                {/* {preview.dropzoneHeader} */}
                {preview.items}
                {preview.dropzoneFooter}
            </div>
        )
    }
}
