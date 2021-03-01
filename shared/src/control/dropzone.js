import { Component } from 'react';
import { isDefined, isUndefined } from '../helpers';
import { draw } from '../component-render-registry';

export default class Dropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commands: props.commands,
            states: props.states
        };
    }

    componentDidMount() {
        this.isMount = true;
    }

    componentWillUnmount() {
        this.isMount = false;
    }

    render() {
        const me = this;
        const parentItem = this.props.additionalParams.parentItem;
        let model = this.props.additionalParams.model;
        
        let iconFiletypes = undefined;
        if (this.props.iconFiletypes) {
            let types = this.props.iconFiletypes.split(',');
            if (Array.isArray(types) && types.length > 0) {
                iconFiletypes = [];
                types.forEach(function (t) {
                    iconFiletypes.push(t.trim());
                });
            }
        }

        const djsConfig = {
            addRemoveLinks: this.props.addRemoveLinks,
            autoProcessQueue: this.props.autoProcessQueue && isDefined(this.props.postUrl)
        };

        const componentConfig = {
            iconFiletypes,
            showFiletypeIcon: this.props.showFiletypeIcon,
            postUrl: isUndefined(this.props.postUrl) ? 'no-url' : this.props.postUrl
        };

        const eventHandlers = {
            success: me.fileUploadSuccess
        };

        return draw('dropzone', {
            componentConfig: componentConfig,
            djsConfig: djsConfig,
            eventHandlers: eventHandlers,
            isForm: this.isForm(parentItem),
            props: this.props,
            model
        })
    }

    isForm(m) {
        return m && (m['data-buildertype'] === 'form' || m['data-buildertype'] === 'formgroup');
    }

    fileUploadSuccess = (file, response) => {
        const handleEvent = this.props.additionalParams.handleEvent;
        const onSuccess = this.props.onSuccess;
        const onFail = this.props.onFail;

        if (handleEvent || onSuccess || onFail) {
            if (response.success) {
                const parameters = {
                    name: file.name,
                    size: file.size,
                    token: response.result.properties['Token'],
                    success: response.success,
                    properties: response.result.properties
                };

                if (onSuccess) {
                    onSuccess(this.props.name, this.props.propertyName, parameters);
                }
                else if (handleEvent) {
                    handleEvent({
                        key: this.props.name,
                        eventName: 'success',
                        name: this.props.name,
                        propertyName: this.props.propertyName,
                        value: response.message,
                        parameters
                    });
                }
            }
            else {
                const parameters = {
                    name: file.name,
                    size: file.size,
                    message: response.message,
                    success: response.success,
                    details: response.details
                };

                if (onFail) {
                    onFail(this.props.name, this.props.propertyName, parameters);
                }
                else if (handleEvent) {
                    handleEvent({
                        key: this.props.name,
                        eventName: 'fail',
                        name: this.props.name,
                        propertyName: this.props.propertyName,
                        parameters
                    });
                }
            }

            if (this.props.addRemoveLinks) {
                setTimeout(function () {
                    file._removeLink.click();
                }, 500);
            }
        }
    };

    getEvents() {
        return [
            'drop',
            'dragstart',
            'dragend',
            'dragenter',
            'dragover',
            'dragleave',
            'addedfile',
            'removedfile',
            'thumbnail',
            'error',
            'processing',
            'uploadprogress',
            'sending',
            'success',
            'complete',
            'canceled',
            'maxfilesreached',
            'maxfilesexceeded',
            'processingmultiple',
            'sendingmultiple',
            'successmultiple',
            'completemultiple',
            'canceledmultiple',
            'totaluploadprogress',
            'reset',
            'queuecompleted'
        ];
    }
}
