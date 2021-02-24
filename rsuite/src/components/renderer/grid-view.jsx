import React from 'react';
//import ReactDataGrid from 'react-data-grid';
import { isNotEmptyString, isUndefined, register } from 'optimajet-builder-shared';

register('grid-view', options => {
    return <div></div>;
    // let className = options.props.className;
    // let style = { ...options.props.style };
    // let gridProps = options.gridProps;
    // gridProps.columns = options.gridColumns;
    // gridProps.rowKey = options.props.rowKey;

    // if (isNotEmptyString(options.props.rowHeight)) {
    //     gridProps.rowHeight = Number(options.props.rowHeight);
    // }

    // if (options.props.headerRowHeight)
    //     gridProps.headerRowHeight = options.props.headerRowHeight;


    // if (options.props.autoHeight) {
    //     style.minHeight = options.props.minHeight;
    //     if (isNotEmptyString(options.props.offSet)) {
    //         style.height = 'calc(100vh - ' + options.props.offSet + ')';
    //     }
    //     else {
    //         style.height = '100vh';
    //     }

    //     className = (isUndefined(className) ? '' : (className + ' ')) + 'dwkit-gridview-autoHeight';
    // }
    // else {
    //     if (isNotEmptyString(options.props.minHeight)) {
    //         gridProps.minHeight = options.props.minHeight;
    //     }
    // }

    // if (options.props.multiselect) {
    //     gridProps.rowSelection = {
    //         onRowsSelected: options.onRowsSelected,
    //         onRowsDeselected: options.onRowsDeselected,
    //         selectBy: options.selectBy,
    //     };
    // }

    // return (<div key={options.props.name} name={options.props.name} className={className} style={style}>
    //     <ReactDataGrid key="grid"
    //                    {...gridProps}
    //                    rowsCount={options.state.rowsCount}
    //                    rowGetter={options.gridRowGetter}
    //                    onRowClick={options.gridOnRowClick}
    //                    onGridSort={options.handleGridSort}/>
    // </div>);
});
