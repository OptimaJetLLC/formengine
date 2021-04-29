import { Component } from 'react';
import { isDefined } from '../helpers';
import { draw } from '../component-render-registry';

export default class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var controlProps = {
            className: this.props.className,
            style: this.props.style
        };

        let model = this.props.additionalParams.model;
        const panels = this.getPanels(model.panels);
        
        return draw('accordion', {
            props: this.props,
            controlProps,            
            panels: panels,            
            model           
        });
    }

    getPanels(panels) {
        let res = [];
        if (Array.isArray(panels)) {
            for (let i = 0; i < panels.length; i++) {
                const panel = panels[i];

                if (panel.visibleCondition !== undefined && panel.visibleCondition !== null && panel.visibleCondition !== '') {
                    let args = 'data';
                    let body = 'return ' + panel.visibleCondition;
                    try {
                        if (!new Function(args, body)(this.props.data)) {
                            continue;
                        }
                    }
                    catch (e) {
                    }
                }
                res.push({
                    key: panel.psid,
                    title: panel.title,
                    content: { content: this.renderPanel(panel) }
                });
            }
        }

        return res;
    }

    renderPanel(pane) {
        let tabModel = this.props.additionalParams.model;

        let element = undefined;
        if (isDefined(tabModel.placeholders) &&
            Array.isArray(tabModel.placeholders[pane.psid]) &&
            tabModel.placeholders[pane.psid].length > 0) {
            let model = tabModel.placeholders[pane.psid];
            if (model) {
                element = this.props.createControls(this, {
                    ...this.props.additionalParams,
                    model: model,
                    parentPlaceholder: pane.psid,
                    parentItem: tabModel
                });
            }
        }
        else if (this.props.buildermode && this.props.createBuilderDropzone) {
            element = this.props.createBuilderDropzone(
                'tab_dropzone_footer',
                this.props.name,
                undefined,
                pane.title,
                pane.psid
            );
        }

        return element;
    }
}
