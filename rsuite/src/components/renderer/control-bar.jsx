import React from 'react';
import ReactDOM from 'react-dom';
import { BuilderActions, DropzoneContext, isDefined, register } from 'optimajet-builder-shared';
import { getDisplayStyle } from './style-helper';
import $ from 'jquery';
import { Icon } from 'semantic-ui-react';

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

    function onTargetDragEnter(item, css, e) {
        $(e.target).addClass(css);
    }

    function onTargetDragLeave(item, css, e) {
        $(e.target).removeClass(css);
    }

    function onDrop(item, e) {
        const el = $(e.target);
        if (el.length > 0) {
            BuilderActions.move(item.key, el[0]);
        }

        onDragEnd(item);
        return false;
    }

    function onDragStart(item, e) {
        let selector = '.formbuilder-zone';

        e.dataTransfer.setData('text', '');

        if(this.controlRef.current){
            var control = ReactDOM.findDOMNode(this.controlRef.current);
            var controlPos = control.getBoundingClientRect();
            e.dataTransfer.setDragImage(control, controlPos.width / 2, 0);
          }
    
        if (isDefined(item.forContainerType)) {
            let cTypes = item.forContainerType.split(',');
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
            .on('dragenter', onTargetDragEnter.bind(options.me, item, 'formbuilder-zone-select'))
            .on('dragleave', onTargetDragLeave.bind(options.me, item, 'formbuilder-zone-select'))
            .on('dragover', function (e) {
                e.preventDefault();
            })
            .on('drop', onDrop.bind(options.me, item));
    }

    function onDragEnd() {
        const zones = $('.formbuilder-zone');

        zones.removeClass('formbuilder-zone-active');
        zones.removeClass('formbuilder-zone-select')
        zones.off();
    }

    function onDragOver(e) {
        var control = undefined;
        if(options.me.controlRef.current)
            control = ReactDOM.findDOMNode(options.me.controlRef.current);
        if(control)
            $(control).addClass("formbuilder-item-selected");
    }

    function onDragLeave(e) {
        var control = undefined;
        if(options.me.controlRef.current)
            control = ReactDOM.findDOMNode(options.me.controlRef.current);
        if(control)
            $(control).removeClass("formbuilder-item-selected");
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
                        onMouseOver={onDragOver.bind(options.me)}
                        onMouseLeave={onDragLeave.bind(options.me)}>
                        <div className="formbuilder-item-toolbar-header-buttons" >
                            <div className="formbuilder-item-toolbar-header-title" title={options.props.text} onDoubleClick={options.onCopyControl}>
                                {options.props.model["key"]}                
                            </div>
                            <Icon draggable={true}
                                onDragStart={onDragStart.bind(options.me, options.props.model)}
                                onDragEnd={onDragEnd.bind(options.me, options.props.model)}
                                link name='move' />
                            <Icon onClick={options.me.props.onEdit.bind(options.props.parent, options.props.model)} link name='edit' />
                            <Icon onClick={options.me.props.onCopy.bind(options.props.parent, options.props.model)} link name='copy' />
                            <Icon onClick={options.me.props.onDelete.bind(options.props.parent, options.props.model)} link name='delete' />
                        </div>
                    </div>
                </div>
            );
            return [React.cloneElement(options.props.control, { ref: options.me.controlRef }), bar];
        }}
        </DropzoneContext.Consumer>;
});
