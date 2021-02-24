import React from 'react';
import { Form } from 'semantic-ui-react';
import BaseEditControl from './base-edit-control';
import { isUndefined } from 'optimajet-builder-shared';

export default class ChartEditControl extends BaseEditControl {

    getGeneralDescription() {
        const data = this.props.data;
        const handleChange = this.props.parent.handleChange.bind(this.props.parent);

        const legendPositionOptions = [
            { value: '', text: this.getLocalValue('legendpositiondefaultfield', 'Default', 'chartform') },
            { value: 'top', text: this.getLocalValue('legendpositiontopfield', 'Top', 'chartform') },
            { value: 'left', text: this.getLocalValue('legendpositionleftfield', 'Left', 'chartform') },
            { value: 'bottom', text: this.getLocalValue('legendpositionbottomfield', 'Bottom', 'chartform') },
            { value: 'right', text: this.getLocalValue('legendpositionrightfield', 'Right', 'chartform') }
        ];

        const disableCustom = data.datasetCustom === '' || isUndefined(data.datasetCustom);
        return (<Form>
            <Form.Group widths="equal">
                <div className="field">
                    <Form.Input name="key" label={this.getLocalValue('namefield', 'Name', 'chartform')} value={data.key}
                                onChange={handleChange}/>
                    <Form.Input name="title" label={this.getLocalValue('titlefield', 'Title', 'chartform')}
                                value={data.title} onChange={handleChange}/>
                    <Form.Input name="titleSize" label={this.getLocalValue('titlesizefield', 'Title size', 'chartform')}
                                value={data.titleSize} onChange={handleChange}/>
                    <Form.Dropdown name="legendPosition" selection fluid
                                   label={this.getLocalValue('legendpositionfield', 'Legend position', 'chartform')}
                                   placeholder={legendPositionOptions[0].text} options={legendPositionOptions}
                                   value={data.legendPosition} onChange={handleChange}/>
                </div>
                <div className="field">
                    <Form.Checkbox name="responsive"
                                   label={this.getLocalValue('responsivefield', 'Responsive', 'chartform')}
                                   checked={data.responsive} onChange={handleChange}/>
                    <Form.Checkbox name="datasetCustom"
                                   label={this.getLocalValue('datasetcustomfield', 'Dataset custom', 'chartform')}
                                   checked={data.datasetCustom} onChange={handleChange}/>
                    <Form.Input name="dataLabels" style={{ paddingTop: '5px' }} disabled={disableCustom}
                                placeholder={this.getLocalValue('datalabelsplaceholder', 'Q1, Q2, Q3, Q4', 'chartform')}
                                label={this.getLocalValue('datalabelsfield', 'Data labels', 'chartform')}
                                value={data.dataLabels} onChange={handleChange}
                    />
                    <Form.Input name="datasetLabel" disabled={disableCustom}
                                label={this.getLocalValue('datasetlabelfield', 'Dataset Label', 'chartform')}
                                value={data.datasetLabel} onChange={handleChange}/>
                    <Form.Input name="datasetBackgroundColor" disabled={disableCustom} label={this.getLocalValue(
                        'datasetbackgroundcolorfield',
                        'Dataset BackgroundColor',
                        'chartform'
                    )} value={data.datasetBackgroundColor} onChange={handleChange}/>
                </div>
            </Form.Group>
        </Form>);
    }
}
