import React from 'react';
import { Text, Tooltip } from '@ui-kitten/components';
import { View, TouchableWithoutFeedback } from 'react-native';
import { register } from 'optimajet-builder-shared';
import builderStyles from '../../builder-styles';

const TooltipWithState = (props) => {
    const trigger = props.options.trigger;
    const [visible, setVisible] = React.useState(false);

    const elementWithNewHandler = () => React.cloneElement(trigger, {
        onClick: () => setVisible(true)
    });

    const touchableWrapped = () =>
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>{
            trigger
        }</TouchableWithoutFeedback>;

    return  <Tooltip {...props} onBackdropPress={() => setVisible(false)}
                    visible={visible}
                    anchor={trigger.props['data-buildertype'] === 'button'
                        ? elementWithNewHandler
                        : touchableWrapped
                    }
            />;
}

register('popup', options => {
    return <TooltipWithState
        options={options}
        style={builderStyles.controls.tooltip.container}
        placement={options.popupPosition}
        children={<View>
            <Text category='s1' status='control' style={builderStyles.controls.tooltip.title}>{options.header}</Text>
            <Text status='control'>{options.content}</Text>
        </View>}/>
});
