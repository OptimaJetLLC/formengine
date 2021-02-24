import React from 'react';
import { View } from 'react-native';
import builderStyles from '../../../builder-styles'

function Row ({children, style, notStretchItems}) {
    return <View style={[{flexDirection: 'row'}, style]}>
        {
            children.map((child, index) => child ? React.cloneElement(child, {
                style: [
                    (index < children.length - 1) && builderStyles.layout.elementInRow,
                    {flexGrow: notStretchItems ? 0 : 1},
                    child.props.style
                ]
            }) : null)
        }    
    </View>;    
};

function Column ({children, style, notStretchItems}) {
    return <View style={[{flexDirection: 'column'}, style]}>
        {
            children.map((child, index) => child ? React.cloneElement(child, {
                style: [
                    (index < children.length - 1) && builderStyles.layout.elementInColumn,
                    {flexGrow: notStretchItems ? 0 : 1},
                    child.props.style
                ]
            }) : null)
        }    
    </View>;    
};

export {Row, Column};
