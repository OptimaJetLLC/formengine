import React from 'react';
import { Button, ButtonGroup, IconButton, Icon } from 'rsuite';
import { Camera, FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import { register } from 'optimajet-builder-shared';
import BaseModal from '../common/BaseModal';

const imageType = 'image/png';
const defaultFileName = 'camera-shot';

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

class CameraControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false, dataUrl: null};
    }

    showCameraModal = () => {
        this.setState({open: true, dataUrl: null});
    }

    onCancel = () =>  {
        this.setState({open: false, dataUrl: null});
    }

    onUpload = () =>  {
        this.props.upload(this.state.dataUrl);
        this.setState({open: false});
    }

    onClear = () => {
        this.setState({ dataUrl: null });
    }

    onTakePhoto = (takendataUrl) => {
        this.setState({ dataUrl: takendataUrl });
    }

    render() {
        const props = this.props;
        const state = this.state;

        const updloadedPreview = () => ((props.showPreview && state.dataUrl) && 
            <div className={'image-uploaded-preview' + (props.compact ? ' compact' : '')}>
                    {props.compact 
                        ? <img src={state.dataUrl} className='compact-image-preview'/>
                        : <img src={state.dataUrl} className={'image-preview'} />}
            </div>
        );

        const modalContent = state.dataUrl
            ? <div className={'react-html5-camera-photo'}>
                <img src={state.dataUrl} className={'image-preview'} />
              </div>
            : <Camera onTakePhotoAnimationDone={this.onTakePhoto}
                isFullscreen={false}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                imageType={IMAGE_TYPES.PNG}
                imageCompression={0.97}
                isMaxResolution={true}
                isImageMirror={true}
              />
        const modalButtons = [
            <IconButton appearance="primary" className="buttontype1" children={'Upload'} src={state.dataUrl} download={true}
                        onClick={this.onUpload} icon={<Icon icon="check"/>} disabled={!state.dataUrl}/>,
            (state.dataUrl && <IconButton appearance="subtle" children={'Reset'} className="ui button"
                        onClick={this.onClear} icon={<Icon icon="undo"/>}/>
            ),
            <Button  appearance="subtle" children={'Cancel'} onClick={this.onCancel}/>
        ]

        const cameraModal = () => (
            <BaseModal show={this.state.open}
                title="Take shot" onCancel={this.onCancel}
                content={modalContent}
                buttons={modalButtons}
            />
        );

        return (props.value
            ? <div style={props.compact ? {display: 'flex'} : {}}>
                {updloadedPreview()}
                <ButtonGroup block={props.fluid}>
                    <IconButton icon={<Icon icon="download"/>} children={props.compact ? null : 'Download'} block={props.fluid} onClick={props.onDownload}/>
                    <IconButton icon={<Icon icon="close"/>} children={props.compact ? null : 'Clear'} block={props.fluid} onClick={props.onClear}/>
                </ButtonGroup>
            </div>
            : <div>
                <IconButton icon={<Icon icon="camera"/>} children={'Take shot'} block={props.fluid} onClick={this.showCameraModal}/>
                {cameraModal()}
            </div>
        );
    }
}

register('camera', options => {
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
        const file = new File([blob], defaultFileName,{type:'image/png'});
        formData.append('data', file);
        formData.append('name', 'photo');
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
            <CameraControl {...props} upload={upload} onClear={options.onClear} onDownload={onDownload}></CameraControl>  
        </div>
    );
});
