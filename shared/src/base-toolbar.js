/* eslint-disable no-useless-escape */

import { Component } from 'react';
import BuilderActions from './actions';
import { isDefined } from './helpers';
import { dwKitExternalControlList, dwKitExternalControlsOnly } from './dwkit-util';

export default class BaseToolbar extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let externalControlsOnly = nextProps.externalControlsOnly;
        if (externalControlsOnly !== true && externalControlsOnly !== false) {
            externalControlsOnly = dwKitExternalControlsOnly();
        }

        let items = [];

        if (!externalControlsOnly) {
            items = [...nextProps.controls.getItems()];
        }

        if (Array.isArray(nextProps.templates) && nextProps.templates.length > 0) {
            items.push({ key: 'sepTemplates', title: 'Templates', isseparate: true, defaultopen: false });

            nextProps.templates.forEach(function (template) {
                items.push({
                    key: template,
                    builderType: 'customblock',
                    title: template,
                    control: undefined,
                    editControl: nextProps.editControl,
                    defaultValues: { formname: template, sourceType: 'form' }
                });
            });
        }

        let externalControls = nextProps.externalControlList || dwKitExternalControlList();
        if (externalControls) {
            items = items.concat(externalControls);
        }

        function makeLocalization(items, props) {
            if (!props.localization) {
                return;
            }
    
            const local = props.localization;
            for (let i = 0; i < items.length; i++) {
                if (isDefined(local[items[i].key])) {
                    items[i].title = local[items[i].key];
                }
            }
        }

        makeLocalization(items, nextProps);

        const stateDelta = {
            items: items,
        };

        return stateDelta;
    }

    onDoubleClick(item) {
        BuilderActions.add(item);
    }

    onExpand(item, value) {
        item.isexpanded = value;
        this.setCookie('toolbar_' + item.key, value);
        this.forceUpdate();
    }

    getCookie(name) {
        const matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name, value, options) {
        options = options || {};

        let expires = options.expires;

        if (typeof expires == 'number' && expires) {
            const d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        let updatedCookie = name + '=' + value;

        for (let propName in options) {
            updatedCookie += '; ' + propName;
            const propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += '=' + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

}
