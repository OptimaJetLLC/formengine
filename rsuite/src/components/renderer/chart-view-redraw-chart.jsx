// import { isDefined, isNotEmptyString, isUndefined, register } from 'optimajet-builder-shared';

// register('chart-view-redraw-chart', options => {
//     if (isDefined(options.state.chart)) {
//         options.state.chart.destroy();
//         options.state.chart = undefined;
//     }

//     if (isUndefined(options.state.chart)) {
//         const ctx = document.getElementById(options.divId).getContext('2d');
//         const data = options.chartData;
//         let yAxes = undefined;
//         if (isDefined(data) && Array.isArray(data.datasets)) {
//             let axis = [];
//             data.datasets.forEach(e => {
//                 if (isDefined(e.yAxisID) && e.yAxisID != null) {
//                     if (!axis.includes(e.yAxisID)) {
//                         axis.push(e.yAxisID);
//                     }
//                 }
//             });

//             if (axis.length > 0) {
//                 yAxes = [];
//                 for (let i = 0; i < axis.length; i++) {
//                     if (!i) {
//                         yAxes.push({ type: 'linear', display: true, position: 'left', id: axis[i] });
//                     }
//                     else {
//                         yAxes.push({
//                             type: 'linear', display: true, position: 'right', id: axis[i], gridLines: {
//                                 drawOnChartArea: false
//                             }
//                         });
//                     }
//                 }
//             }
//         }

//         let config = {
//             type: options.props.chartType,
//             data,
//             options: {
//                 responsive: Boolean(options.props.responsive),
//                 legend: {
//                     position: options.props.legendPosition,
//                 },
//                 title: {
//                     fontSize: (isUndefined(options.props.titleSize) ? 14 : options.props.titleSize),
//                     display: isNotEmptyString(options.props.title),
//                     text: options.props.title
//                 }
//             }
//         };

//         if (isDefined(yAxes)) {
//             config.options.scales = { yAxes: yAxes };
//         }

//         options.state.chart = new Chart(ctx, config);
//     }
//     else {
//         options.state.chart.update();
//     }
// });
