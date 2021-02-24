function getDisplayStyle(visible) {
    if (visible === true) {
        return {};
    }
    return {
        display: 'none',
    };
}

export { getDisplayStyle };
