import React, { Component } from 'react';

class ControlBar extends Component {
    
    controlRef = React.createRef();
    barRef = React.createRef();
    resizeRef = React.createRef();
    pointTopRef = React.createRef();
    pointLeftRef = React.createRef();
    pointRightRef = React.createRef();
    pointBottomRef = React.createRef();
    selectionRef = React.createRef();

    constructor(props: any) {
        super(props);
    }

    draw(options: any) {
        return '';
    }

    render() {
        return this?.draw({
            props: this.props,
            me: this,
        });
    }

    onRemoveControl = (key: any) => {
        //FormBuilderStore.remove({key});
    }

    onCopyControl(model: any, e: any) {
        // const str = JSON5.stringify(model);
        // const el = document.createElement('textarea');
        // el.value = str;
        // el.setAttribute('readonly', '');
        // el.style.position = 'absolute';
        // el.style.left = '-9999px';
        // document.body.appendChild(el);
        // const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
        // el.select();
        // document.execCommand('copy');
        // document.body.removeChild(el);
        // if (selected) {
        //     document.getSelection().removeAllRanges();
        //     document.getSelection().addRange(selected);
        // }
    }

    updateBarPosition() {}

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


export default ControlBar;