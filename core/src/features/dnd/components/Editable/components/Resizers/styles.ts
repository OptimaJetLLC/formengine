import {css} from "@emotion/css";

export const resizerStyles = css`
  width: 10px;
  height: 10px;
  background: white;
  border: 3px solid #4286f4;
  position: absolute;

  &.left {
    left: -5px;
    cursor: col-resize;
    top: 50%;
    transform: translate(0, -50%);
  }

  &.right {
    right: -5px;
    cursor: ew-resize;
    top: 50%;
    transform: translate(0, -50%);
  }

  &.top {
    top: 0;
    cursor: row-resize;

    left: 50%;
    transform: translate(0, -50%);
  }

  &.bottom {
    bottom: -10px;
    cursor: ns-resize;

    left: 50%;
    transform: translate(0, -50%);
  }
  
  &.top-left {
    top: -5px;
    left: -5px;
    cursor: nwse-resize;
  }

  &.top-right {
    right: -5px;
    top: -5px;
    cursor: nesw-resize;
  }

  &.bottom-left {
    left: -5px;
    bottom: -5px;
    cursor: nesw-resize;
  }

  &.bottom-right {
    right: -5px;
    bottom: -5px;
    cursor: nwse-resize;
  }

`