import React from 'react';
import { Search } from 'semantic-ui-react';
import { register } from 'optimajet-builder-shared';

register('search', options => {
    return (<Search
        {...options.controlProps}
        fluid={true}
        loading={options.state.isLoading}
        onResultSelect={options.handleResultSelect}
        onSearchChange={options.handleSearchChange}
        results={options.state.results}
        value={options.state.value}
    />);
});
