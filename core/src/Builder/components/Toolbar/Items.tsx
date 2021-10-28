import React from 'react';
import {ComponentDefinition} from "../../../api/Types";
import {components} from "../../../views";

export interface ToolbarItem {
    title: string,
    controls?: ComponentDefinition<any>[],
}

export const ToolbarItems: ToolbarItem[] = [
    {
        title: "Base controls",
        controls: components
    },
    {
        title: "Premium controls",
        controls: components
    }
]
