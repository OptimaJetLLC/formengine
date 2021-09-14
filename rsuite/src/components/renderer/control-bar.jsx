import React from 'react';
import ReactDOM from 'react-dom';
import { FormBuilderStore, BuilderActions, DropzoneContext, isDefined, register } from 'optimajet-builder-shared';
import { getDisplayStyle } from './style-helper';
import $ from 'jquery';
import { Icon, IconStack } from 'rsuite';

register('control-bar', options => {
    let model = options.props.model;
    let state = options.me.state;
    let me = options.me;

    let mouseDX = undefined;
    let mouseDY = undefined;
    let moveState = {};
    let resizeType = undefined;

    FormBuilderStore.listenTo(BuilderActions.showEditForm, selectedKey => {
        var isCurrent = selectedKey === model.key;
        if (state.selected != isCurrent) {
            me.setState({ selected: isCurrent });
        }
    });

    options.me.updateBarPosition = () => {
        if (state.dragOverTop || state.dragOverBottom) {
            return;
        }
        if (!options.me.controlRef || !options.me.controlRef.current || !options.me.barRef || !options.me.barRef.current)
            return;

        let control = ReactDOM.findDOMNode(options.me.controlRef.current);
        let style = control.currentStyle || window.getComputedStyle(control);
        let dx = parseFloat(style.marginLeft);
        let dy = parseFloat(style.marginTop);

        let bar = ReactDOM.findDOMNode(options.me.barRef.current);

        let pos = $(control).position();
        let controlPos = control.getBoundingClientRect();
        let barPos = bar.getBoundingClientRect();
        let x, y;
        if ($(control).parents('table').length) { //hack for correct position in table (customElement in collectonEditor)
            var barSize = bar.children[0].getBoundingClientRect();
            x = controlPos.width / 2 - barSize.width / 2;
            y = -controlPos.height - barSize.height / 2;
        }
        else {
            x = pos.left + controlPos.width / 2 - barPos.width / 2;
            y = pos.top - barPos.height / 2;
        }

        x += dx;
        y += dy;

        let type = model['data-buildertype'];
        let isContainer = type == "container" || type == "form" || type == "repeater" || type == "formgroup";
        if (isContainer) {
            y -= 15;
        }

        if (type == "label") {
            y -= 15;
        }

        if (x < 15) x = 15;
        bar.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";

        if (options.me.resizeRef && options.me.resizeRef.current) {
            let resize = ReactDOM.findDOMNode(options.me.resizeRef.current);
            let resizePos = resize.getBoundingClientRect();

            if ($(control).parents('table').length) { //hack for correct position in table (customElement in collectonEditor)
                var resizeSize = resize.children[0].getBoundingClientRect();
                x = controlPos.width - resizeSize.width / 2;
                y = -controlPos.height - resizeSize.height / 2;
            }
            else {
                x = pos.left + controlPos.width - resizePos.width / 2;
                y = pos.top + controlPos.height - resizePos.height / 2;
            }

            x += dx;
            y += dy;

            resize.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }

        if (options.me.pointTopRef && options.me.pointTopRef.current) {
            let pointTop = ReactDOM.findDOMNode(options.me.pointTopRef.current);

            x = pos.left; y = pos.top - 9;
            x += dx; y += dy;

            pointTop.style.width = controlPos.width + "px";
            pointTop.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }

        if (options.me.pointBottomRef && options.me.pointBottomRef.current) {
            let pointBottom = ReactDOM.findDOMNode(options.me.pointBottomRef.current);

            x = pos.left - 2; y = pos.top + controlPos.height - 9;
            x += dx; y += dy;

            pointBottom.style.width = controlPos.width + "px";
            pointBottom.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }

        if (options.me.pointLeftRef && options.me.pointLeftRef.current) {
            let pointLeft = ReactDOM.findDOMNode(options.me.pointLeftRef.current);

            x = pos.left - 9; y = pos.top;
            x += dx; y += dy;

            pointLeft.style.height = controlPos.height + "px";
            pointLeft.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }

        if (options.me.pointRightRef && options.me.pointRightRef.current) {
            let pointRight = ReactDOM.findDOMNode(options.me.pointRightRef.current);

            x = pos.left + controlPos.width - 9; y = pos.top - 2;
            x += dx; y += dy;

            pointRight.style.height = controlPos.height + "px";
            pointRight.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }

        if (options.me.selectionRef && options.me.selectionRef.current) {
            let selection = ReactDOM.findDOMNode(options.me.selectionRef.current);

            x = pos.left; y = pos.top;
            x += dx; y += dy;

            selection.style.width = controlPos.width + "px";
            selection.style.height = controlPos.height + "px";
            selection.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }
    }

    var onDrop = (e) => {
        var el = $(e.target);
        var data = JSON.parse(e.dataTransfer.getData('data'));

        if (el.length > 0) {
            if (data.new) {                
                BuilderActions.add(data.key, el[0]);
            } else {
                BuilderActions.move(data.key, el[0]);
            }
        }

        onDragEnd();
        return false;
    }

    var onDragStart = (e) => {
        me.setState({dragging: true});
        e.dataTransfer.clearData();
        e.dataTransfer.setData('data', JSON.stringify({key: model.key, new: false}));

        if (options.me.controlRef.current) {
            var control = ReactDOM.findDOMNode(options.me.controlRef.current);
            var controlPos = control.getBoundingClientRect();
            e.dataTransfer.setDragImage(control, controlPos.width / 2, 0);
        }
    }

    var onDragOver = (e) => {
        e.preventDefault();
        let controlPos = e.currentTarget.getBoundingClientRect();
        if (e.clientY <= (controlPos.top + controlPos.height / 2)) 
        {
            me.setState({dragOverTop: true, dragOverBottom: false});
        } else {
            me.setState({dragOverTop: false, dragOverBottom: true});
        }
    }

    var onDragEnd = (e) => {   
        me.setState({dragging: false, dragOverTop: false, dragOverBottom: false});
    }

    var onDragEnter = (e) => {   
        onDragOver(e);
    }

    var onDragLeave = (e) => { 
        me.setState({dragOverTop: false, dragOverBottom: false });
    }

    var onMouseOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        var { hovered } = state;
        if (!hovered) {
            me.setState({ hovered: true });
        }
    }

    var onMouseLeave = (e) => {
        var { hovered } = state;
        if (hovered) {
            me.setState({ hovered: false });
        }
    }

    var onPinned = () => {
        let pinned = !model.pinned;
        let fields = {
            pinned
        };

        if (!pinned) {
            fields.pinnedLeft = undefined;
            fields.pinnedTop = undefined;
            fields["style-width"] = undefined;
            fields["style-height"] = undefined;
        }
        else {
            fields["style-marginLeft"] = undefined;
            fields["style-marginTop"] = undefined;
            fields.pinnedLeft = model["style-marginLeft"];
            fields.pinnedTop = model["style-marginTop"];
        }

        BuilderActions.changeItem(model.key, fields);
    }

    var mouseMove = (e) => {
        if (!options.me.controlRef.current)
            return;

        var control = ReactDOM.findDOMNode(options.me.controlRef.current);
        if (!control)
            return;

        var style = control.currentStyle || window.getComputedStyle(control);
        var dx = parseFloat(style.marginLeft);
        var dy = parseFloat(style.marginTop);

        var parent = $('.formbuilder-preview');
        let offset = parent.offset();
        moveState.left = e.pageX - offset.left - (mouseDX ?? 0) - dx;
        moveState.top = e.pageY - offset.top - (mouseDY ?? 0) - dy;

        if (moveState.left < 0) moveState.left = 0;
        if (moveState.top < 0) moveState.top = 0;

        var rect = control.getBoundingClientRect();
        let maxX = parent.width() - rect.width;

        if (moveState.left > maxX) moveState.left = maxX;

        control.style.top = moveState.top + "px";
        control.style.left = moveState.left + "px";
        options.me.updateBarPosition();
    }

    var onMouseDown = (e) => {
        var control = undefined;
        
        options.me.props.onEdit(options.props.model);
        options.me.setState({ selected: true })
        if (options.me.controlRef.current)
            control = ReactDOM.findDOMNode(options.me.controlRef.current);

        if (control && !!model.pinned) {
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

        let fields = {
            pinnedLeft: moveState.left != undefined ? moveState.left + "px" : undefined,
            pinnedTop: moveState.top != undefined ? moveState.top + "px" : undefined
        };

        BuilderActions.changeItem(model.key, fields);
        mouseDX = undefined;
        mouseDY = undefined;
    }

    var startResize = (e, type) => {
        resizeType = type;

        var control = ReactDOM.findDOMNode(options.me.controlRef.current);
        var rect = control.getBoundingClientRect();
        mouseDX = e.pageX - rect.left - $(document).scrollLeft();
        mouseDY = e.pageY - rect.top - $(document).scrollTop();

        moveState.pageX = e.pageX;
        moveState.pageY = e.pageY;

        e.preventDefault();
        e.stopPropagation();
        me.props.parent.setState({resizing: true});
        me.setState({thisResizing: true});
        window.addEventListener('mousemove', onResize);
        window.addEventListener('mouseup', stopResize);
    }

    var stopResize = () => {
        window.removeEventListener('mousemove', onResize);
        window.removeEventListener('mouseup', stopResize);
        me.props.parent.setState({resizing: false});
        me.setState({thisResizing: false});

        let fields = {};
        if (moveState.left != undefined) fields["pinnedLeft"] = moveState.left + "px";
        if (moveState.top != undefined) fields["pinnedTop"] = moveState.top + "px";
        if (moveState.width != undefined) fields["style-width"] = moveState.width + "px";
        if (moveState.height != undefined) fields["style-height"] = moveState.height + "px";
        if (moveState.marginLeft != undefined) fields["style-marginLeft"] = moveState.marginLeft + "px";
        if (moveState.marginTop != undefined) fields["style-marginTop"] = moveState.marginTop + "px";

        BuilderActions.changeItem(model.key, fields);
        moveState = {};
        mouseDX = undefined;
        mouseDY = undefined;
    }

    var onResize = (e) => {
        if (options.me.controlRef.current) {
            e.preventDefault();
            e.stopPropagation();
            var control = ReactDOM.findDOMNode(options.me.controlRef.current);
            if (control) {
                let rect = control.getBoundingClientRect();
                if (!resizeType || resizeType == "right") {
                    let width = e.clientX - rect.left;
                    control.style.width = width + 'px';
                    moveState.width = width;
                }

                if (!resizeType || resizeType == "bottom") {
                    let height = e.clientY - rect.top;
                    control.style.height = height + 'px';
                    moveState.height = height;
                }

                if (resizeType == "top") {
                    var style = control.currentStyle || window.getComputedStyle(control);
                    var dy = parseFloat(style.marginTop);

                    var parent = $('.formbuilder-preview');
                    let offset = parent.offset();

                    if (model.pinned) {
                        moveState.top = e.pageY - offset.top - (mouseDY ?? 0) - dy;

                        if (!moveState.originalBottom)
                            moveState.originalBottom = moveState.top + rect.height;

                        if (moveState.originalBottom - moveState.top < 0) {
                            moveState.top = moveState.originalBottom;
                        }

                        if (moveState.top < 0) moveState.top = 0;

                        control.style.top = moveState.top + "px";

                        let height = moveState.originalBottom - moveState.top;
                        control.style.height = height + 'px';
                        moveState.height = height;
                    }
                    else {
                        moveState.marginTop = e.pageY - moveState.pageY + parseFloat(model["style-marginTop"] ?? 0);

                        if (!moveState.originalBottom)
                            moveState.originalBottom = moveState.marginTop + rect.height;

                        // if(moveState.originalBottom - moveState.marginTop < 0){
                        //     moveState.marginTop = moveState.originalBottom;
                        // }

                        control.style.marginTop = moveState.marginTop + "px";

                        // let height = moveState.originalBottom - moveState.marginTop;
                        // control.style.height = height  + 'px';
                        // moveState.height = height;
                    }
                }

                if (resizeType == "left") {
                    let style = control.currentStyle || window.getComputedStyle(control);
                    let parent = $('.formbuilder-preview');
                    let offset = parent.offset();

                    if (model.pinned) {
                        moveState.left = e.pageX - offset.left - (mouseDX ?? 0) - parseFloat(style["margin-left"] ?? 0);

                        if (!moveState.originalRight)
                            moveState.originalRight = moveState.left + rect.width;

                        if (moveState.originalRight - moveState.left < 0) {
                            moveState.left = moveState.originalRight;
                        }

                        if (moveState.left < 0) moveState.left = 0;

                        control.style.left = moveState.left + "px";

                        let width = moveState.originalRight - moveState.left;
                        control.style.width = width + 'px';
                        moveState.width = width;
                    }
                    else {
                        moveState.marginLeft = e.pageX - moveState.pageX + parseFloat(model["style-marginLeft"] ?? 0);

                        if (!moveState.originalRight)
                            moveState.originalRight = moveState.marginLeft + rect.width;

                        // if(moveState.originalRight - moveState.marginLeft < 0){
                        //     moveState.marginLeft = moveState.originalRight;
                        // }

                        control.style.marginLeft = moveState.marginLeft + "px";
                        // if(control.style.width != ""){
                        //     let width = moveState.originalRight - moveState.marginLeft;
                        //     control.style.width = width  + 'px';
                        //     moveState.width = width;
                        // }
                    }
                }

                options.me.updateBarPosition();
            }
        }
    }

    var onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        options.me.props.onEdit(options.props.model);
        options.me.setState({ selected: true })
    };

    var { selected, hovered, dragging, dragOverTop, dragOverBottom } = state;
    const makeKey = key => options.props.model.key + "_" + key;

    const stylePinned = zIndex => model.pinned ? {zIndex} : {};    

    let baseClassName = "formbuilder-toolbar-point";
    if (!model.pinned) baseClassName += " formbuilder-zone";

    const point = (key, ref) =>  (!dragging && 
        <div key={makeKey(key)} ref={ref} onMouseDown={e => startResize(e, key)}
             style={{...getDisplayStyle(selected), ...stylePinned(11)}}
             className={`formbuilder-item-toolbar-container point-${key}`}>
            <div className={baseClassName + ` formbuilder-toolbar-point-${key}`}/>
        </div>
    );

    const onKeyDown = (e) => {        
        e.preventDefault();
        if (e.key === "Delete" || e.key === "Backspace") {
            options.me.onRemoveControl(model.key);
        }
    }

    const dragProps = {
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseLeave,
        onMouseDown: onMouseDown,
        draggable: !model.pinned,
        onDragStart: onDragStart,
        onDragEnd: onDragEnd,
        onDragEnter: dragging ? undefined : onDragEnter,
        onDragLeave: dragging ? undefined : onDragLeave,
        onDragOver: dragging ? undefined : onDragOver,
        onDrop: dragging ? undefined : onDrop
    }

    const { resizing } = me.props.parent.state;    
    const { thisResizing } = me.state;

    return <DropzoneContext.Consumer>

        {({ isBuilder }) => {
            const visible = isBuilder && selected;
            const bar = (
                    <div key={makeKey("controlbar")} ref={options.me.barRef} style={{...getDisplayStyle(visible), ...stylePinned(12)}}
                        className={'formbuilder-item-toolbar-container bar'}
                        {...dragProps}>
                        <div className={"formbuilder-item-toolbar-header"}>
                            <div className="formbuilder-item-toolbar-header-buttons" >
                                <div className="formbuilder-item-toolbar-header-title"
                                    title={options.props.text}
                                >
                                    {options.props.model["key"]}
                                </div>
                                <Icon onClick={onPinned} icon='thumb-tack' style={{ color: model.pinned ? '#1262e2' : 'initial' }} />
                                <Icon onClick={options.me.props.onCopy.bind(options.props.parent, options.props.model)} icon='copy' />
                                <Icon onClick={options.me.props.onDelete.bind(options.props.parent, options.props.model)} icon='trash-o' />
                            </div>
                        </div>
                    </div>
            );

            const resize = (   
                <div key={makeKey("resize")} ref={options.me.resizeRef} onMouseDown={(e) => { startResize(e) }}
                style={{...getDisplayStyle(visible), ...stylePinned(11)}} className="formbuilder-item-toolbar-container resize">
                    <div className="dot" />
                </div>
            );

            const selectionClassName = baseClassName 
                + " formbuilder-item-toolbar-container selection"
                + (dragging ? "" : ((selected ? " selected" : "") + (hovered ? " hovered" : "")) ) 

            const selection = (
                <div key={makeKey("selection")} ref={options.me.selectionRef}
                    style={{...stylePinned(10)}}  tabIndex="0"
                    className={selectionClassName}
                    onClick={onClick}
                    onKeyDown ={onKeyDown }
                    {...dragProps}
                    elementafter={dragOverTop ? model.key : undefined}
                    elementbefore={dragOverBottom ? model.key : undefined}
                    elementtoinsert={options.props.elementtoinsert}
                    placeholderkey={options.props.placeholderKey}
                />
            );

            const dragOverTopEl = (
                <div  key={makeKey("drag-over-top")}
                      className={("drag-over-animation top" + (dragOverTop ? " active" : ""))}
                      onDragOver={dragging ? undefined : _=> me.setState({dragOverTop: true, dragOverBottom: false})} />
            )
            
            const dragOverBottomEl = (
                <div key={makeKey("drag-over-bottom")}
                     className={("drag-over-animation bottom" + (dragOverBottom ? " active" : ""))}
                     onDragOver={dragging ? undefined : _=> me.setState({dragOverBottom: true, dragOverTop: false})} />
            );

            return [ 
                (!resizing || thisResizing) && selection,
                dragOverTopEl,
                React.cloneElement(options.props.control, { ref: options.me.controlRef }),
                point("top", options.me.pointTopRef),
                point("bottom", options.me.pointBottomRef),
                point("left", options.me.pointLeftRef),
                point("right", options.me.pointRightRef),
                bar,
                !dragging && resize, 
                dragOverBottomEl               
            ];
        }}
    </DropzoneContext.Consumer>
}
);
