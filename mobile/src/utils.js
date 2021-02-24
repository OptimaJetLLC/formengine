const applyStylesToProps = (props, styles) => {
    props.style
            ? Object.assign(props.style, styles)
            : props.style = styles;
}

export { applyStylesToProps };