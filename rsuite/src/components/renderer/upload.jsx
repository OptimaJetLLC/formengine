import React from 'react';
import { isDefined, isNotEmptyString, register } from 'optimajet-builder-shared';

register('upload', options => {

    function onDownload(ev) {
        ev.preventDefault();

        const token = options.props.value;

        const request = new XMLHttpRequest();
        request.open('POST', options.props.downloadUrl + token, true);
        request.responseType = 'arraybuffer';

        request.onload = () => {
            let filename = options.getCustomFileName();

            if (!filename) {
                const disposition = request.getResponseHeader('Content-Disposition');
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(disposition);
                    if (matches && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }
            }

            let type = options.getCustomContentType();

            if (!type) {
                type = request.getResponseHeader('Content-Type');
            }

            const link = document.createElement('a');
            link.setAttribute('href', window.URL.createObjectURL(new Blob([request.response], { type })));
            link.setAttribute('download', filename ? filename : 'unknown');
            document.body.appendChild(link);
            link.onclick = () => {
                document.body.removeChild(link);
            };
            link.click();
        };

        request.send(null);
    }

    let type = options.props.type;
    let controls = [];
    let isForm = options.props.isForm;
    let token = options.props.value;

    if (isDefined(token) && token != null && token != '') {
        let downloadtext = 'Download';
        let cleartext = 'Clear';
        // let adminLangButton = dwKitAdminLangButton();
        // if (isDefined(adminLangButton)) {
        //     downloadtext = adminLangButton.download;
        //     cleartext = adminLangButton.clear;
        // }

        let isHideClear = options.props.disabled || options.props.readOnly || options.props.hideClearButton;
        controls.push(<a key="download" className="ui button" target="blank" onClick={onDownload}
                         href="#">{downloadtext}</a>);

        if (!isHideClear) {
            controls.push(<span key="sparator">&nbsp;&nbsp;</span>);
            controls.push(<button key="clear" className="ui button" onClick={options.onClear}>{cleartext}</button>);
        }
    }
    else {
        if (options.props.disabled || options.props.readOnly) {
            controls.push(<span></span>);
        }
        else {
            controls.push(<input key="uploadcontrol" type="file" name={options.props.name} onChange={options.onChange}
                                 value=""/>);
        }
    }

    if (isForm) {
        return (<div className="field">
            {isDefined(options.props.label) && <label>{options.props.label}</label>}
            <div data-buildertype={type}>
                {controls}
            </div>
        </div>);
    }

    let divClass = 'ui labeled input';
    if (options.props.fluid) {
        divClass += ' fluid';
    }

    if (options.props.error) {
        divClass += ' error';
    }

    if (isNotEmptyString(options.props.className)) {
        divClass += ' ' + options.props.className;
    }

    return (<div className={divClass} data-buildertype={type}>
        {options.props.label && <div className="ui label label">{options.props.label}</div>}
        {controls}
    </div>);
});
