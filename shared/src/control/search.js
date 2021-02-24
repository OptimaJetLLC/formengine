import { Component } from 'react'
import { isDefined, isUndefined } from '../helpers';
import { draw } from '../component-render-registry';
import fetch from 'isomorphic-fetch'

export default class SearchControl extends Component {
    constructor(props) {
        super(props);

        this.state = { value: '' };
    }

    render() {
        // else if (control === SearchControl) {
        //     props.url = model.url;
        //     props.category = model.category;
        //     props.handleEvent = handleEvent;
        //     res = (<SearchControl {...props} />);
        //     }

        let controlProps = {};
        for (let p in this.props) {
            if (p === 'value' ||
                p === 'handleEvent') {
                continue;
            }
            controlProps[p] = this.props[p];
        }

        return draw('search', {
            controlProps: controlProps,
            handleResultSelect: this.handleResultSelect.bind(this),
            handleSearchChange: this.handleSearchChange.bind(this),
            state: this.state,
        });
    }

    resetSearch() {
        this.setState({ isLoading: false, results: [] });
    }

    handleResultSelect(e, { result }) {
        if (isDefined(this.props.handleEvent)) {
            this.props.handleEvent({
                key: this.props.name,
                propertyName: this.props.propertyName,
                eventName: 'onSelect',
                parameters: result
            });
        }
    }

    handleSearchChange(e, { value }) {
        const me = this;
        me.setState({ isLoading: true, value });

        setTimeout(function () {
            if (me.state.value === null || me.state.value === undefined || me.state.value.length < 2) {
                return me.resetSearch();
            }
            me.search(me.state.value);
        }, 200);
    }

    search(searchStr) {
        let me = this;
        let url = this.props.url;
        url += this.props.url.includes('?') ? '&' : '?';
        url += 'term=' + searchStr;
        fetch(url, {
            credentials: 'same-origin'
        }).then(function (response) {
            return response.json();
        }).then(function (results) {
            me.setState({
                isLoading: false,
                results: results
            });
        }).catch(function (error) {
            if (isUndefined(console)) {
                alert(error);
            }
            else {
                console.error(error);
            }
        });
    }
}
