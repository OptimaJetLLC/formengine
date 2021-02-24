import React, { createRef } from "react";
import SignaturePad from "react-signature-canvas";
import { Button, Modal, Image } from 'semantic-ui-react';
import { register } from 'optimajet-builder-shared';

const imageType = 'image/png';
const defaultFileName = 'signature-image';

const dataUrltoBlob = (dataUrl) => {
    let byteString = atob(dataUrl.split(',')[1]);
    
    let mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], {type: mimeString});
    return blob;
}

class SignatureControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false, dataUrl: null};        
        this.sigPad = createRef();
    }

    showCameraModal = () => {
        this.setState({open: true, dataUrl: null});
    }

    onCancel = () =>  {
        this.setState({open: false, dataUrl: null});
    }

    onUpload = () =>  {
        const dataUrl = this.sigPad.current.getCanvas().toDataURL("image/png");
        this.props.upload(dataUrl);
        this.setState({open: false, dataUrl});
    }

    onClear = () => {
        this.sigPad.current.clear();
    }

    render() {
        const props = this.props;
        const state = this.state;

        const updloadedPreview = () => ((props.showPreview && state.dataUrl) && 
            <div className={'image-uploaded-preview' + (props.compact ? ' compact' : '')}>
                    {props.compact 
                        ? <Image rounded src={state.dataUrl} className='compact-image-preview'/>
                        : <img src={state.dataUrl} className={'image-preview'} />}
            </div>
        );

        const cameraModal = () => (
            <Modal open={this.state.open} style={{width: 275}}>
                <Modal.Header>Draw signature</Modal.Header>
                <Modal.Content>
                    <div className={"signature-canvas-container"}>
                        <SignaturePad ref={this.sigPad} canvasProps={{ className: "canvas ui basic button" }} />
                        <Button fluid content={'Reset'} className="ui button" onClick={this.onClear} icon='cancel'/>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button className="buttontype1" content={'Upload'} src={state.dataUrl} download={true}
                        onClick={this.onUpload} icon='check'/>
                    <Button className="buttontype2" content={'Cancel'} onClick={this.onCancel}/>
                </Modal.Actions>
            </Modal>
        );

        return (props.value
            ? <div style={props.compact ? {display: 'flex'} : {}}>
                {updloadedPreview()}
                <Button.Group basic {...(props.fluid ? {fluid: true, widths: '2'} : {})}>
                    <Button icon="download" content={props.compact ? null : 'Download'} fluid={props.fluid} onClick={props.onDownload}/>
                    <Button icon="cancel" content={props.compact ? null : 'Clear'} fluid={props.fluid} onClick={props.onClear}/>
                </Button.Group>
            </div>
            : <div>
                <Button content={'Draw signature'} basic fluid={props.fluid} onClick={this.showCameraModal} icon='photo'/>
                {cameraModal()}
            </div>
        );
    }
}

register('signature-canvas', options => {
    const props = options.props;

    function onDownload(ev) {
        ev.preventDefault();

        const token = options.props.value;

        const request = new XMLHttpRequest();
        request.open('POST', options.props.downloadUrl + token, true);
        request.responseType = 'arraybuffer';

        request.onload = () => {
            let filename = defaultFileName;
            const disposition = request.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(disposition);
                if (matches && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }

            const link = document.createElement('a');
            link.setAttribute('href', window.URL.createObjectURL(new Blob([request.response], { type: imageType })));
            link.setAttribute('download', filename ? filename : 'unknown');
            document.body.appendChild(link);
            link.onclick = () => {
                document.body.removeChild(link);
            };
            link.click();
        };

        request.send(null);
    }

    const upload = (dataUrl) => {
        const blob = dataUrltoBlob(dataUrl);
        const formData = new FormData();
        const file = new File([blob], defaultFileName, {type:'image/png'});
        formData.append('data', file);
        formData.append('name', defaultFileName);
        window.$.ajax({
            url: props.uploadUrl,
            type: 'POST',
            processData: false,
            contentType: false,
            dataType: 'json',
            data: formData,
            success: function (jsonData) {
                options.onUpload(formData, jsonData);
            }
        });
    }

    return (
        <div className='field'>
            {options.props.label && <label>{options.props.label}</label>}  
            <SignatureControl {...props} upload={upload} onClear={options.onClear} onDownload={onDownload}></SignatureControl>  
        </div>
    );
});
