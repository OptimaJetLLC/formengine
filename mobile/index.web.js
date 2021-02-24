import React from "react";
import ReactDOM from "react-dom";
import AppWeb from './src/Inline.js';

const root = document.getElementById('root');
ReactDOM.render(<AppWeb
    ref={(appWeb) => {
    window.BuilderAppWeb = appWeb;
}} />, document.getElementById("root"));
root.setAttribute('style', 'width: 100%; height: 100%; position: absolute; display: flex;');