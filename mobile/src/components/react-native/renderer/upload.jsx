import React from 'react';
import { dwKitAdminLangButton, isDefined, register } from 'optimajet-builder-shared';
import { Platform, TouchableOpacity, View } from 'react-native';
import { Label } from './label.jsx';
import { Button, Text } from 'react-native-elements';

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
    let token = options.props.value;

    if (isDefined(token) && token != null && token !== '') {
        let downloadText = 'Download';
        let cleartext = 'Clear';
        const adminLangButton = dwKitAdminLangButton();
        if (isDefined(adminLangButton)) {
            downloadText = adminLangButton.download;
            cleartext = adminLangButton.clear;
        }

        let isHideClear = options.props.disabled || options.props.disabled || options.props.hideClearButton;
        controls.push(<TouchableOpacity key="download" onPress={onDownload}>
            <Text>{downloadText}</Text>
        </TouchableOpacity>);
        if (!isHideClear) {
            controls.push(<Text key="sparator">&nbsp;&nbsp;</Text>);
            controls.push(<Button key="clear" onPress={options.onClear} title={cleartext}/>);
        }
    }
    else {
        if (options.props.disabled || options.props.readOnly) {
            controls.push(<Text/>);
        }
        else {
            const control = Platform.select({
                native: () => {
                    // todo use custom file upload component https://github.com/react-native-community/react-native-image-picker
                    return (<Text h1 style={{ color: 'red' }}>Implement me!</Text>);
                },
                default: () => (<Text>This control is unavailable on web.</Text>)
                    // (<input key="uploadcontrol" type="file" name={options.props.name}
                    //                    onChange={options.onChange} value=""/>),
            });
            controls.push(control);
        }
    }

    // if (options.props.error) {
    //     divClass += ' error';
    // }

    // todo show error
    return (<View data-buildertype={type}>
        {options.props.label && <Label>{options.props.label}</Label>}
        {controls}
    </View>);
});
