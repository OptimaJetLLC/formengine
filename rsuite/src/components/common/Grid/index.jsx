import React from "react";
import './grid.css'; 

export default ({children, maxItemsInRow, itemMinWidth, style, ...props}) => {
  const childrenArr = children?.length ? children : [children];

  const fillingItems = [];
  const amount = maxItemsInRow || 10;
  for (let i=0; i < amount; ++i) {
    fillingItems.push(<div className="empty" style={{minWidth: itemMinWidth || "50%"}}/>);
  }

  return <div className="wfs-flex-grid" style={{display: "flex", flexWrap: "wrap", ...style}} {...props}>
    {childrenArr.map(item => <div style={{minWidth: itemMinWidth || "50%"}}>
      {item}
    </div>)}
    {fillingItems}
  </div>;
};