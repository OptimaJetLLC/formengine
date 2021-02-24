import React from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    SectionList,
    StatusBar,
    Switch,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    VirtualizedList
} from 'react-native';

import {
    AnyType,
    ArrayType,
    BoolType,
    ColorType,
    ComponentType,
    FunctionType,
    NumberType,
    ObjectType,
    PType,
    PTypeBuilder,
    StringType,
    StyleType
} from './control-property-types';
import { isDefined } from 'optimajet-builder-shared';

function getPropertyDefaultLabel(name) {
    const split = name.split('');
    let result = '';
    for (let letter of split) {
        if (letter.toUpperCase() === letter) {
            result += ' ';
        }
        result += letter;
    }
    result = result.charAt(0).toUpperCase() + result.substr(1);
    return result;
}

function optionalProperty(name, type) {
    if (type === null || !(type instanceof PType)) {
        throw new Error('name ' + name + ' ' + type);
    }
    return { name: name, type: type, defaultLabel: getPropertyDefaultLabel(name) };
}

function defaultProperty(name, type, defaultValue) {
    if (type === null || !(type instanceof PType)) {
        throw new Error('name ' + name + ' ' + type);
    }
    return { name: name, type: type, defaultValue: defaultValue, defaultLabel: getPropertyDefaultLabel(name) };
}

const rnView = {
    renderer: View,
    propertyTypes: [
        optionalProperty('onStartShouldSetResponder', FunctionType),
        optionalProperty('accessible', BoolType),
        optionalProperty('accessibilityLabel', StringType),
        optionalProperty('accessibilityHint', StringType),
        // todo enum
        optionalProperty('accessibilityRole', StringType),
        // todo Object
        optionalProperty('accessibilityState', ObjectType),
        // todo Object
        optionalProperty('accessibilityValue', ObjectType),
        optionalProperty('accessibilityActions', ArrayType),
        optionalProperty('onAccessibilityAction', FunctionType),
        optionalProperty('onAccessibilityTap', FunctionType),
        optionalProperty('onMagicTap', FunctionType),
        optionalProperty('onAccessibilityEscape', FunctionType),
        optionalProperty('accessibilityViewIsModal', BoolType),
        optionalProperty('accessibilityElementsHidden', BoolType),
        optionalProperty('accessibilityIgnoresInvertColors', BoolType),
        // todo enum
        optionalProperty('accessibilityLiveRegion', StringType),
        // todo enum
        optionalProperty('importantForAccessibility', StringType),
        // todo object
        optionalProperty('hitSlop', ObjectType),
        optionalProperty('nativeID', StringType),
        optionalProperty('onLayout', FunctionType),
        optionalProperty('onMoveShouldSetResponder', FunctionType),
        optionalProperty('onMoveShouldSetResponderCapture', FunctionType),
        optionalProperty('onResponderGrant', FunctionType),
        optionalProperty('onResponderMove', FunctionType),
        optionalProperty('onResponderReject', FunctionType),
        optionalProperty('onResponderRelease', FunctionType),
        optionalProperty('onResponderTerminate', FunctionType),
        optionalProperty('onResponderTerminationRequest', FunctionType),
        optionalProperty('onStartShouldSetResponderCapture', FunctionType),
        // todo enum
        optionalProperty('pointerEvents', StringType),
        optionalProperty('removeClippedSubviews', BoolType),
        // todo view styles
        optionalProperty('style', StyleType),
        optionalProperty('testID', StringType),
        optionalProperty('collapsable', BoolType),
        optionalProperty('needsOffscreenAlphaCompositing', BoolType),
        optionalProperty('renderToHardwareTextureAndroid', BoolType),
        optionalProperty('shouldRasterizeIOS', BoolType),
        optionalProperty('nextFocusDown', NumberType),
        optionalProperty('nextFocusForward', NumberType),
        optionalProperty('nextFocusLeft', NumberType),
        optionalProperty('nextFocusRight', NumberType),
        optionalProperty('nextFocusUp', NumberType),
        optionalProperty('focusable', BoolType),
    ],
};

const rnActivityIndicator = {
    renderer: ActivityIndicator,
    propertyTypes: [
        ...rnView.propertyTypes,
        optionalProperty('animating', BoolType),
        optionalProperty('color', ColorType),
        optionalProperty('hidesWhenStopped', BoolType),
        optionalProperty('size', NumberType),
    ],
};

const rnButton = {
    renderer: Button,
    propertyTypes: [
        defaultProperty('onPress', FunctionType, () => console.log('Set me a handler!')),
        defaultProperty('title', StringType, 'Button'),
        optionalProperty('accessibilityLabel', StringType),
        optionalProperty('color', ColorType),
        optionalProperty('disabled', BoolType),
        optionalProperty('testID', StringType),
        optionalProperty('hasTVPreferredFocus', BoolType),
        optionalProperty('nextFocusDown', NumberType),
        optionalProperty('nextFocusForward', NumberType),
        optionalProperty('nextFocusLeft', NumberType),
        optionalProperty('nextFocusRight', NumberType),
        optionalProperty('nextFocusUp', NumberType),
        optionalProperty('touchSoundDisabled', BoolType),
    ],
};

const rnFlatList = {
    renderer: FlatList,
    propertyTypes: [
        optionalProperty('renderItem', FunctionType),
        optionalProperty('data', ArrayType),
        optionalProperty('ItemSeparatorComponent', ComponentType),
        // todo enum component, function, element
        optionalProperty('ListEmptyComponent', ComponentType),
        // todo enum component, function, element
        optionalProperty('ListFooterComponent', ComponentType),
        optionalProperty('ListFooterComponentStyle', StyleType),
        // todo enum component, function, element
        optionalProperty('ListHeaderComponent', ComponentType),
        optionalProperty('ListHeaderComponentStyle', StyleType),
        optionalProperty('columnWrapperStyle', StyleType),
        optionalProperty('extraData', AnyType),
        optionalProperty('getItemLayout', FunctionType),
        optionalProperty('horizontal', BoolType),
        optionalProperty('initialNumToRender', NumberType),
        optionalProperty('initialScrollIndex', NumberType),
        optionalProperty('inverted', BoolType),
        optionalProperty('keyExtractor', FunctionType),
        optionalProperty('numColumns', NumberType),
        optionalProperty('onEndReached', FunctionType),
        optionalProperty('onEndReachedThreshold', FunctionType),
        optionalProperty('onRefresh', FunctionType),
        optionalProperty('onViewableItemsChanged', FunctionType),
        optionalProperty('progressViewOffset', NumberType),
        optionalProperty('legacyImplementation', BoolType),
        optionalProperty('refreshing', BoolType),
        optionalProperty('removeClippedSubviews', BoolType),
        // todo ObjectType=viewabilityConfig(4 params)
        optionalProperty('viewabilityConfig', ObjectType),
        // todo array of ViewabilityConfigCallbackPair
        optionalProperty('viewabilityConfigCallbackPairs', ArrayType),
    ],
    methods: [
        // todo how to use
        'scrollToEnd',
        'scrollToIndex',
        'scrollToItem',
        'scrollToOffset',
        'recordInteraction',
        'flashScrollIndicators',
        'getNativeScrollRef',
        'getScrollResponder',
        'getScrollableNode',
    ]
};

const rnImage = {
    renderer: Image,
    propertyTypes: [
        defaultProperty('style', StyleType, { width: 128, height: 128 }),
        optionalProperty('accessible', BoolType),
        optionalProperty('accessibilityLabel', StringType),
        optionalProperty('blurRadius', NumberType),
        optionalProperty('capInsets', ObjectType),
        // todo object|number
        optionalProperty('defaultSource', ObjectType),
        optionalProperty('fadeDuration', NumberType),
        optionalProperty('loadingIndicatorSource', ArrayType),
        optionalProperty('onError', FunctionType),
        optionalProperty('onLayout', FunctionType),
        optionalProperty('onLoad', FunctionType),
        optionalProperty('onLoadEnd', FunctionType),
        optionalProperty('onLoadStart', FunctionType),
        optionalProperty('onPartialLoad', FunctionType),
        optionalProperty('onProgress', FunctionType),
        optionalProperty('progressiveRenderingEnabled', BoolType),
        optionalProperty(
            'resizeMethod',
            PTypeBuilder.enum('imageResizeMethod')
                .description('Resize mechanism')
                .withValue('default', 'Default')
                .withValue('auto', 'Auto', 'auto')
                .withValue('resize', 'Resize', 'resize')
                .withValue('Scale', 'Scale', 'scale')
                .build()
        ),
        optionalProperty('resizeMode', PTypeBuilder.enum('imageResizeMode')
            .description('Resize mode')
            .withValue('default', 'Default')
            .withValue('cover', 'Cover', 'cover')
            .withValue('contain', 'Contain', 'contain')
            .withValue('stretch', 'Stretch', 'stretch')
            .withValue('repeat', 'Repeat', 'repeat')
            .withValue('center', 'Center', 'center')
            .build()
        ),
        defaultProperty('source', AnyType, { uri: '/images/unknown.png' }),
        optionalProperty('testID', StringType),
    ],
};

const rnImageBackground = {
    renderer: ImageBackground,
    propertyTypes: [
        ...rnImage.propertyTypes,
        optionalProperty('imageStyle', StyleType),
        // todo Ref type in real
        optionalProperty('imageRef', AnyType),
    ],
};

const rnKeyboardAvoidingView = {
    renderer: KeyboardAvoidingView,
    propertyTypes: [
        ...rnView.propertyTypes,
        // todo enum in real
        optionalProperty('behavior', StringType),
        optionalProperty('contentContainerStyle', StyleType),
        optionalProperty('enabled', BoolType),
        optionalProperty('keyboardVerticalOffset', NumberType),
    ],
};

/*
const rnModal = {
    renderer: Modal,
    propertyTypes: [
        // todo enum in real
        optionalProperty('animationType', StringType),
        optionalProperty('hardwareAccelerated', BoolType),
        optionalProperty('statusBarTranslucent', BoolType),
        optionalProperty('onDismiss', FunctionType),
        optionalProperty('onOrientationChange', FunctionType),
        optionalProperty('onRequestClose', FunctionType),
        optionalProperty('onShow', FunctionType),
        // todo enum in real
        optionalProperty('presentationStyle', StringType),
        optionalProperty('statusBarTranslucent', BoolType),
        // todo array of enum in real
        optionalProperty('supportedOrientations', ArrayType),
        optionalProperty('transparent', BoolType),
        optionalProperty('visible', BoolType),
    ],
};
*/

// todo add to property platform name (all components)?
// const rnPicker = {
//     renderer: Picker,
//     propertyTypes: [
//         optionalProperty('enabled', BoolType),
//         // todo text styles
//         optionalProperty('itemStyle', StyleType),
//         // enum dialog, dropdown
//         optionalProperty(
//             'mode',
//             PTypeBuilder.enum('pickerMode')
//                 .description('How to display')
//                 .withValue('default', 'Default')
//                 .withValue('dialog', 'Dialog', 'dialog')
//                 .withValue('dropdown', 'Dropdown', 'dropdown')
//                 .build()
//         ),
//         optionalProperty('onValueChange', FunctionType),
//         optionalProperty('prompt', StringType),
//         optionalProperty('selectedValue', AnyType),
//         // todo pickerStyleType
//         optionalProperty('style', StyleType),
//         optionalProperty('testID', StringType),
//     ],
// };

const rnRefreshControl = {
    renderer: RefreshControl,
    propertyTypes: [
        ...rnView.propertyTypes,
        defaultProperty('refreshing', BoolType, true),
        optionalProperty('onRefresh', FunctionType),
        // todo array of colors
        optionalProperty('colors', ArrayType),
        optionalProperty('enabled', BoolType),
        optionalProperty('progressBackgroundColor', ColorType),
        optionalProperty('progressViewOffset', NumberType),
        // todo enum of RefreshControls.SIZE
        optionalProperty('size', NumberType),
        optionalProperty('tintColor', ColorType),
        optionalProperty('title', StringType),
        optionalProperty('titleColor', ColorType),
    ],
};

const rnSafeAreaView = {
    renderer: SafeAreaView,
    propertyTypes: [
        ...rnView.propertyTypes,
        optionalProperty('emulateUnlessSupported', BoolType),
    ],
};

const rnScrollView = {
    renderer: ScrollView,
    propertyTypes: [
        ...rnView.propertyTypes,
        optionalProperty('alwaysBounceHorizontal', BoolType),
        optionalProperty('alwaysBounceVertical', BoolType),
        optionalProperty('automaticallyAdjustContentInsets', BoolType),
        optionalProperty('bounces', BoolType),
        optionalProperty('bouncesZoom', BoolType),
        optionalProperty('canCancelContentTouches', BoolType),
        optionalProperty('centerContent', BoolType),
        // todo StyleSheetPropType(View Style props)
        optionalProperty('contentContainerStyle', StyleType),
        optionalProperty('contentInset', ObjectType),
        // todo enum
        optionalProperty('contentInsetAdjustmentBehavior', StringType),
        // todo PointPropType
        optionalProperty('contentOffset', ObjectType),
        // todo enum
        optionalProperty('decelerationRate', StringType),
        optionalProperty('directionalLockEnabled', BoolType),
        optionalProperty('disableIntervalMomentum', BoolType),
        optionalProperty('disableScrollViewPanResponder', BoolType),
        optionalProperty('endFillColor', ColorType),
        optionalProperty('fadingEdgeLength', NumberType),
        optionalProperty('horizontal', BoolType),
        // todo enum
        optionalProperty('indicatorStyle', StringType),
        optionalProperty('invertStickyHeaders', BoolType),
        // todo enum
        optionalProperty('keyboardDismissMode', StringType),
        // todo enum
        optionalProperty('keyboardShouldPersistTaps', StringType),
        // todo object
        optionalProperty('maintainVisibleContentPosition', ObjectType),
        optionalProperty('maximumZoomScale', NumberType),
        optionalProperty('minimumZoomScale', NumberType),
        optionalProperty('nestedScrollEnabled', BoolType),
        optionalProperty('onContentSizeChange', FunctionType),
        optionalProperty('onMomentumScrollBegin', FunctionType),
        optionalProperty('onMomentumScrollEnd', FunctionType),
        optionalProperty('onScroll', FunctionType),
        optionalProperty('onScrollBeginDrag', FunctionType),
        optionalProperty('onScrollEndDrag', FunctionType),
        optionalProperty('onScrollToTop', FunctionType),
        // todo enum
        optionalProperty('overScrollMode', StringType),
        optionalProperty('pagingEnabled', BoolType),
        optionalProperty('persistentScrollbar', BoolType),
        optionalProperty('pinchGestureEnabled', BoolType),
        // todo element
        optionalProperty('refreshControl', ObjectType),
        optionalProperty('removeClippedSubviews', BoolType),
        // todo uri|number
        optionalProperty('scrollBarThumbImage', NumberType),
        optionalProperty('scrollEnabled', BoolType),
        optionalProperty('scrollEventThrottle', NumberType),
        // todo object
        optionalProperty('scrollIndicatorInsets', ObjectType),
        optionalProperty('scrollPerfTag', StringType),
        optionalProperty('scrollToOverflowEnabled', BoolType),
        optionalProperty('scrollsToTop', BoolType),
        optionalProperty('showsHorizontalScrollIndicator', BoolType),
        optionalProperty('showsVerticalScrollIndicator', BoolType),
        // todo enum
        optionalProperty('snapToAlignment', StringType),
        optionalProperty('snapToEnd', BoolType),
        optionalProperty('snapToInterval', NumberType),
        // todo array of number
        optionalProperty('snapToOffsets', ArrayType),
        optionalProperty('snapToStart', BoolType),
        // todo array of number
        optionalProperty('stickyHeaderIndices', ArrayType),
        optionalProperty('zoomScale', NumberType),
    ],
};

const rnVirtualizedList = {
    propertyTypes: [
        ...rnScrollView.propertyTypes,
        defaultProperty('renderItem', FunctionType, () => null),
        defaultProperty('data', AnyType, () => []),
        defaultProperty('getItem', FunctionType, () => null),
        defaultProperty('getItemCount', FunctionType, () => 0),
        optionalProperty('debug', BoolType),
        optionalProperty('extraData', AnyType),
        optionalProperty('getItemLayout', FunctionType),
        optionalProperty('initialScrollIndex', NumberType),
        optionalProperty('inverted', BoolType),
        // todo component, function
        optionalProperty('CellRendererComponent', AnyType),
        // todo component, function
        optionalProperty('ItemSeparatorComponent', AnyType),
        optionalProperty('listKey', StringType),
        // todo component, function, element
        optionalProperty('ListEmptyComponent', AnyType),
        // todo component, function
        optionalProperty('ListItemComponent', AnyType),
        // todo component, function, element
        optionalProperty('ListFooterComponent', AnyType),
        // todo ViewStyleProp
        optionalProperty('ListFooterComponentStyle', StyleType),
        // todo component, function, element
        optionalProperty('ListHeaderComponent', AnyType),
        // todo ViewStyleProp
        optionalProperty('ListHeaderComponentStyle', StyleType),
        optionalProperty('onRefresh', FunctionType),
        optionalProperty('onScrollToIndexFailed', FunctionType),
        optionalProperty('onViewableItemsChanged', FunctionType),
        optionalProperty('refreshing', BoolType),
        // todo element
        optionalProperty('refreshControl', AnyType),
        optionalProperty('removeClippedSubviews', BoolType),
        optionalProperty('renderScrollComponent', FunctionType),
        // todo ViewabilityConfig
        optionalProperty('viewabilityConfig', ObjectType),
        // todo array of ViewabilityConfigCallbackPair
        optionalProperty('viewabilityConfigCallbackPairs', ArrayType),
        optionalProperty('horizontal', BoolType),
        defaultProperty('initialNumToRender', NumberType, 0),
        optionalProperty('keyExtractor', FunctionType),
        optionalProperty('maxToRenderPerBatch', NumberType),
        optionalProperty('onEndReached', FunctionType),
        optionalProperty('onEndReachedThreshold', NumberType),
        optionalProperty('updateCellsBatchingPeriod', NumberType),
        optionalProperty('windowSize', NumberType),
        optionalProperty('persistentScrollbar', BoolType),
        optionalProperty('progressViewOffset', NumberType),
    ],
    renderer: VirtualizedList,
};

const rnSectionList = {
    renderer: SectionList,
    propertyTypes: [
        ...rnScrollView.propertyTypes,
        ...rnVirtualizedList.propertyTypes,
        optionalProperty('renderItem', FunctionType),
        // todo array of Sections
        defaultProperty('sections', ArrayType, []),
        optionalProperty('extraData', AnyType),
        optionalProperty('initialNumToRender', NumberType),
        optionalProperty('inverted', BoolType),
        // todo [component, function, element]
        optionalProperty('ItemSeparatorComponent', AnyType),
        optionalProperty('keyExtractor', FunctionType),
        // todo [component, function, element]
        optionalProperty('ListEmptyComponent', AnyType),
        // todo [component, function, element]
        optionalProperty('ListFooterComponent', AnyType),
        // todo [component, function, element]
        optionalProperty('ListHeaderComponent', AnyType),
        optionalProperty('onEndReached', FunctionType),
        optionalProperty('onEndReachedThreshold', NumberType),
        optionalProperty('onRefresh', FunctionType),
        optionalProperty('onViewableItemsChanged', FunctionType),
        optionalProperty('refreshing', BoolType),
        optionalProperty('removeClippedSubviews', BoolType),
        optionalProperty('renderSectionFooter', FunctionType),
        optionalProperty('renderSectionHeader', FunctionType),
        // todo react class
        optionalProperty('SectionSeparatorComponent', AnyType),
        optionalProperty('stickySectionHeadersEnabled', BoolType),
    ],
};

const rnStatusBar = {
    renderer: StatusBar,
    propertyTypes: [
        optionalProperty('animated', BoolType),
        optionalProperty('backgroundColor', ColorType),
        // todo enum
        optionalProperty('barStyle', StringType),
        optionalProperty('hidden', BoolType),
        optionalProperty('networkActivityIndicatorVisible', BoolType),
        // todo enum
        optionalProperty('showHideTransition', StringType),
        optionalProperty('translucent', BoolType),
    ],
};

const rnSwitch = {
    renderer: Switch,
    propertyTypes: [
        ...rnView.propertyTypes,
        optionalProperty('disabled', BoolType),
        optionalProperty('ios_backgroundColor', ColorType),
        optionalProperty('onChange', FunctionType),
        optionalProperty('onValueChange', FunctionType),
        optionalProperty('thumbColor', ColorType),
        // todo object
        optionalProperty('trackColor', ObjectType),
        optionalProperty('value', BoolType),
    ],
};

const rnText = {
    renderer: Text,
    getDataProps(model) {
        return {
            children: model.content,
        };
    },
    propertyTypes: [
        optionalProperty('accessibilityHint', StringType),
        optionalProperty('accessibilityLabel', StringType),
        // todo AccessibilityRole
        optionalProperty('accessibilityRole', StringType),
        // todo object
        optionalProperty('accessibilityState', ObjectType),
        optionalProperty('accessible', BoolType),
        optionalProperty('adjustsFontSizeToFit', BoolType),
        optionalProperty('allowFontScaling', BoolType),
        // todo enum
        optionalProperty('dataDetectorType', StringType),
        optionalProperty('disabled', BoolType),
        // todo enum
        optionalProperty('ellipsizeMode', StringType),
        optionalProperty('maxFontSizeMultiplier', NumberType),
        optionalProperty('minimumFontScale', NumberType),
        optionalProperty('nativeID', StringType),
        optionalProperty('numberOfLines', NumberType),
        optionalProperty('onLayout', FunctionType),
        optionalProperty('onLongPress', FunctionType),
        optionalProperty('onMoveShouldSetResponder', FunctionType),
        optionalProperty('onPress', FunctionType),
        optionalProperty('onResponderGrant', FunctionType),
        optionalProperty('onResponderMove', FunctionType),
        optionalProperty('onResponderRelease', FunctionType),
        optionalProperty('onResponderTerminate', FunctionType),
        optionalProperty('onResponderTerminationRequest', FunctionType),
        optionalProperty('onStartShouldSetResponderCapture', FunctionType),
        optionalProperty('onTextLayout', FunctionType),
        // todo object
        optionalProperty('pressRetentionOffset', ObjectType),
        optionalProperty('selectable', BoolType),
        optionalProperty('selectionColor', ColorType),
        optionalProperty('style', StyleType),
        optionalProperty('suppressHighlighting', BoolType),
        optionalProperty('testID', StringType),
        // todo enum
        optionalProperty('textBreakStrategy', StringType),
    ],
};

const rnTextInput = {
    renderer: TextInput,
    propertyTypes: [
        ...rnView.propertyTypes,
        optionalProperty('allowFontScaling', BoolType),
        // todo enum
        optionalProperty('autoCapitalize', StringType),
        // todo enum
        optionalProperty('autoCompleteType', StringType),
        optionalProperty('autoCorrect', BoolType),
        optionalProperty('autoFocus', BoolType),
        optionalProperty('blurOnSubmit', BoolType),
        optionalProperty('caretHidden', BoolType),
        // todo enum
        optionalProperty('clearButtonMode', StringType),
        optionalProperty('clearTextOnFocus', BoolType),
        optionalProperty('contextMenuHidden', BoolType),
        // todo enum
        optionalProperty('dataDetectorTypes', StringType),
        optionalProperty('defaultValue', StringType),
        optionalProperty('disableFullscreenUI', BoolType),
        optionalProperty('editable', BoolType),
        optionalProperty('enablesReturnKeyAutomatically', BoolType),
        // todo enum
        optionalProperty('importantForAutofill', StringType),
        optionalProperty('inlineImageLeft', StringType),
        optionalProperty('inlineImagePadding', NumberType),
        optionalProperty('inputAccessoryViewID', StringType),
        // todo enum
        optionalProperty('keyboardAppearance', StringType),
        // todo enum
        optionalProperty('keyboardType', StringType),
        optionalProperty('maxFontSizeMultiplier', NumberType),
        optionalProperty('maxLength', NumberType),
        optionalProperty('multiline', BoolType),
        optionalProperty('numberOfLines', NumberType),
        optionalProperty('onBlur', FunctionType),
        optionalProperty('onChange', FunctionType),
        optionalProperty('onChangeText', FunctionType),
        optionalProperty('onContentSizeChange', FunctionType),
        optionalProperty('onEndEditing', FunctionType),
        optionalProperty('onFocus', FunctionType),
        optionalProperty('onKeyPress', FunctionType),
        optionalProperty('onLayout', FunctionType),
        optionalProperty('onScroll', FunctionType),
        optionalProperty('onSelectionChange', FunctionType),
        optionalProperty('onSubmitEditing', FunctionType),
        optionalProperty('onTextInput', FunctionType),
        optionalProperty('placeholder', StringType),
        optionalProperty('placeholderTextColor', ColorType),
        optionalProperty('returnKeyLabel', StringType),
        // todo enum
        optionalProperty('returnKeyType', StringType),
        optionalProperty('rejectResponderTermination', BoolType),
        optionalProperty('scrollEnabled', BoolType),
        optionalProperty('secureTextEntry', BoolType),
        // todo object
        optionalProperty('selection', ObjectType),
        optionalProperty('selectionColor', ColorType),
        optionalProperty('selectTextOnFocus', BoolType),
        optionalProperty('showSoftInputOnFocus', BoolType),
        optionalProperty('spellCheck', BoolType),
        // todo enum
        optionalProperty('textAlign', StringType),
        // todo enum
        optionalProperty('textContentType', StringType),
        optionalProperty('passwordRules', StringType),
        // todo text style only
        optionalProperty('style', StyleType),
        // todo enum
        optionalProperty('textBreakStrategy', StringType),
        optionalProperty('underlineColorAndroid', ColorType),
        optionalProperty('value', StringType),
    ],
    methods: [
        'focus',
        'blur',
        'clear',
        'isFocused',
    ]
};

const rnTouchableWithoutFeedback = {
    renderer: TouchableWithoutFeedback,
    propertyTypes: [
        optionalProperty('accessibilityIgnoresInvertColors', BoolType),
        optionalProperty('accessible', BoolType),
        optionalProperty('accessibilityLabel', StringType),
        optionalProperty('accessibilityHint', StringType),
        // todo enum
        optionalProperty('accessibilityRole', StringType),
        // todo object
        optionalProperty('accessibilityState', ObjectType),
        optionalProperty('accessibilityActions', ArrayType),
        optionalProperty('onAccessibilityAction', FunctionType),
        // todo object
        optionalProperty('accessibilityValue', ObjectType),
        optionalProperty('delayLongPress', NumberType),
        optionalProperty('delayPressIn', NumberType),
        optionalProperty('delayPressOut', NumberType),
        optionalProperty('disabled', BoolType),
        // todo object
        optionalProperty('hitSlop', ObjectType),
        optionalProperty('onBlur', FunctionType),
        optionalProperty('onFocus', FunctionType),
        optionalProperty('onLayout', FunctionType),
        optionalProperty('onLongPress', FunctionType),
        optionalProperty('onPress', FunctionType),
        optionalProperty('onPressIn', FunctionType),
        optionalProperty('onPressOut', FunctionType),
        // todo object
        optionalProperty('pressRetentionOffset', ObjectType),
        optionalProperty('nativeID', StringType),
        optionalProperty('testID', StringType),
        optionalProperty('touchSoundDisabled', BoolType),

        defaultProperty('children', ArrayType, React.createElement(View))
    ],
};

const rnTouchableHighlight = {
    renderer: TouchableHighlight,
    propertyTypes: [
        ...rnTouchableWithoutFeedback.propertyTypes,
        optionalProperty('activeOpacity', NumberType),
        optionalProperty('onHideUnderlay', FunctionType),
        optionalProperty('onShowUnderlay', FunctionType),
        // todo View.style
        optionalProperty('style', StyleType),
        optionalProperty('underlayColor', ColorType),
        optionalProperty('hasTVPreferredFocus', BoolType),
        optionalProperty('nextFocusDown', BoolType),
        optionalProperty('nextFocusForward', BoolType),
        optionalProperty('nextFocusLeft', BoolType),
        optionalProperty('nextFocusRight', BoolType),
        optionalProperty('nextFocusUp', BoolType),
        optionalProperty('testOnly_pressed', BoolType),

        defaultProperty('children', ArrayType, React.createElement(View))
    ],
};

const rnTouchableOpacity = {
    renderer: TouchableOpacity,
    propertyTypes: [
        ...rnTouchableWithoutFeedback.propertyTypes,
        // todo View.style
        optionalProperty('style', StyleType),
        optionalProperty('activeOpacity', NumberType),
        // todo Object
        optionalProperty('tvParallaxProperties', ObjectType),
        optionalProperty('hasTVPreferredFocus', BoolType),
        optionalProperty('nextFocusDown', BoolType),
        optionalProperty('nextFocusForward', BoolType),
        optionalProperty('nextFocusLeft', BoolType),
        optionalProperty('nextFocusRight', BoolType),
        optionalProperty('nextFocusUp', BoolType),
    ],
    methods: [
        'setOpacityTo'
    ]
};

function init(definition) {
    let result = {};
    let defaults = {};
    for (let item of definition.propertyTypes) {
        result[item.name] = item;
        if (isDefined(item.defaultValue)) {
            defaults[item.name] = item.defaultValue;
        }
    }
    definition.propertyByName = result;
    definition.defaultProps = defaults;
    return definition;
}

const rnComponentDefinition = {
    'rnactivityindicator': init(rnActivityIndicator),
    'rnbutton': init(rnButton),
    'rnflatlist': init(rnFlatList),
    'rnimage': init(rnImage),
    'rnimagebackground': init(rnImageBackground),
    'rnkeyboardavoidingview': init(rnKeyboardAvoidingView),
    // disabled
    // 'rnmodal': init(rnModal),
    //'rnpicker': init(rnPicker),
    'rnrefreshcontrol': init(rnRefreshControl),
    'rnsafeareaview': init(rnSafeAreaView),
    'rnscrollview': init(rnScrollView),
    'rnsectionlist': init(rnSectionList),
    'rnstatusbar': init(rnStatusBar),
    'rnswitch': init(rnSwitch),
    'rntext': init(rnText),
    'rntextinput': init(rnTextInput),
    'rntouchablehighlight': init(rnTouchableHighlight),
    'rntouchableopacity': init(rnTouchableOpacity),
    'rntouchablewithoutfeedback': init(rnTouchableWithoutFeedback),
    'rnview': init(rnView),
    'rnvirtualizedlist': init(rnVirtualizedList),
}

export default rnComponentDefinition;
