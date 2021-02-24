import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

const tableStyles = StyleSheet.create({
    tr: {
        flexDirection: 'row',
        alignContent: 'stretch',
        flexGrow: 1,
    },
    td: {
        flexDirection: 'row',
        flexGrow: 1,
    },
    tHeader: {
        flexDirection: 'row',
        alignContent: 'stretch',
        flexGrow: 1,
    },
    tBody: {
        maxWidth: '100%',
    },
    table: {
        alignContent: 'stretch',
    }
});

export const ColumnContext = React.createContext({
    style: {},
});

class Tr extends Component {

    render() {
        const width = (100 / this.props.children.length) + '%';
        const columnStyle = {
            style: StyleSheet.compose({
                maxWidth: width,
            }, this.props.style),
        };
        return (<ColumnContext.Provider value={columnStyle}>
            <View {...this.props} style={tableStyles.tr}/>
        </ColumnContext.Provider>);
    }

}

class Td extends Component {

    render() {
        // todo fit all td in row
        return (<ColumnContext.Consumer>
            {({ style }) => (
                (<View {...this.props} style={StyleSheet.compose([ tableStyles.td, style], this.props.style)}/>)
            )}
        </ColumnContext.Consumer>);
    }

}

class TBody extends Component {

    render() {
        return (<View {...this.props} style={tableStyles.tbody}/>);
    }

}

class THeader extends Component {

    render() {
        return (<View {...this.props} style={tableStyles.tHeader}/>);
    }

}

export default class Table extends Component {

    static Tr = Tr;
    static Td = Td;
    static THeader = THeader;
    static TBody = TBody;

    render() {
        return (<View {...this.props} style={tableStyles.table}/>);
    }

}
