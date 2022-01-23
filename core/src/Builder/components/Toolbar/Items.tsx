import React from 'react';
import {ComponentDefinition} from "../../../features/annotation/types";

export interface ToolbarItem {
    title: any,
    controls?: ComponentDefinition<any>[],
}

export const ToolbarItems: ToolbarItem[] = [
    /*{
        title: "Base controls",
        controls: store.view.all()
    }*/
]
