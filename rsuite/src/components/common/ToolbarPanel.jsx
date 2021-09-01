import React from "react";
import { Panel, IconButton, Icon } from 'rsuite';

export default ({header, content, className, minimizable, style, ...props}) => {
    const [minimized, setMinimized] =  React.useState(false)
    const toggleMinimized = () => setMinimized(!minimized);
    return (
    <Panel shaded bodyFill className={("formbuilder-panel " + className)} {...props} style={{...style, flex: minimized ? "initial" : 1}}>
        <div className="formbuilder-panel-container">
            <div className="formbuilder-panel-header">
                {minimizable &&  <IconButton
                    onClick={toggleMinimized}
                    icon={<Icon icon={minimized ? "chevron-right" : "chevron-down"} />}
                    appearance="subtle" size="xs"
                    style={{marginRight: 5, marginLeft: -10}}
                />}
                {header}
            </div>
            <div className="formbuilder-panel-content">{!minimized && content}</div>
        </div>
    </Panel>
)
};