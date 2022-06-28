import {createPortal} from "react-dom";
import React from "react";

const getDragPreview = () => document.getElementById("fb-drag-preview") || document.body;
export const DragPreview = ({children}: React.ComponentProps<any>) => createPortal(children, getDragPreview())
