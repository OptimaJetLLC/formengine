import styled from '@emotion/styled';
import { css } from '@emotion/react'

const hoveredStyles = css`
    outline: 2px dashed #3498ff !important;
    cursor: pointer !important;
`

const selectedStyles = css`
    outline: 2px solid #3498ff !important;
    cursor: move !important;
`

interface SelectionProps {
    hovered?: boolean,
    selected?: boolean
}

const Selection = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 100;
    ${(props: SelectionProps) => props.hovered && hoveredStyles}
    ${(props: SelectionProps) => props.selected && selectedStyles}
`

export default Selection;