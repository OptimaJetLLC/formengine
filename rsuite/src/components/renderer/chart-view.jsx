// import React from 'react';
// import { isDefined, register } from 'optimajet-builder-shared';

// register('chart-view', options => {
//     const style = options.props.style;
//     let width = isDefined(options.props.width) ? options.props.width : '400px';
//     if (isDefined(style.width)) {
//         width = style.width;
//     }
//     let height = isDefined(options.props.height) ? options.props.height : '300px';
//     if (isDefined(style.height)) {
//         height = style.height;
//     }

//     if ((options.state.width !== width || options.state.height !== height) && isDefined(options.state.chart)) {
//         options.state.chart.destroy();
//         options.state.chart = undefined;
//     }

//     options.state.width = width;
//     options.state.height = height;

//     let className = 'field';
//     if (isDefined(options.props.className)) {
//         className += ' ' + options.props.className;
//     }

//     return <div className={className} style={style}>
//         <canvas id={options.divId} width={width} height={height}></canvas>
//     </div>;
// });
