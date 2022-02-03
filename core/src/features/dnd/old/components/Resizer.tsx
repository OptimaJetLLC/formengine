import styled from '@emotion/styled';
import {useStore} from "../../../../utils/StoreContext";

const BorderContainer = styled.div`
  position: absolute;
  z-index: 10;
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
    margin: 0 8px;
  }

  &.top, &.bottom {
    width: 100%;
    height: 3px;
    margin: 8px 0;
  }
`

const Resizer = (position: string) => {
    const store = useStore()
    return <BorderContainer
        key={position}
        className={position}
        onMouseDown={(e: any) => {
            store.dnd.isResizing = true;
            e.preventDefault();
            e.stopPropagation();
            const move = (e: MouseEvent) => {
                console.log(e.clientX)
            };
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', (e) => {
                store.dnd.isResizing = false;
                window.removeEventListener('mousemove', move);
            }, {once: true});
        }}
    >
        <Border className={position}/>
    </BorderContainer>
}

export default Resizer;