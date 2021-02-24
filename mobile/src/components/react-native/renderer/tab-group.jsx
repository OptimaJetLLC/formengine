import React, { Component } from 'react';
import { register } from 'optimajet-builder-shared';
import { View } from 'react-native';
import { Tab, TabBar, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import BuilderContainerWrapper from '../../../builder/react-native/builder-container-wrapper.jsx'

class NativeTabGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: props.activeitem || 0,
        };
    }

    onTabChange(index) {
        this.setState({
            selectedIndex: index,
        })
        this.props.onTabChange(null, { activeIndex: index });
    }

    render() {
        const Bar = this.props.model.position === 'top' ? TabBar : BottomNavigation;
        const BarItem = this.props.model.position === 'top' ? Tab : BottomNavigationTab;

        const barElement = <Bar
            selectedIndex={this.state.selectedIndex}
            onSelect={this.onTabChange.bind(this)}>
                {this.props.panes.map(item => <BarItem title={item.menuItem}/>)}
            </Bar>;
        const activePane = this.props.panes[this.state.selectedIndex].pane;
        const panes = <View key={activePane.key}>
                        {activePane.content}
                    </View>;

        return <BuilderContainerWrapper>
            <View style={this.props.style}>
                {
                    (this.props.model.position === 'top')
                        ? [barElement, panes]
                        : [panes, barElement]
                }                    
            </View>
        </BuilderContainerWrapper>;
    }

}

register('tab-group', options => {
    return <NativeTabGroup {...options.props} panes={options.panes} onTabChange={options.onTabChange}/>
});
