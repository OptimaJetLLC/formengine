import { Component } from 'react';
import { isDefined } from '../helpers';
import { draw } from '../component-render-registry';

const isEqual = require('react-fast-compare');

export default class ChartView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.redrawChart();
    }

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    componentDidUpdate() {
        this.redrawChart();
    }

    componentWillUnmount() {
        if (isDefined(this.state.chart)) {
            this.state.chart.destroy();
        }
    }

    redrawChart() {
        return draw('chart-view-redraw-chart', {
            chartData: this.getChartData(),
            divId: this.getDivId(),
            props: this.props,
            state: this.state,
        });
    }

    getDivId() {
        return 'formbuilder-chart-' + this.props.name;
    }

    getChartData() {
        let data = [];
        try {
            data = typeof (this.props.value) == 'string' ?
                JSON.parse(this.props.value) :
                this.props.value;
        }
        catch (e) {
            console.log('Can\'t parse to JSON', this.props.value, this);
        }

        if (this.props.datasetCustom) {
            let me = this;

            let labels = [];
            if (isDefined(me.props.dataLabels)) {
                labels = me.props.dataLabels.split(',');
            }

            return {
                labels,
                datasets: [
                    {
                        label: me.props.datasetLabel,
                        steppedLine: me.props.datasetSteppedLine,
                        borderColor: me.props.datasetBorderColor,
                        backgroundColor: me.props.datasetBackgroundColor,
                        fill: me.props.datasetFill,
                        borderWidth: me.props.datasetBorderWidth,
                        data: data
                    }
                ]
            };
        }

        return this.copyObj(data);
    }

    copyObj(obj) {
        if (null == obj || 'object' != typeof obj) {
            return obj;
        }
        let copy = obj.constructor();

        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = this.copyObj(obj[attr]);
            }
        }
        return copy;
    }

    render() {

        // else if (control === ChartView) {
        //     props.chartType = model.chartType;
        //     props.responsive = model.responsive;
        //     props.legendPosition = model.legendPosition;
        //     props.title = model.title;
        //     props.titleSize = model.titleSize;
        //     props.datasetCustom = model.datasetCustom;
        //     props.dataLabels = model.dataLabels;
        //     props.datasetLabel = model.datasetLabel;
        //     props.datasetSteppedLine = model.datasetSteppedLine;
        //     props.datasetBorderColor = model.datasetBorderColor;
        //     props.datasetFill = model.datasetFill;
        //     props.datasetBorderWidth = model.datasetBorderWidth;
        //     props.datasetBackgroundColor = model.datasetBackgroundColor;
    
        //     if (buildermode) {
        //         if (props.datasetCustom) {
        //             props.value = [1, 2, 3, 4, 3, 2, 1];
        //         }
        //         else {
    
        //             let testData = props.chartType !== 'scatter' ?
        //                 [6, 23, 15, 3] :
        //                 [
        //                     { x: 6, y: -12 },
        //                     { x: 11, y: 1 },
        //                     { x: 24, y: 5 },
        //                     { x: 40, y: 32 }
        //                 ];
    
        //             props.value = {
        //                 labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        //                 datasets: [
        //                     {
        //                         data: testData
        //                     }
        //                 ]
        //             };
        //         }
        //     }
        //     else {
        //         if (data !== undefined) {
        //             props.value = data[props.key];
        //         }
        //     }
    
        //     res = (<ChartView {...props} />);


        return draw('chart-view', {
            divId: this.getDivId(),
            props: this.props,
            state: this.state,
            model
        });
    }

}
