import React from 'react';
import { Panel } from 'rsuite';
import { register } from 'optimajet-builder-shared';

register('card', options => {
    let header = options.header;
    
    let className = "formbuilder-card";
    if(options.onClick){
        className += " " + "formbuilder-card-eventable";
    }

    let showDescriptionPanel = options.me.existPanel("description");
    let showExtraPanel = options.me.existPanel("extra");
    
    let panelProps = {};
    if(options.controlProps.style.width){
        panelProps.style = {
            width: "100%"
        }
    }

    return <div {...options.controlProps} className={className} onClick={options.onClick}>
        <Panel {...panelProps} shaded bordered bodyFill >
            {options.imgurl && <img className="formbuilder-card-image" src={options.imgurl} height="240" />}
            <Panel header={header}>
                {showDescriptionPanel && options.me.renderPanel("description")}
            </Panel>
            {showExtraPanel && <Panel>
                {options.me.renderPanel("extra")}
            </Panel>}
        </Panel>
    </div>;
});