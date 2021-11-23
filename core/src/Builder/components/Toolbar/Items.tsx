import React from 'react';
import {ComponentDefinition} from "../../../features/annotation/types";
import {components} from "../../../views";

export interface ToolbarItem {
    title: string,
    controls?: ComponentDefinition<any>[],
}

export const ToolbarItems: ToolbarItem[] = [
    {
        title: "Base controls",
        controls: components
    }
]
