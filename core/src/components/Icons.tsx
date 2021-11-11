import {Icon} from '@rsuite/icons';
import React from "react";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

const FaSvgIcon = ({faIcon, size, ...rest}: { faIcon: any, size?: number }) => {
    const {width, height, svgPathData} = faIcon;
    return (
        <svg {...rest} viewBox={`0 0 ${width} ${height}`} width={`${size ?? 1}em`} height={`${size ?? 1}em`}
             fill="currentColor">
            <path d={svgPathData}/>
        </svg>
    );
};

export const FaIcon = ({icon, size, ...props}: {
    icon: IconDefinition, size?: number, props?: any
}) => (
    <Icon as={FaSvgIcon} {...{faIcon: icon, size, ...props}}/>)

export default FaSvgIcon;