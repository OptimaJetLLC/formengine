import styled from '@emotion/styled';

const BorderContainer = styled.div`
    position: absolute;
    z-index: 100;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
    &.left, &.right {
        top: 0;
        height: 100%;
    }
    &.top, &.bottom {
        width: 100%;
    }
    &.left {
        left: -10px;
        cursor: col-resize;
    }
    &.right {
        right: -10px;
        cursor: ew-resize;
    }
    &.top {
        left: 0;
        top: -10px;
        cursor: row-resize;
    }
    &.bottom {
        bottom: -10px;
        cursor: ns-resize;
    }
`

const Border = styled.div`
    background-color: #1262E2;
    &.left, &.right {
        height: 100%;
        width: 3px;
        margin: 0px 8px;
    }
    &.top, &.bottom {
        width: 100%;
        height: 3px;
        margin: 8px 0px;
    }
`

const Resizer = (position: string) => {
    return <BorderContainer key={position} className={position}><Border className={position}/></BorderContainer>
}

export default Resizer;