import React from "react";
import { Icon } from "rsuite";

export default props => {
  const [hover, setHover] = React.useState(false);

  return <>
    <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
      <a {...props} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{lineHeight: '46px', paddingLeft: 10, paddingRight: 10,}}/>
    </div>
  </>
}