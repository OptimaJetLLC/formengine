import React, { Component } from 'react';
import JSON5 from 'json5';
import FormBuilderStore from './store.jsx';
import { draw } from './component-render-registry';

export default class ControlBar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {};
        this.controlRef = React.createRef();
        this.barRef = React.createRef();
        this.resizeRef = React.createRef();
        this.pointTopRef = React.createRef();
        this.pointLeftRef = React.createRef();
        this.pointRightRef = React.createRef();
        this.pointBottomRef = React.createRef();
        this.selectionRef = React.createRef();
    }

    render() {
        return draw('control-bar', {
            props: this.props,
            onCopyControl: this.onCopyControl.bind(this, this.props.model),
            me: this,
        });
    }

    onRemoveControl = (key) => {
        FormBuilderStore.remove({key});
    }

    onCopyControl(model, e) {
        const str = JSON5.stringify(model);
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    }

    componentDidMount(){
        if (this.updateBarPosition) {
            window.addEventListener('resize', this.updateBarPosition);
            this.updateBarPosition();
        }
    }

    componentDidUpdate(){
        this.updateBarPosition && this.updateBarPosition();
    }
    
    componentWillUnmount() {
        this.updateBarPosition && window.removeEventListener('resize', this.updateBarPosition);
    }
}
