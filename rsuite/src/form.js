import React from 'react';
import { WebForm } from 'optimajet-builder-shared';
import controlsInstance from './builder/controls-for-forms';
import 'rsuite/lib/styles/index.less';
export default class Form extends WebForm {

    constructor(props) {
        super(props);
        this.createControls = (...args) => controlsInstance.createControls.apply(
            controlsInstance,
            args
        );
    }

    load(code){
        const model = this.loadForm(code);
        this.setState({model});
    }

    setModel(model){
        this.setState({model});
    }

    setData(data){
        this.setState({data});
    }

    render() {
        const className = 'formbuilder-form' + ' ' + (this.props.className === undefined ?? this.props.className);

        const items = this.getItemsForRender();
        return (
            <div className={className} ref={(currentElement) => { this.currentElement = currentElement; }}>
                {items}
            </div>
        );
    }

    print(title){
        if(!this.currentElement)
            return;

        var source = this.currentElement.innerHTML;
        var options = "toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes";

        var win = window.open("", this.props.formName, options);
        if(!title){
            win.document.title = this.props.formName;
        }
        win.document.title = title ? title : "PrintForm";

        var stylenotprint = "<style type='text/css'>body, html { height: auto!important; width:auto!important;} body{margin:10px!important;} .dwkit-notprint{display:none!important;}</style>";

        win.document.head.insertAdjacentHTML("beforeend", stylenotprint);

        var styles = document.getElementsByTagName("style");
        for(var i=0; i < styles.length; i++){
            var style = styles[i];

            var el = "<style>" + style.innerHTML + "</style>";
            win.document.head.insertAdjacentHTML("beforeend", el);
        }

        var links = document.getElementsByTagName("link");
        for(var i=0; i < links.length; i++){
            var link = links[i];
            if(link.rel == "stylesheet"){
                var el = '<link href="' + link.href + '" rel="stylesheet" type="text/css" />';
                win.document.head.insertAdjacentHTML("beforeend", el);
            }
        }

        win.document.body.innerHTML = source;

        var images = win.document.getElementsByTagName("img");
        for(var i=0; i < images.length; i++){
            var image = images[i];
            if(!image.src){
                if(image.attributes["src"]){
                    var imgurl = image.attributes["src"].value;
                    if(imgurl && imgurl.length > 1){
                        image.src = location.origin + (imgurl[0] != "/" ? "/" : "") + imgurl;
                    }
                }
            }
        }

        win.focus();
        setTimeout(function(){
            win.print();
        }, 1000);
    }
}
