import React from "react";
import {Tooltip, Whisper} from 'rsuite';

export default (props) => {
  const textRef = React.useRef(null);
  const textEl = textRef.current
  const ellipsed = textEl && (textEl.offsetWidth < textEl.scrollWidth);

  return (
      <div ref={textRef} style={{textOverflow: "ellipsis", overflow: "hidden"}}>
          <Whisper placement="bottomStart" trigger={ellipsed ? "hover" : "click"} speaker={<Tooltip>{props.tooltipText}</Tooltip>} {...props}/>
      </div>
  )
};