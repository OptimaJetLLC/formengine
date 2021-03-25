import React from 'react';
import ReactDOM from 'react-dom';
import { BuilderActions, DropzoneContext, isDefined, register } from 'optimajet-builder-shared';
import { getDisplayStyle } from './style-helper';
import $ from 'jquery';
import { Icon } from 'rsuite';
import { IgnorePlugin } from 'webpack';

register('control-bar', options => {
    options.me.updateBarPosition = function(){
        if(!options.me.controlRef || !options.me.controlRef.current || !options.me.barRef || !options.me.barRef.current)
          return;
    
        var control = ReactDOM.findDOMNode(options.me.controlRef.current);
        var bar = ReactDOM.findDOMNode(options.me.barRef.current);
    
        var pos = $( control ).position();
        var controlPos = control.getBoundingClientRect();            
        var barPos = bar.getBoundingClientRect();   
        var x, y;
        if ($( control ).parents('table').length) { //hack for correct position in table (customElement in collectonEditor)
            const barSize = bar.children[0].getBoundingClientRect();
            x = controlPos.width - barSize.width;
            y = -controlPos.height - barSize.height/2;
        }
        else {
            x = pos.left + controlPos.width - barPos.width;
            y = pos.top - barPos.height/2;
        }
        
        if (x < 15) x = 15;        
        bar.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
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
        BuilderActions.changeItem(model.key, { pinned, pinnedPositionX: undefined, pinnedPositionY: undefined });
    }

    var lastPageX = undefined;
    var lastPageY = undefined;
    var mouseMove = (e) => {
        lastPageX = e.pageX;
        lastPageY = e.pageY;

        var control = undefined;
        if(options.me.controlRef.current){
            control = ReactDOM.findDOMNode(options.me.controlRef.current);

            if(control){
                control.style.top = e.pageY + "px";
                control.style.left = e.pageX + "px";
            }
        }

        var bar = undefined;
        if(options.me.barRef.current){
            bar = ReactDOM.findDOMNode(options.me.barRef.current);

            if(bar){
                bar.style.top = e.pageY + "px";
                bar.style.left = e.pageX + "px";
            }
        }
    }

    var onMouseDown = () => {
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', function(){
            document.removeEventListener('mousemove', mouseMove);
            BuilderActions.changeItem(model.key, { pinnedPositionX: lastPageX, pinnedPositionY: lastPageY });
        });
    }    
    var className = "formbuilder-item-toolbar-header";
    let controlBarKey = options.props.model["key"] + "_controlbar";
    return <DropzoneContext.Consumer>
        {({ visible }) => {
            var bar = (
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
            return [React.cloneElement(options.props.control, { ref: options.me.controlRef }), bar];
        }}
        </DropzoneContext.Consumer>;
});
