import React from 'react';
import ReactDOM from 'react-dom';
import { BuilderActions, DropzoneContext, isDefined, register } from 'optimajet-builder-shared';
import { getDisplayStyle } from './style-helper';
import $ from 'jquery';
import { Icon } from 'rsuite';

register('control-bar', options => {

    options.me.updateBarPosition = function(){
        if(!options.me.controlRef || !options.me.controlRef.current || !options.me.barRef || !options.me.barRef.current)
          return;
    
        let control = ReactDOM.findDOMNode(options.me.controlRef.current);
        let style = control.currentStyle || window.getComputedStyle(control);
        let dx = parseFloat(style.marginLeft);
        let dy = parseFloat(style.marginTop);

        let bar = ReactDOM.findDOMNode(options.me.barRef.current);
    
        let pos = $( control ).position();
        let controlPos = control.getBoundingClientRect();            
        let barPos = bar.getBoundingClientRect();   
        let x, y;
        if ($( control ).parents('table').length) { //hack for correct position in table (customElement in collectonEditor)
            const barSize = bar.children[0].getBoundingClientRect();
            x = controlPos.width/2 - barSize.width/2;
            y = -controlPos.height - barSize.height/2;
        }
        else {
            x = pos.left + controlPos.width/2 - barPos.width/2;
            y = pos.top - barPos.height/2;
        }
        
        x += dx;
        y += dy;

        if (x < 15) x = 15;        
        bar.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";

        if(options.me.resizeRef && options.me.resizeRef.current){
            let resize = ReactDOM.findDOMNode(options.me.resizeRef.current);
            let resizePos = resize.getBoundingClientRect();   
            
            if ($( control ).parents('table').length) { //hack for correct position in table (customElement in collectonEditor)
                const resizeSize = resize.children[0].getBoundingClientRect();
                x = controlPos.width - resizeSize.width / 2;
                y = -controlPos.height - resizeSize.height/2;
            }
            else {
                x = pos.left + controlPos.width - resizePos.width / 2;
                y = pos.top + controlPos.height - resizePos.height / 2;
            }
            
            x += dx;
            y += dy;

            resize.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }

        if(options.me.pointTopRef && options.me.pointTopRef.current){
            let pointTop = ReactDOM.findDOMNode(options.me.pointTopRef.current);
            
            x = pos.left; y = pos.top;
            x += dx; y += dy;

            pointTop.style.width = controlPos.width + "px";
            pointTop.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }

        if(options.me.pointBottomRef && options.me.pointBottomRef.current){
            let pointBottom = ReactDOM.findDOMNode(options.me.pointBottomRef.current);
            
            x = pos.left; y = pos.top + controlPos.height;
            x += dx; y += dy;

            pointBottom.style.width = controlPos.width + "px";
            pointBottom.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }

        if(options.me.pointLeftRef && options.me.pointLeftRef.current){
            let pointLeft = ReactDOM.findDOMNode(options.me.pointLeftRef.current);
            
            x = pos.left; y = pos.top;
            x += dx; y += dy;

            pointLeft.style.height = controlPos.height + "px";
            pointLeft.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }

        if(options.me.pointRightRef && options.me.pointRightRef.current){
            let pointRight = ReactDOM.findDOMNode(options.me.pointRightRef.current);
            
            x = pos.left + controlPos.width; y = pos.top;
            x += dx; y += dy;

            pointRight.style.height = controlPos.height + "px";
            pointRight.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }
    }

    var showBarElements = (show) => {
        if(show){
            $(".formbuilder-item-toolbar-header-buttons").show();
            $(".formbuilder-toolbar-resize").show();
        }
        else{
            $(".formbuilder-item-toolbar-header-buttons").hide();
            $(".formbuilder-toolbar-resize").hide();
        }
    }

    let model = options.props.model;

    let targetCss = 'formbuilder-zone-select';
    var onTargetDragEnter = (e) => {
        $(e.target).addClass(targetCss);
    }

    var onTargetDragLeave = (e) => {
        $(e.target).removeClass(targetCss);
    }

    var onDrop = (e) => {
        const el = $(e.target);
        if (el.length > 0) {
            BuilderActions.move(model.key, el[0]);
        }

        onDragEnd();
        return false;
    }

    var onDragStart = (e) => {
        let selector = '.formbuilder-zone';

        e.dataTransfer.setData('text', '');

        if(options.me.controlRef.current){
            var control = ReactDOM.findDOMNode(options.me.controlRef.current);
            var controlPos = control.getBoundingClientRect();
            e.dataTransfer.setDragImage(control, controlPos.width / 2, 0);
          }
    
        if (isDefined(model.forContainerType)) {
            let cTypes = model.forContainerType.split(',');
            let subSelector = '';
            cTypes.forEach(function (c) {
                if (subSelector.length > 0) {
                    subSelector += ',';
                }
                subSelector += '[data-buildertype=\'' + c + '\'] > ' + selector;
            });
            selector = subSelector;
        }

        $(selector)
            .addClass('formbuilder-zone-active')
            .on('dragenter', onTargetDragEnter)
            .on('dragleave', onTargetDragLeave)
            .on('dragover', function (e) {
                e.preventDefault();
            })
            .on('drop', onDrop);
    }

    var onDragEnd = () => {
        const zones = $('.formbuilder-zone');

        zones.removeClass('formbuilder-zone-active');
        zones.removeClass('formbuilder-zone-select')
        zones.off();
    }

    var onDragOver = (e) => {
        var control = undefined;
        if(options.me.controlRef.current)
            control = ReactDOM.findDOMNode(options.me.controlRef.current);
        if(control)
            $(control).addClass("formbuilder-item-selected");
    }

    var onDragLeave = (e) => {
        var control = undefined;
        if(options.me.controlRef.current)
            control = ReactDOM.findDOMNode(options.me.controlRef.current);
        if(control)
            $(control).removeClass("formbuilder-item-selected");
    }

    var onPinned = () => {
        let pinned = !model.pinned;
        let fields = { 
            pinned
         };
        
        if(!pinned){
            fields.pinnedLeft = undefined;
            fields.pinnedTop = undefined;
            fields["style-width"] = undefined;
            fields["style-height"] = undefined;
        }
        else{
            fields["style-marginLeft"] = undefined;
            fields["style-marginTop"] = undefined;
            fields.pinnedLeft = model["style-marginLeft"]; 
            fields.pinnedTop = model["style-marginTop"];
        }

        BuilderActions.changeItem(model.key, fields);
    }

    var mouseDX = undefined;
    var mouseDY = undefined;
    var mouseMove = (e) => {
        if(!options.me.controlRef.current)
            return;
        
        var control = ReactDOM.findDOMNode(options.me.controlRef.current);
        if(!control)
            return;
    
        var style = control.currentStyle || window.getComputedStyle(control);
        var dx = parseFloat(style.marginLeft);
        var dy = parseFloat(style.marginTop);    

        var parent = $('.formbuilder-preview');
        let offset = parent.offset();
        moveState.left = e.pageX - offset.left - (mouseDX ?? 0) - dx;
        moveState.top = e.pageY - offset.top - (mouseDY ?? 0) - dy;

        if(moveState.left < 0) moveState.left = 0;
        if(moveState.top < 0) moveState.top = 0;
                
        var rect = control.getBoundingClientRect();
        let maxX = parent.width() - rect.width;
        
        if(moveState.left > maxX) moveState.left = maxX;

        control.style.top = moveState.top + "px";
        control.style.left = moveState.left + "px";
        options.me.updateBarPosition();
    }

    var onMouseDown = (e) => {
        var control = undefined;
        if(options.me.controlRef.current)
            control = ReactDOM.findDOMNode(options.me.controlRef.current);
        
        if(control){
            var rect = control.getBoundingClientRect();
            mouseDX = e.pageX - rect.left - $(document).scrollLeft();
            mouseDY = e.pageY - rect.top - $(document).scrollTop();
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        }
    }  
    
    var mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);

        BuilderActions.changeItem(model.key, { pinnedLeft: moveState.left + "px", pinnedTop: moveState.top + "px" });
        mouseDX = undefined;
        mouseDY = undefined;
    }

    var resizeType = undefined;
    var startResize = (e, type) => {
        resizeType = type;
        
        var control = ReactDOM.findDOMNode(options.me.controlRef.current);
        var rect = control.getBoundingClientRect();
        mouseDX = e.pageX - rect.left - $(document).scrollLeft();
        mouseDY = e.pageY - rect.top - $(document).scrollTop();
        
        moveState.pageX = e.pageX;
        moveState.pageY = e.pageY;

        e.preventDefault();
        window.addEventListener('mousemove', onResize);
        window.addEventListener('mouseup', stopResize);
        showBarElements(false);
    }

    var stopResize = () => {
        window.removeEventListener('mousemove', onResize);
        window.removeEventListener('mouseup', stopResize);

        let fields = {};
        if(moveState.left != undefined) fields["pinnedLeft"] = moveState.left + "px";
        if(moveState.top != undefined) fields["pinnedTop"] = moveState.top + "px";
        if(moveState.width != undefined) fields["style-width"] = moveState.width + "px";
        if(moveState.height != undefined) fields["style-height"] = moveState.height + "px";
        if(moveState.marginLeft != undefined) fields["style-marginLeft"] = moveState.marginLeft + "px";
        if(moveState.marginTop != undefined) fields["style-marginTop"] = moveState.marginTop + "px";

        showBarElements(true);
        BuilderActions.changeItem(model.key, fields);
        moveState = {};
        mouseDX = undefined;
        mouseDY = undefined;
    }

    var moveState = {};
    var onResize = (e) => {
        if(options.me.controlRef.current){
            var control = ReactDOM.findDOMNode(options.me.controlRef.current);
            if(control){
                let rect = control.getBoundingClientRect();
                if(!resizeType || resizeType == "right"){
                    let width = e.clientX - rect.left;
                    control.style.width = width  + 'px';
                    moveState.width = width;
                }

                if(!resizeType || resizeType == "bottom"){
                    let height = e.clientY - rect.top;
                    control.style.height = height  + 'px';
                    moveState.height = height;
                }

                if(resizeType == "top"){
                    var style = control.currentStyle || window.getComputedStyle(control);
                    var dy = parseFloat(style.marginTop);    

                    var parent = $('.formbuilder-preview');
                    let offset = parent.offset();

                    if(model.pinned){
                        moveState.top = e.pageY - offset.top - (mouseDY ?? 0) - dy;

                        if(!moveState.originalBottom)
                            moveState.originalBottom = moveState.top + rect.height;

                        if(moveState.originalBottom - moveState.top < 0){
                            moveState.top = moveState.originalBottom;
                        }

                        if(moveState.top < 0) moveState.top = 0;
                                
                        control.style.top = moveState.top + "px";

                        let height = moveState.originalBottom - moveState.top;
                        control.style.height = height  + 'px';
                        moveState.height = height;
                    }
                    else{
                        moveState.marginTop = e.pageY - moveState.pageY + parseFloat(model["style-marginTop"] ?? 0);

                        if(!moveState.originalBottom)
                            moveState.originalBottom = moveState.marginTop + rect.height;

                        if(moveState.originalBottom - moveState.marginTop < 0){
                            moveState.marginTop = moveState.originalBottom;
                        }
                                
                        control.style.marginTop = moveState.marginTop + "px";

                        let height = moveState.originalBottom - moveState.marginTop;
                        control.style.height = height  + 'px';
                        moveState.height = height;
                    }
                }

                if(resizeType == "left"){
                    let style = control.currentStyle || window.getComputedStyle(control);                    
                    let parent = $('.formbuilder-preview');
                    let offset = parent.offset();

                    if(model.pinned){   
                        moveState.left = e.pageX - offset.left - (mouseDX ?? 0) - parseFloat(style["margin-left"] ?? 0);
                        
                        if(!moveState.originalRight)
                            moveState.originalRight = moveState.left + rect.width;

                        if(moveState.originalRight - moveState.left < 0){
                            moveState.left = moveState.originalRight;
                        }

                        if(moveState.left < 0) moveState.left = 0;
                                
                        control.style.left = moveState.left + "px";
                        
                        let width = moveState.originalRight - moveState.left;
                        control.style.width = width  + 'px';
                        moveState.width = width;
                    }
                    else{
                        moveState.marginLeft = e.pageX - moveState.pageX + parseFloat(model["style-marginLeft"] ?? 0);
                        
                        if(!moveState.originalRight)
                            moveState.originalRight = moveState.marginLeft + rect.width;

                        if(moveState.originalRight - moveState.marginLeft < 0){
                            moveState.marginLeft = moveState.originalRight;
                        }
                                
                        control.style.marginLeft = moveState.marginLeft + "px";
                        if(control.style.width != ""){
                            let width = moveState.originalRight - moveState.marginLeft;
                            control.style.width = width  + 'px';
                            moveState.width = width;
                        }
                    }
                }
                
                options.me.updateBarPosition();
            }
        }
    }

    var className = "formbuilder-item-toolbar-header";
    let controlBarKey = options.props.model["key"] + "_controlbar";
    let controlResizeKey = options.props.model["key"] + "_controlresize";
    let pointTopKey = options.props.model["key"] + "_pointTop";
    let pointBottomKey = options.props.model["key"] + "_pointBottom";
    let pointLeftKey = options.props.model["key"] + "_pointLeft";
    let pointRightKey = options.props.model["key"] + "_pointRight";

    return <DropzoneContext.Consumer>
        {({ visible }) => {
            let bar = (
                <div key={controlBarKey} ref={options.me.barRef}
                    className={'formbuilder-item-toolbar-container'} 
                    style={getDisplayStyle(visible)}>
                    <div className={className} 
                        onMouseOver={onDragOver}
                        onMouseLeave={onDragLeave}>
                        <div className="formbuilder-item-toolbar-header-buttons" >
                            <div className="formbuilder-item-toolbar-header-title" title={options.props.text} onDoubleClick={options.onCopyControl}>
                                {options.props.model["key"]}                
                            </div>
                            <Icon onClick={onPinned} icon={model.pinned ? 'star' : 'star-o'} />
                            {!model.pinned && <Icon draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd} icon='arrows' />}
                            {model.pinned && <Icon onMouseDown={onMouseDown} icon='arrows' />}
                            <Icon onClick={options.me.props.onEdit.bind(options.props.parent, options.props.model)} icon='edit2' />
                            <Icon onClick={options.me.props.onCopy.bind(options.props.parent, options.props.model)} icon='copy-o' />
                            <Icon onClick={options.me.props.onDelete.bind(options.props.parent, options.props.model)} icon='trash' />
                        </div>
                    </div>
                </div>
            );

            let resize = (
                <div key={controlResizeKey} ref={options.me.resizeRef} style={getDisplayStyle(visible)} className="formbuilder-item-toolbar-container">
                    <div className="formbuilder-toolbar-resize" onMouseDown={(e) => { startResize(e) }}/>
                </div>
            );

            let pointTop = (
                <div key={pointTopKey} ref={options.me.pointTopRef} style={getDisplayStyle(visible)} className="formbuilder-item-toolbar-container">
                    <div className="formbuilder-toolbar-point-top" onMouseDown={(e) => { startResize(e, "top") }}/>
                </div>
            );

            let pointLeft = (
                <div key={pointLeftKey} ref={options.me.pointLeftRef} style={getDisplayStyle(visible)} className="formbuilder-item-toolbar-container">
                    <div className="formbuilder-toolbar-point-left" onMouseDown={(e) => { startResize(e, "left") }}/>
                </div>
            );

            let pointBottom = (
                <div key={pointBottomKey} ref={options.me.pointBottomRef} style={getDisplayStyle(visible)} className="formbuilder-item-toolbar-container">
                    <div className="formbuilder-toolbar-point-bottom" onMouseDown={(e) => { startResize(e, "bottom") }}/>
                </div>
            );

            let pointRight = (
                <div key={pointRightKey} ref={options.me.pointRightRef} style={getDisplayStyle(visible)} className="formbuilder-item-toolbar-container">
                    <div className="formbuilder-toolbar-point-right" onMouseDown={(e) => { startResize(e, "right") }}/>
                </div>
            );
            
            return [React.cloneElement(options.props.control, { ref: options.me.controlRef }), pointTop, pointBottom, pointLeft, pointRight, bar, resize];
        }}
        </DropzoneContext.Consumer>;
});
