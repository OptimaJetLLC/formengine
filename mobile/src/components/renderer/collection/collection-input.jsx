import React, { Component } from 'react';
import { register } from 'optimajet-builder-shared';
import { Input } from '@ui-kitten/components';
import { FormWidthContext } from '../form-width-context';
import { FormSizeContext } from '../form-size-context';
import builderStyles from '../../../builder-styles';
import DWKitDropdown from '../../edit-control/dwkit/dwkit-dropdown.jsx';

class CompletableInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hideResults: true,
        };
    }

    render() {
        // todo style
        const query = this.props.data;
        const data = this.props.dataList;
        return (<DWKitDropdown options={data} value={query} hideResults={this.state.hideResults}
                              onFocus={() => this.setState({ hideResults: false })}
                              onBlur={() => this.setState({ hideResults: true })}
                              search={true}
                              onValueChange={this.props.onChangeText}
                              onSelect={index => {
                                  this.props.onItemPress(data[index])
                                  }}/>);
    }

}

register('collection-input', options => {

    function onChangeText(text) {
        options.me.handleChange(null, { name: options.props.inputProps.name, value: text });
    }

    function drawContainer(formWidthStyle, formSize) {
        // todo implement formSizeStyle use context api
        // todo fit dropzone and control bar
        const inputProps = {
            ...options.props.inputProps,
            style: builderStyles.collectionEditor.input,
        }
        if (Array.isArray(inputProps.dataList)) {
            return (<CompletableInput data={inputProps.value} dataList={inputProps.dataList}
                                      onChangeText={onChangeText} onItemPress={onChangeText}/>);
        }
        return (<Input {...inputProps} onChangeText={onChangeText}/>);
    }

    return (<FormWidthContext.Consumer>
        {({ formWidthStyle }) => (
            <FormSizeContext.Consumer>
                {({ formSize }) => drawContainer(formWidthStyle, formSize)}
            </FormSizeContext.Consumer>
        )}
    </FormWidthContext.Consumer>);
});
