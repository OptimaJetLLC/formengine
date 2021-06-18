import React from 'react';
import { PanelGroup, Panel } from 'rsuite';
import { register } from 'optimajet-builder-shared';

register('accordion', options => {
    let props = {};

    let model = options.model;
    props.fluid = model.fluid;
    props.styled = model.styled;
    let className = options.props.className;
    return (
        <PanelGroup {...props} className={className} style={options.props.style} accordion defaultActiveKey={options.panels[0]?.key} bordered>
            {options.panels?.map(panel => <Panel defaultExpanded header={panel.title} eventKey={panel.key}>{panel?.content?.content}</Panel>)}
        </PanelGroup>
    );
});
