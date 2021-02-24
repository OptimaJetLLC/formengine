import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import builderStyles from '../../builder-styles';
import { register } from 'optimajet-builder-shared';

register('card', options => {

    const styles = StyleSheet.create({
        topContainer: {         
          margin: 10
        },
        card: {
        },
        footerContainer: {
            margin: 10
        }
      });

    const controlProps = {
        style: [builderStyles.baseMargin, styles.card]
    };

    const Header = () =>  <View style={styles.topContainer}>
        <Text category='h6'>{options.props.header}</Text>
        <Text category='s1'>{options.props.subheader}</Text>
    </View>;
    
    let footer = options.me.renderPanel("extra");

    const Footer = () =>
        <View style={styles.footerContainer}>
          {footer}
        </View>;

    return <Card {...controlProps} header={Header} footer={Footer}>
        {options.me.renderPanel("description")}
    </Card>
});
