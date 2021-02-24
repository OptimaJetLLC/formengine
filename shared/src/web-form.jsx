import BaseForm from './base-form';
export default class WebForm extends BaseForm {

    componentDidMount() {
        super.componentDidMount();
        window.addEventListener && window.addEventListener('resize', this.handleResize.bind(this))
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener && window.removeEventListener('resize', this.handleResize.bind(this))
    }

    getItemsForRender() {
        let controlsToReplace = [];
        let needCheckReplace = false;

        if (this.state.model !== null && this.state.model !== undefined) {
            controlsToReplace = this.state.controlsToReplace === null ? [] : this.state.controlsToReplace;
            needCheckReplace = this.state.controlsToReplace === null;
        }

        let items = this.createControls(
            this,
            {
                model: this.state.model,
                data: this.state.data,
                errors: this.state.errors ? this.state.errors : this.props.errors,
                handleEvent: this.handleEvent,
                getFormFunc: this.props.getFormFunc,
                getAdditionalDataForControl: this.props.getAdditionalDataForControl,
                hideControls: this.props.autoCheckConditions ? this.state.hideControls : this.props.hideControls,
                readOnlyControls: this.props.autoCheckConditions ? this.state.readOnlyControls : this.props.readOnlyControls,
                readOnly: this.props.readOnly,
                uploadUrl: this.props.uploadUrl,
                downloadUrl: this.props.downloadUrl,
                extendedData: this.props.extendedData,
                controlsToReplace: controlsToReplace,
                needCheckReplace: needCheckReplace,
                externalControlRender: this.props.externalControlRender,
                externalControlList: this.props.externalControlList,
                adaptiveViewType: this.props.adaptiveViewType ? this.props.adaptiveViewType : this.state.adaptiveViewType
            }
        );

        if (needCheckReplace) {
            this.state.controlsToReplace = controlsToReplace;
        }
        return items;
    }

    getAdaptiveViewType() {
        if (window.matchMedia && window.matchMedia('(max-width: 997px)').matches) {
            return 'mobile';
        }
        return 'desktop';
    }

}
