import { Component } from 'react';
import { isDefined } from '../helpers';
import { draw } from '../component-render-registry';

export default class GridLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {


        // else if (control === GridLayout) {
        //     props.draggable = model.draggable;
        //     props.resizable = model.resizable;
        //     props.scroll = model.scroll;
        //     props.cols = model.cols;
    
        //     props['data-panes'] = model.panes;
        //     props.placeholders = model.placeholders;
    
        //     this.setCreateControlsProps(props, {
        //         data, buildermode, model, children, getFormFunc, getAdditionalDataForControl, disableRefs, uploadUrl,
        //         downloadUrl, extendedData, controlsToReplace, eventOnEdit, eventOnDelete, eventOnCopy,
        //         adaptiveViewType, handleEvent, errors, readOnlyControls, readOnly, needCheckReplace
        //     });
    
        //     res = (<GridLayout {...props} />);

        return draw('grid-layout', {
            getCookie: this.getCookie,
            setCookie: this.setCookie,
            me: this,
            onLayoutChange: this.onLayoutChange,
            props: this.props,
        });
    }

    onLayoutChange = (layout) => {
        if (this.props.buildermode) {
            const panes = this.props['data-panes'];
            if (Array.isArray(panes)) {
                panes.forEach(function (pane) {
                    layout.forEach(function (l) {
                        if (pane.psid == l.i) {
                            pane.x = l.x;
                            pane.y = l.y;
                            pane.w = l.w;
                            pane.h = l.h;
                        }
                    });
                });
            }
        }
        else if (this.props.draggable || this.props.resizable) {
            this.setCookie(window.location.pathname + '_' + this.props.name, JSON.stringify(layout));
        }

        if (isDefined(this.props.handleEvent)) {
            this.props.handleEvent({
                undefined,
                key: this.props.name,
                eventName: 'onLayoutChange',
                parameters: { layout: layout }
            });
        }
    };

    getCookie(name) {
        // todo document
        const matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name, value, options) {
        options = options || {};

        let expires = options.expires;

        if (typeof expires == 'number' && expires) {
            let d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        let updatedCookie = name + '=' + value;

        for (const propName in options) {
            updatedCookie += '; ' + propName;
            const propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += '=' + propValue;
            }
        }

        // todo document
        document.cookie = updatedCookie;
    }
}
