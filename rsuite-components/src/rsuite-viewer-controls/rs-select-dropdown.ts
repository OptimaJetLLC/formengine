import {
    BoolType,
    ControlDefinition,
    defaultProperty,
    FunctionType, 
    optionalProperty,
    StringType,
    MapType
} from "optimajet-builder-component-api";
import { SubtleAppearanceType, SizeType } from "./rs-property-types";
import rsSelectDropdown from "../controls/rs-select-dropdown";

const rSuiteSelectDropdown = <ControlDefinition>{
    renderer: rsSelectDropdown,
    propertyTypes: [
        defaultProperty("onSelect", FunctionType, () =>
            console.log("Set me a handler!")
        ),
        defaultProperty("appearance", SubtleAppearanceType, "default"),
        defaultProperty("size", SizeType, "md"),
        defaultProperty("data", MapType, []),
        optionalProperty("placeholder", StringType),
        optionalProperty("searchable", BoolType),
        optionalProperty("disabled", BoolType),
        optionalProperty("cleanable", BoolType),
        optionalProperty("searchable", BoolType),
        optionalProperty("block", BoolType),
    ],
};

export default rSuiteSelectDropdown;
