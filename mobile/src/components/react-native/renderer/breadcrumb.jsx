import React, { Component } from 'react';
import { register } from 'optimajet-builder-shared';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import builderStyles from '../../../builder-styles';

class BreadcrumbDivider extends Component {

    render() {
        const style = { paddingHorizontal: 4 };
        if (this.props.icon) {
            return (<Icon {...this.props} name={this.props.icon} type='font-awesome'
                          containerStyle={[this.props.style, style]}
                          {...builderStyles.collectionEditor.iconProps}/>);
        }
        return (<Text {...this.props} style={[this.props.style, style]}>/</Text>);
    }

}

class BreadcrumbSection extends Component {

    render() {
        const style = this.props.active === true ? { fontWeight: '600', color: '#1e70bf' } : { color: '#1e70bf' };
        return (<TouchableOpacity onPress={(e) => this.props.onClick(e)}>
            <Text {...this.props} style={[this.props.style, style]}/>
        </TouchableOpacity>);
    }

}

register('breadcrumb', options => {
    let items = [];
    for (let i = 0; i < options.children.length; i++) {
        const child = options.children[i];
        if (child.isDivider) {
            items.push(<BreadcrumbDivider {...child.dividerProps} />);
        }
        else {
            items.push(<BreadcrumbSection{...child.childProps}>{child.text}</BreadcrumbSection>)
        }
    }

    // todo style
    const style = { flexDirection: 'row', alignItems: 'center' };
    return (<View {...options.propsControl} style={[options.propsControl.style, style]}>
        {items}
    </View>);
});
