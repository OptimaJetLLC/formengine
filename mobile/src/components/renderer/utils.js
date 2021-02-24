function textSizeToNumber(textSize, defaultSize) {
    if (!textSize) {
        return defaultSize;
    }
    switch (textSize) {
        case 'mini':
            return 8;
        case 'tiny':
            return 12;
        case 'small':
            return 16;
        case 'medium':
            return 24;
        case 'large':
            return 32;
        case 'huge':
            return 48;
        default:
            return defaultSize;
    }
}

function getDisplayStyle(visible) {
    if (visible === true) {
        return {};
    }
    return {
        display: 'none',
    };
}

function removeUnsupportedProps(props) {
    if (props.className) {
        delete props.className;
    }
}

export { textSizeToNumber, getDisplayStyle, removeUnsupportedProps };
