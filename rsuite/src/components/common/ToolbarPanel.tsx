import React from 'react';
import { Icon, IconButton, Panel } from 'rsuite';

// todo check args type, remove any
interface ToolbarArgs {
    header: any;
    content: any;
    className: string;
    minimizable: boolean;
    style: any;
}

export default ({ header, content, className, minimizable, style, ...props }: ToolbarArgs) => {
    const [minimized, setMinimized] = React.useState(false);
    const toggleMinimized = () => setMinimized(!minimized);
    return (
        <Panel shaded bodyFill className={('formbuilder-panel ' + className)} {...props}
               style={{ ...style, flex: minimized ? 'initial' : 1 }}>
            <div className="formbuilder-panel-container">
                <div className="formbuilder-panel-header">
                    {minimizable && <IconButton
                        onClick={toggleMinimized}
                        icon={<Icon icon={minimized ? 'chevron-right' : 'chevron-down'}/>}
                        appearance="subtle" size="xs"
                        style={{ marginRight: 5, marginLeft: -10 }}
                    />}
                    {header}
                </div>
                <div className="formbuilder-panel-content">{!minimized && content}</div>
            </div>
        </Panel>
    );
};
