import React, { Component } from 'react';
import { Input, InputGroup } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';
import SearchIcon from '@rsuite/icons/Search';
import { Translation } from 'react-i18next';

interface SearchFormProps {
    handleChange: (value: string) => void;
    style?: Object
}

interface SearchFormState {
    value: string;
}

export default class SearchForm extends Component<SearchFormProps, SearchFormState> {

    constructor(props: SearchFormProps) {
        super(props);
        this.state = {value: ''};
    }

    handleChange(value: string | any): void {
        const newValue = value.toLowerCase();
        this.setState({value: newValue});
        if (this.props.handleChange) {
            this.props.handleChange(newValue);
        }
    };

    reset() {
        this.handleChange('');
    }

    render() {
        const Icon = this.state.value.length ? CloseIcon : SearchIcon;
        return (<InputGroup inside size="xs" style={this.props.style}>
            <Translation>
                {
                    t => <Input
                        onChange={this.handleChange.bind(this)}
                        placeholder={t('searchForm.search')}
                        value={this.state.value}
                        size="xs"
                    />
                }
            </Translation>
            <InputGroup.Addon style={{cursor: 'pointer'}} onClick={this.handleChange.bind(this, '')}>
                <Icon/>
            </InputGroup.Addon>
        </InputGroup>)
    }
}
