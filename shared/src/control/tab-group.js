import { Component } from 'react';
import { isDefined } from '../helpers';
import { draw } from '../component-render-registry';

export default class TabGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        if (isDefined(props.value)) {
            this.state.activeitem = props.value;
        }
        else if (props.activeitem != null) {
            this.state.activeitem = props.activeitem;
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.activeitem !== nextProps.value) {
            return { activeitem: nextProps.value };
        }

        return null;
    }

    render() {
        var controlProps = {
            className: this.props.className,
            style: this.props.style
        };

        let model = this.props.additionalParams.model;
        const panes = this.getPanes(model.panes);
        let vertical = model.vertical;        

        return draw('tab-group', {
            props: this.props,
            controlProps,
            onTabChange: this.onTabChange,
            panes: panes,
            vertical,
            model           
        });
    }

    getPanes(panes) {
        let res = [];
        if (Array.isArray(panes)) {
            for (let i = 0; i < panes.length; i++) {
                const pane = panes[i];

                if (pane.visibleCondition !== undefined && pane.visibleCondition !== null && pane.visibleCondition !== '') {
                    let args = 'data';
                    let body = 'return ' + pane.visibleCondition;
                    try {
                        if (!new Function(args, body)(this.props.data)) {
                            continue;
                        }
                    }
                    catch (e) {
                    }
                }
                res.push({
                    menuItem: pane.title,
                    pane: { key: pane.psid, className: 'top', content: this.renderPanel(pane) }
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

    onTabChange = (e, { activeIndex }) => {
        if(this.props.buildermode)
            this.forceUpdate();

        if (isDefined(this.props.additionalParams.handleEvent)) {
            let model = this.props.additionalParams.model;
            this.props.additionalParams.handleEvent({
                e,
                key: this.props.name,
                eventName: 'onTabChange',
                parameters: { targetIndex: activeIndex, pane: model.panes[activeIndex] }
            });
        }
    }
}
