import React from "react";
import { Panel } from 'rsuite';

export default ({header, content, ...props}) => (
    <Panel shaded bodyFill className="formbuilder-panel" {...props}>
        <div className="formbuilder-panel-container">
            <div className="formbuilder-panel-header">{header}</div>
            <div className="formbuilder-panel-content">{content}</div>
        </div>
    </Panel>
);