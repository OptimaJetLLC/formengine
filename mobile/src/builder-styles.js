import { Dimensions, Platform, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const builderStyles = StyleSheet.create({
    buttonTitle: {
        fontSize: 14,
    },
    primary: {
        backgroundColor: '#1262E2',
    },
    dwkitFormBuilderHeader: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        height: 80,
    },
    dwkitFormBuilderHeaderLeft: {
        marginTop: 12,
        width: 200,
        justifyContent: 'center',
    },
    dwkitFormBuilderHeaderCenter: {
        marginTop: 18,
        marginRight: 3.5,
        flexDirection: 'row',
        paddingLeft: 21,
        paddingRight: 21,
        justifyContent: 'space-between',
        minWidth: 425,
    },
    dwkitFormBuilderHeaderRight: {
        paddingRight: 4,
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        maxWidth: 200,
        marginLeft: 'auto'
    },
    dwkitFormBuilderHeaderButton: {
        height: 38,
        minWidth: 78,
    },
    dwkitFormBuilder: {
        flexDirection: 'row',
    },
    dwkitFormBuilderContent: {
        zIndex: 1,
        flexGrow: 1,
        margin: 15,
        width: 'calc(100% - 230px)'
    },
    dwkitFormBuilderToolbar: {
        width: 200,
    },
    dwkitFormBuilderZone: {
        alignItems: 'center',
        padding: 8,
        paddingTop: 7,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: '#F4F4F4',
        height: 28,
    },
    dwkitFormBuilderZoneActive: {
        backgroundColor: 'lightblue',
    },
    dwkitFormBuilderZoneHover: {
        backgroundColor: 'blue',
    },
    dwkitFormBuilderZoneText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'rgba(46, 46, 46, 0.4)',
    },
    dwKitModalBody: {
        padding: 20,
        minWidth: 860,
        backgroundColor: 'white',
        margin: 'auto',
    },
    dwKitModalHeader: {
        flexDirection: 'row-reverse',
    },
    dwKitModalContent: {
        flexWrap: 'wrap',
        flex: 1,
    },
    dwKitModalActions: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    dwKitModalComponentName: {
        fontSize: 12,
        backgroundColor: '#e8e8e8',
        color: 'rgba(0, 0, 0, .6)',
        fontWeight: '700',
        borderRadius: 4,
        padding: 4,
        margin: 4,
    },
    formGroupEqual: {
        flexGrow: 1,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
    },
    formGroup: {
        flexGrow: 1,
        flexWrap: 'wrap',
        alignItems: 'stretch',
    },
    dragView: {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1000.,
        ...Platform.select({
            web: {
                //todo fix styles on mobile
                overflow: 'auto',
                position: 'fixed',
            },
        }),
    },
    dwKitMessage: {
        flexDirection: 'row',
        marginBottom: 14,
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 21,
        paddingRight: 21,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#cecfcf',
    },
    dwKitMessageContent: {
        marginLeft: 15,
    },
    dwKitMessageIcon: {
        width: 32,
        height: 32,
    },
    formGroupWidthEqual: {
        flexGrow: 1,
    },
    emptyView: {
        backgroundColor: '#EEF4FD',
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    emptyText: {
        color: '#9B9B9B',
        textAlign: 'center',
    },
    fullSize: {
        width: '100%',
    },
    halfSize: {
        flexDirection: 'row',
        width: '50%',
    },
    itemContainer:{
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(18, 98, 226,0.5)',
        padding: '16px',
        marginLeft: '0',
        marginRight: '0',
        overflow: 'hidden'
    },
    controlWrapper: {
        flexGrow: 1,
    },
    controlWrapperHovered: {
        ...Platform.select({
            web: {
                outlineStyle: 'solid',
                outlineWidth: 2,
                outlineColor: 'rgba(242, 77, 0, 0.5)'
            },
        }),
    }
});

builderStyles.controlWrapper = {
    flexGrow: 1,
    hovered: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(242, 77, 0, 0.5)',
    }
};

builderStyles.baseMargin = {
    marginBottom: 5,
};

builderStyles.controlParams = params => ({
    style: {
        flexGrow: params.fluid ? 1 : 0,
        alignSelf: params.fluid ? 'stretch' : params.floated || 'flex-start',
    },
    props: {
        appearance: params.secondary ? 'outline' : 'filled',
        status: params.primary || params.secondary ? 'primary' : 'basic',        
    }
});

builderStyles.eventsEditor = {
    actions: {
        flexGrow: 1,
        width: 240,
        maxWidth: 240
    },
    parameters: {
        flexGrow: 1,
        width: 450,
        maxWidth: 450,
        marginRight: 12,
    },
    targets: {
        flexGrow: 1,
        width: 240,
        maxWidth: 240
    },
    addButton: {
        appearance: "outline",
        status: "basic",
        size: "tiny",
        style: {
            padding: 5,
            marginLeft: 15,
            marginRight: 40,
            marginTop: 5,
            backgroundColor: "rgb(247, 249, 252)",
            borderColor: "rgb(228, 233, 242)",
        },
    },
};

const base = {
    flexGrow: 1,
};

builderStyles.layout = {
    elementInRow: {
        marginRight: 10,   
    },
    elementInColumn: {
        marginBottom: 10,   
    }
};

builderStyles.controls = {
    button: {
        ...base,
    },
    tabBarChild: {
        marginTop: 20,
    },
    dropzonePopover: {
        container: {
            boxShadow: 'rgba(18, 83, 204, 0.12) 0px 6px 10px'
        },
    },
    dropdown: {
        select: {
            ...base,
            marginLeft: 0,
            marginRight: 0,
            flexShrink: 1
        },
        labels: {
            container: {
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
            },
            backdrop:  {
                borderRadius: 4,
                margin:1,
                padding: 4,
                paddingTop: 0,
                paddingBottom: 4,
                backgroundColor: 'color-primary-default', //use this style with ThemedView (src/builder/themed-view)
            },
            text: {
                color: 'white'
            }
        },
        ...base,
    },
    tooltip: {
        container: {
            maxWidth: windowWidth > 400 ? windowWidth / 2 : windowWidth - 20,
        },
        title: {
            textAlign: 'center',
        },
    },
    dropzoneModalIcons: {
        width: 20,
        height: 20,
    },
    dwKitInput: {
        marginBottom: 5,
        ...base,
    },
    dwKitCheckBox: {
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
    },
};

builderStyles.repeater = StyleSheet.create({
    container: {
        // vertical: {
        //     height:  Dimensions.get('window').height / 2,            
        // },
        // horizontal: {
        // }
    },
});

builderStyles.controlBar = {
    container: {
        marginTop: 4,
        padding: 4,
        paddingRight: 8,
        paddingLeft: 8,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        opacity: 0.2,
        zIndex: 100,
        right: 0,
        position: "absolute",
        backgroundColor: 'white',
        borderRadius: 20,
    },
    iconTouchable: {
        marginLeft: 8,
    },
    icon: {
        top: 2,
        width: 15,
        height: 15,
    },
};

builderStyles.controlBar.containerHovered = StyleSheet.compose(builderStyles.controlBar.container, {
    opacity: 1,
    boxShadow: '0px 6px 10px rgba(18, 83, 204, 0.12), 0px 1px 18px rgba(18, 83, 204, 0.12), 0px 3px 5px rgba(18, 83, 204, 0.15)'
});

builderStyles.formGroupWidthCustom = [];
for (let i = 1; i <= 16; i++) {
    const percent = 100 / 16 * i;
    builderStyles.formGroupWidthCustom[i] = StyleSheet.create({
        style: {
            width: `${percent}%`,
        }
    });
}

builderStyles.toolbarCssStyles = {
    sectionItem: {
        cursor: "grab",
        listStyle: "none",
        margin: "4px",
        marginTop: "7.5px",
        marginBottom: "7.5px",
        padding: "6px",
        paddingLeft: "16px",
        border: "1px solid #FFFFFF",
        borderRadius: "2px",
        fontFamily: "'Lato', 'sans-serif'",
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.8)",
        ...StyleSheet.flatten(builderStyles.primary)
    },
};

builderStyles.toolbarStyles = StyleSheet.create({   
    container: StyleSheet.flatten(builderStyles.primary),
    sectionList: {
        padding: 10,
        paddingTop: 0,
    },
    sectionText: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    sectionIcon: {
        width: 22,
        height: 22,
        //fill: 'white'
    },
    toolbarTextView: {
        flexDirection: 'row',
        flexShrink: 1,
        alignItems: 'center',
    },
    toolbarIconView: {
        flexDirection: 'row-reverse',
        flexGrow: 1,
        marginLeft: 6,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 6,
        marginTop: 5,
        marginBottom: 5,
        color: 'rgba(255, 255, 255, 1)',
    },
    searchContainer: {
        padding: 10,
        paddingBottom: 0
    },
    searchResults: {
        margin: 6,
        opacity: 0.8,
    },
});

builderStyles.toolbarIconProps = {
    size: 14,
    color: 'rgba(255, 255, 255, 0.8)',
};

builderStyles.dwKitModalOverlayProps = {
    overlayStyle: {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        position: 'fixed',
        backgroundColor: 'rgba(255, 255, 255, .35)',
    },
    containerStyle: {
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        position: 'fixed',
    },
    borderColor: 'rgba(0, 0, 0, 1)',
};

builderStyles.dwKitButtonProps = {
    containerStyle: {
        marginRight: 4,
        marginLeft: 12,
    },
    type: 'outline',
};

builderStyles.grouped = {
    inColumn: {
        control: {
            marginLeft: 16,
            marginRight: 16
        },
        dropzone: {
            container: {
                marginTop: 0,
                flexDirection: 'row',
                alignItems: 'center',
            },
        },
    },
}

builderStyles.dwKitInputProps = {
    containerStyle: {
        marginBottom: 14,
        flex: 1,
    },
    labelStyle: {
        fontSize: 13,
        fontWeight: '700',
        color: 'black',
        marginBottom: 4,
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(34, 36, 38, .15)',
        borderRadius: 4,
    },
    inputStyle: {
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 9.5,
        paddingBottom: 9.5,
        fontSize: 14,
        fontWeight: '400',
        minHeight: 38,
    },
};

builderStyles.dwKitDisabledInputProps = {
    labelStyle: {
        ...builderStyles.dwKitInputProps.labelStyle,
        color: '#d2d2d2',
    },
};

builderStyles.dwKitCheckDisabledProps = {
    titleProps: {
        style: {
            color: '#d2d2d2',
        },
    },
    checkedColor: '#d2d2d2',
    uncheckedColor: '#d2d2d2',
};

builderStyles.dwKitFocusedInputProps = {
    inputContainerStyle: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#85b7d9',
        borderRadius: 4,
    },
};

builderStyles.dwKitCheckBoxProps = {
    checkedColor: 'black',
    size: 20,
    containerStyle: {
        backgroundColor: 'white',
        borderWidth: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 7,
        paddingRight: 7,
        marginBottom: 14,
    },
    titleProps: {
        style: {
            fontSize: 14,
            fontWeight: '500',
        },
    }
};

builderStyles.dwKitTextareaProps = {
    multiline: true,
    numberOfLines: 4,
};

builderStyles.dwKitDropdown = {
    labelStyle: builderStyles.dwKitInputProps.labelStyle,
    containerStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 14,
        flex: 1,
    },
    dropdown: {
        style: {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgba(34, 36, 38, .15)',
            borderRadius: 4,
        }
    }
};

builderStyles.dwKitRadioGroup = {
    labelStyle: builderStyles.dwKitInputProps.labelStyle,
    containerStyle: builderStyles.dwKitDropdown.containerStyle,
};

builderStyles.collectionEditor = {
    container: {
        flexGrow: 1
    },
    column: {
        notLast: {
            paddingRight: 10
        }
    },
    editButtonsColumn: {
        flexDirection: 'row',
        margin: 'auto',
        marginLeft: 0,
        marginRight: 0,
    },
    editButton: {
        height: 30,
    },
    icon: {
        width: 15,
        height: 15,
    },
    dragIcon: {
        backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iYmxhY2siIHdpZHRoPSIxOHB4IiBoZWlnaHQ9IjE4cHgiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMFYweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMSAxOGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS0yLThjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yem0wLTZjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yem02IDRjMS4xIDAgMi0uOSAyLTJzLS45LTItMi0yLTIgLjktMiAyIC45IDIgMiAyem0wIDJjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yem0wIDZjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yeiIvPjwvc3ZnPg==)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        opacity: 0.6,
        backgroundPosition: "right",
        width: 15,
        height: 15,
        cssFloat: "inherit"
    },
    input: {
        minWidth: 50,
        width: 'auto',
        ...base
    },
    addLinkProps: {
        style: {
            color: '#1262e2',
        },
    },
    image: {
        style: {
            width: 15,
            height: 15,
        },
    },
    droppable: {
        defaultStyle: {
            backgroundColor: 'transparent',
        },
        activeStyle: {
            backgroundColor: '#ffff0059',
        },
        hoverStyle: {
            backgroundColor: 'lightgreen',
        },
    }
};

builderStyles.dictionaryEditor = {
    iconProps: {
        size: 14,
        containerStyle: {
            marginLeft: 4,
        },
    },
};

builderStyles.containerView = {
    base: {
        alignSelf: 'stretch',
        flexGrow: 1,
    },
    rows: {
        flexDirection: 'column'        
    },
    columns: {
        display: 'flex',
        flexDirection: 'row',     
    },
    columnswrap: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    }
    
};

export default builderStyles;
