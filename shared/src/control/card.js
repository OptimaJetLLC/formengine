import { Component } from 'react';
import JSON5 from 'json5';
import { draw } from '../component-render-registry';
import { initDefaultState } from '../formdata';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let replaceControlValue = this.props.replaceControlValue;
        let model = this.props.additionalParams.model;

        var controlProps = {
            key: model.key,
            className: this.props.className,
            style: this.props.style
        };
        
        let activeEvent = model.events && model.events["onClick"] && model.events["onClick"].active;
        let onClick = undefined;
        if(activeEvent){
            onClick = this.onClick.bind(this);
        }

        return draw('card', {
            props: this.props,
            controlProps: controlProps,
            me: this,
            header: replaceControlValue(model.header),
            imgurl: replaceControlValue(model.imgurl),
            onClick
        });
    }

    existPanel(id){
        if(this.props.buildermode)
            return true;

        let model = this.props.additionalParams.model;
        let placeholders = model.placeholders;

        if(placeholders != undefined && 
            Array.isArray(placeholders[id]) &&
            placeholders[id].length > 0){
            return true;
        }
        return false;
    }

    renderPanel(id){
        let model = this.props.additionalParams.model;
        let placeholders = model.placeholders;
        let element = undefined;
        if(placeholders != undefined && 
            Array.isArray(placeholders[id]) &&
            placeholders[id].length > 0){
            let model = placeholders[id];
            if(model) {
                element = this.props.createControls(this, {
                    ...this.props.additionalParams,
                    model: model,
                    parentPlaceholder: id                    
                });

                let dzkey = id;
                
                if(this.props.buildermode && this.props.createBuilderDropzone){
                    if (element.length > 0 && model.length > 0) {
                        element.unshift(this.props.createBuilderDropzone(dzkey + "tab_dropzone_header", this.props.name, undefined, id, id));
                    }
                    element.push(this.props.createBuilderDropzone(dzkey + "tab_dropzone_footer", this.props.name, model[model.length - 1].key, id, id));
                } 
            }
        }
        else if(this.props.buildermode && this.props.createBuilderDropzone){
            element = this.props.createBuilderDropzone("tab_dropzone_footer", this.props.name, undefined, id, id);
        } 

        return element;
    }

    onClick = (e) => {
        if (this.props.additionalParams.handleEvent != undefined) {
            this.props.additionalParams.handleEvent({syntheticEvent: e, 
                key: this.props.name, 
                propertyName: this.props.propertyName,
                eventName: "onClick", 
                parameters: Card.copyObj(this.props.additionalParams.data)});
        }
    }

    static copyObj(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.copyObj(obj[attr]);
        }
        return copy;
    }
}