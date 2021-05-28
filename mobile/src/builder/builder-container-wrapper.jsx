import React from 'react';
import { DropzoneContext } from 'optimajet-builder-shared';
import { View } from 'react-native';
import builderStyles from '../builder-styles';

export default function BuilderContainerWrapper({children}) {
    return (
        <DropzoneContext.Consumer>
            {({ isBuilder }) => {
                return (isBuilder 
                    ? <View style={isBuilder ? builderStyles.itemContainer : {}}>
                            {children}
                      </View>
                    : children
                );                    
            }}
        </DropzoneContext.Consumer>);
}