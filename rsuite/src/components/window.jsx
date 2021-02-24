/* eslint-disable eqeqeq */

import React, { Component } from 'react';
import { Button, Tag, Input, ButtonToolbar } from 'rsuite';
import JSON5 from 'json5';

export default class Window extends Component {

    constructor(props) {
        super(props);

        this.window = React.createRef();
        this.isDown = false;        
        this.offset = [];        
    }

    componentDidMount(){
        if(this.props.savePosition){
            var element = this.window.current;
            var savedValueLeft = this.getParam("left");
            if(savedValueLeft) element.style.left = savedValueLeft;
            var savedValueTop = this.getParam("top");
            if(savedValueTop) element.style.top = savedValueTop;
            
            var savedValueWidth = this.getParam("width");
            if(savedValueWidth) element.style.width = savedValueWidth;        
            var savedValueHeight = this.getParam("height");
            if(savedValueHeight) element.style.height = savedValueHeight;  
        }
    }

    getParam(name){
        if(localStorage){
            return localStorage.getItem("formbuilder-"+ this.props.name + "-" + name);
        }
    }

    setParam(name, value){
        localStorage.setItem("formbuilder-"+ this.props.name + "-" + name, value);
    }
   
    render() {
        let windowProps = {};
        if(!this.props.open){
            windowProps.style = {display: "none"};
        }

        let className = "formbuilder-editform formbuilder-editform-default";
        if(this.props.className){
            className += " " + this.props.className;
        }

        return (
            <div ref={this.window} className={className} {...windowProps}>
                <div className="formbuilder-editform-container">
                   {this.props.children}                    
                </div>               
                <div className="formbuilder-editform-move" onMouseDown={this.startMove.bind(this)}></div>
                <div className="formbuilder-editform-move-bottom" onMouseDown={this.startMove.bind(this)}></div>
                <div className="formbuilder-editform-resize" onMouseDown={this.startResize.bind(this)}></div>
                <div className="formbuilder-editform-close" onClick={this.props.onClose}></div>
            </div>
        );
    }
    
    startMove(e){
        e.preventDefault();

        this.isDown = true;
        var element = this.window.current;
        this.offset = [
            element.offsetLeft - e.clientX,
            element.offsetTop - e.clientY
        ];

        this.onMouseUpFunc = this.onMouseUp.bind(this);
        this.onMoveFunc = this.onMove.bind(this);
        this.stopMoveFunc = this.stopMove.bind(this);

        window.addEventListener('mouseup', this.onMouseUpFunc, true);
        window.addEventListener('mousemove', this.onMoveFunc);
        document.addEventListener('mouseup', this.stopMoveFunc);
    };

    stopMove(){
        window.removeEventListener('mouseup', this.onMouseUpFunc, true);
        window.removeEventListener('mousemove', this.onMoveFunc);
        document.removeEventListener('mouseup', this.stopMoveFunc);
    }

    onMouseUp(event)
    {
        event.preventDefault();
        this.isDown = false;
    };

    onMove(event){
        event.preventDefault();       
        if (this.isDown) {
            let element = this.window.current;
            var mousePosition = {        
                x : event.clientX,
                y : event.clientY        
            };

            var newPos = {
                x: mousePosition.x + this.offset[0],
                y: mousePosition.y + this.offset[1]
            }

            element.style.left =  newPos.x + 'px';
            element.style.top  = newPos.y + 'px';

            if(this.props.savePosition){
                this.setParam("left", element.style.left);
                this.setParam("top", element.style.top);
            }
        }
    }

    startResize(e){
        e.preventDefault();

        this.resizeFunc = this.onResize.bind(this);
        this.stopResizeFunc = this.stopResize.bind(this);

        window.addEventListener('mousemove', this.resizeFunc);
        window.addEventListener('mouseup', this.stopResizeFunc);
    }

    onResize(e) {
        var element = this.window.current;
        var width = e.clientX - element.getBoundingClientRect().left + 10;
        var height = e.clientY - element.getBoundingClientRect().top + 10;

        element.style.width = (width > 200 ? width : 200)  + 'px';
        element.style.height = (height > 200 ? height : 200)  + 'px';

        if(this.props.savePosition){
            this.setParam("width", element.style.width);
            this.setParam("height", element.style.height);
        }
    }
      
    stopResize() {
        window.removeEventListener('mousemove', this.resizeFunc);
        window.removeEventListener('mouseup', this.stopResizeFunc);
    }
}
