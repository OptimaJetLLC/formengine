import React from 'react';
//import RGL, { WidthProvider } from 'react-grid-layout';
import { isDefined, isNotEmptyString, register } from 'optimajet-builder-shared';

//const ReactGridLayout = WidthProvider(RGL);

register('grid-layout', options => {
    return <div></div>;
    // function renderPanel(pane) {
    //     let element = undefined;
    //     if (isDefined(options.props.placeholders) &&
    //         Array.isArray(options.props.placeholders[pane.psid]) &&
    //         options.props.placeholders[pane.psid].length > 0) {
    //         let model = options.props.placeholders[pane.psid];
    //         if (model) {
    //             element = options.props.createControls(options.me, {
    //                 model: model,
    //                 parentPlaceholder: pane.psid,
    //                 buildermode: options.props.buildermode,
    //                 data: options.props.data,
    //                 errors: options.props.errors,
    //                 parentItem: options.props.model,
    //                 children: options.props.children,
    //                 handleEvent: options.props.handleEvent,
    //                 getFormFunc: options.props.getFormFunc,
    //                 getAdditionalDataForControl: options.props.getAdditionalDataForControl,
    //                 readOnlyControls: options.props.readOnlyControls,
    //                 readOnly: options.props.readOnly,
    //                 disableRefs: options.props.disableRefs,
    //                 uploadUrl: options.props.uploadUrl,
    //                 downloadUrl: options.props.downloadUrl,
    //                 extendedData: options.props.extendedData,
    //                 controlsToReplace: options.props.controlsToReplace,
    //                 needCheckReplace: options.props.needCheckReplace,
    //                 eventOnEdit: options.props.eventOnEdit,
    //                 eventOnDelete: options.props.eventOnDelete,
    //                 eventOnCopy: options.props.eventOnCopy,
    //                 adaptiveViewType: options.props.adaptiveViewType
    //             });

    //             let dzkey = pane.psid;

    //             if (options.props.buildermode && options.props.createBuilderDropzone) {
    //                 if (element.length > 0 && model.length > 0) {
    //                     element.unshift(options.props.createBuilderDropzone(
    //                         dzkey + 'layout_dropzone_header',
    //                         options.props.name,
    //                         undefined,
    //                         pane.title,
    //                         pane.psid
    //                     ));
    //                 }
    //                 element.push(options.props.createBuilderDropzone(
    //                     dzkey + 'layout_dropzone_footer',
    //                     options.props.name,
    //                     model[model.length - 1].key,
    //                     pane.title,
    //                     pane.psid
    //                 ));
    //             }
    //         }
    //     }
    //     else if (options.props.buildermode && options.props.createBuilderDropzone) {
    //         element = options.props.createBuilderDropzone(
    //             'layout_dropzone_footer',
    //             options.props.name,
    //             undefined,
    //             pane.title,
    //             pane.psid
    //         );
    //     }

    //     const layout = {
    //         x: isDefined(pane.x) ? pane.x : 0,
    //         y: isDefined(pane.y) ? pane.y : 0,
    //         w: isDefined(pane.w) ? pane.w : 4,
    //         h: isDefined(pane.h) ? pane.h : 4,
    //         i: pane.psid
    //     };

    //     return <div key={pane.psid} className={pane.cssclass} data-grid={layout}>
    //         {pane.title && <div className="react-grid-item-title">{pane.title}</div>}
    //         {element}</div>;
    // }

    // function getPanes(panes) {
    //     const me = options.me;
    //     let res = [];

    //     let userLayout = undefined;
    //     if (!options.props.buildermode) {
    //         try {
    //             userLayout = JSON.parse(options.getCookie(window.location.pathname + '_' + options.props.name));
    //         }
    //         catch (e) {
    //         }
    //     }

    //     if (Array.isArray(panes)) {
    //         for (let i = 0; i < panes.length; i++) {
    //             const pane = panes[i];

    //             if (pane.visibleCondition !== undefined && pane.visibleCondition !== null && pane.visibleCondition !== '') {
    //                 let args = '';
    //                 let body = 'return ' + pane.visibleCondition;
    //                 try {
    //                     if (!new Function(args, body)()) {
    //                         continue;
    //                     }
    //                 }
    //                 catch (e) {
    //                 }
    //             }

    //             let isFind = false;
    //             if (isDefined(userLayout)) {
    //                 userLayout.forEach(function (l) {
    //                     if (l.i == pane.psid) {
    //                         isFind = true;

    //                         let userPane = { ...pane };
    //                         if (me.props.draggable) {
    //                             userPane.x = l.x;
    //                             userPane.y = l.y;
    //                         }

    //                         if (me.props.resizable) {
    //                             userPane.w = l.w;
    //                             userPane.h = l.h;
    //                         }

    //                         res.push(me.renderPanel(userPane));
    //                     }
    //                 });
    //             }

    //             if (!isFind) {
    //                 res.push(renderPanel(pane));
    //             }
    //         }
    //     }

    //     return res;
    // }

    // const panes = getPanes(options.props['data-panes']);

    // let layoutprops = {
    //     isDraggable: true,
    //     isResizable: true,
    //     cols: isNotEmptyString(options.props.cols) ? options.props.cols : 12,
    //     rowHeight: 30,
    //     containerPadding: [0, 0],
    //     draggableCancel: 'input,textarea'
    // };

    // if (!options.props.buildermode) {
    //     layoutprops.isDraggable = options.props.draggable;
    //     layoutprops.isResizable = options.props.resizable;
    // }

    // let className = options.props.className;
    // if (options.props.scroll) {
    //     className = 'react-grid-scroll'
    // }

    // return (<div className={className} style={options.props.style}><ReactGridLayout
    //     onLayoutChange={options.onLayoutChange} {...layoutprops}>{panes}</ReactGridLayout></div>);
});
